import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send, keys } = vi.hoisted(() => ({ send: vi.fn(), keys: [] as string[] }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
    constructor(key: string) {
      keys.push(key);
    }
  },
}));

import { POST } from "./route";

const HOST = "taproothq.com";
const valid = {
  kind: "contact",
  name: "Ada Secretname",
  email: "ada.secret@example.com",
  message: "my secret message",
  hp: "",
  elapsedMs: 5000,
};

function post(
  body: unknown = valid,
  { origin = `https://${HOST}`, host = HOST, raw = false }: { origin?: string | null; host?: string; raw?: boolean } = {},
) {
  const headers: Record<string, string> = { "content-type": "application/json", host };
  if (origin !== null) headers.origin = origin;
  return POST(
    new Request(`https://${host}/api/contact`, {
      method: "POST",
      headers,
      body: raw ? (body as string) : JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  send.mockReset();
  keys.length = 0;
  send.mockResolvedValue({ data: { id: "em_1" }, error: null });
  process.env.RESEND_API_KEY = "re_test";
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("origin", () => {
  it.each([
    ["missing", null],
    ["foreign", "https://evil.example"],
    ["null", "null"],
    ["garbage", "::not a url"],
  ])("refuses a %s Origin", async (_name, origin) => {
    const res = await post(valid, { origin });
    expect(res.status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("accepts apex, www and localhost when Host matches", async () => {
    for (const host of [HOST, `www.${HOST}`, "localhost:3000"]) {
      const res = await post(valid, { origin: `https://${host}`, host });
      expect(res.status).toBe(200);
    }
    expect(send).toHaveBeenCalledTimes(3);
  });

  it("refuses www posting to the apex", async () => {
    expect((await post(valid, { origin: `https://www.${HOST}` })).status).toBe(403);
  });
});

describe("size and shape", () => {
  it("refuses a Content-Length over 16 KB", async () => {
    const res = await POST(
      new Request(`https://${HOST}/api/contact`, {
        method: "POST",
        headers: { origin: `https://${HOST}`, host: HOST, "content-length": String(16 * 1024 + 1) },
        body: "{}",
      }),
    );
    expect(res.status).toBe(413);
  });

  it("refuses a body of 16 KB + 1 with no Content-Length", async () => {
    const res = await post("x".repeat(16 * 1024 + 1), { raw: true });
    expect(res.status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it("measures the body in bytes, not characters", async () => {
    const res = await post("é".repeat(9000), { raw: true });
    expect(res.status).toBe(413);
  });

  it("lets the largest valid submission through the cap", async () => {
    const res = await post({
      kind: "work",
      name: "語".repeat(100),
      email: `${"a".repeat(242)}@example.com`,
      company: "語".repeat(120),
      interests: ["iOS apps", "Web apps", "AI tools", "Automation"],
      message: "語".repeat(4000),
      hp: "",
      elapsedMs: 5000,
    });
    expect(res.status).toBe(200);
  });

  it("answers 400 to non-JSON", async () => {
    expect((await post("not json", { raw: true })).status).toBe(400);
  });

  it.each(["null", "[]", "7", '"x"'])("answers 400 to the JSON body %s", async (raw) => {
    expect((await post(raw, { raw: true })).status).toBe(400);
  });

  it("answers 400 invalid to a failed validation", async () => {
    const res = await post({ ...valid, email: "nope" });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "invalid" });
    expect(send).not.toHaveBeenCalled();
  });
});

describe("bot traps", () => {
  it("answers a filled honeypot with a quiet 200 and no email", async () => {
    const res = await post({ ...valid, hp: "http://spam" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).not.toHaveBeenCalled();
  });

  it("checks the honeypot before anything can fail validation", async () => {
    const res = await post({ hp: "x" });
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["2999", 2999],
    ["missing", undefined],
    ["a string", "5000"],
    ["null", null],
  ])("answers 429 to elapsedMs %s", async (_name, elapsedMs) => {
    const res = await post({ ...valid, elapsedMs });
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: "too_fast" });
    expect(send).not.toHaveBeenCalled();
  });

  it("sends at exactly 3000, and has no upper ceiling", async () => {
    expect((await post({ ...valid, elapsedMs: 3000 })).status).toBe(200);
    expect((await post({ ...valid, elapsedMs: 86_400_000 * 3 })).status).toBe(200);
    expect(send).toHaveBeenCalledTimes(2);
  });
});

describe("send", () => {
  it("sends one text-only email for a valid contact", async () => {
    const res = await post();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledOnce();
    const arg = send.mock.calls[0][0];
    expect(arg.to).toBe("tom@taproothq.com");
    expect(arg.from).toBe("Taproot Labs <forms@taproothq.com>");
    expect(arg.replyTo).toBe("ada.secret@example.com");
    expect(arg.subject).toBe("New note from Ada Secretname");
    expect(arg.text).toContain("my secret message");
    expect(arg).not.toHaveProperty("html");
  });

  it("sends a valid work submission with its interests", async () => {
    const res = await post({
      kind: "work",
      name: "Ada",
      email: "ada@example.com",
      company: "Acme",
      interests: ["AI tools"],
      hp: "",
      elapsedMs: 5000,
    });
    expect(res.status).toBe(200);
    const arg = send.mock.calls[0][0];
    expect(arg.subject).toBe("Ada asked to see our work");
    expect(arg.text).toContain("Wants to see: AI tools");
  });

  it("answers 500 when the key is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await post();
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "not_configured" });
    expect(send).not.toHaveBeenCalled();
    error.mockRestore();
  });

  // Production's value pulls with a trailing newline. A real one is harmless to the SDK; the two literal
  // characters make every send fail with a 400, and the pull can't tell which one it holds.
  it.each([
    ["a real newline", "re_test\n"],
    ["a literal backslash-n", "re_test\\n"],
    ["spaces", " re_test "],
  ])("sends with the bare key when the env value carries %s", async (_name, value) => {
    process.env.RESEND_API_KEY = value;
    expect((await post()).status).toBe(200);
    expect(keys).toEqual(["re_test"]);
  });

  it("treats a key of only a trailing newline as missing", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.RESEND_API_KEY = "\\n";
    expect((await post()).status).toBe(500);
    expect(send).not.toHaveBeenCalled();
  });

  it("answers 502 when Resend resolves with an error, its real failure shape", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValue({
      data: null,
      error: { name: "validation_error", statusCode: 422, message: "bad ada.secret@example.com" },
    });
    const res = await post();
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "send_failed" });
  });

  // No error and no message id is not a send: showing "Thanks, we got it" would lose the lead.
  it("answers 502 when Resend resolves with neither data nor an error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValue({ data: null, error: null });
    const res = await post();
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "send_failed" });
  });

  it("answers 502 when Resend rejects", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockRejectedValue(new Error("boom ada.secret@example.com"));
    expect((await post()).status).toBe(502);
  });
});

describe("logging", () => {
  const SECRETS = ["Secretname", "ada.secret", "my secret message", "provider said"];

  it.each([
    ["resolved error", () => send.mockResolvedValue({ data: null, error: { name: "x", statusCode: 500, message: "provider said ada.secret@example.com" } })],
    ["rejection", () => send.mockRejectedValue(new Error("provider said ada.secret@example.com"))],
    ["success", () => {}],
  ])("never logs the submission or the provider's message: %s", async (_name, arrange) => {
    const spies = (["error", "log", "warn", "info"] as const).map((m) =>
      vi.spyOn(console, m).mockImplementation(() => {}),
    );
    arrange();
    await post();
    const logged = JSON.stringify(spies.flatMap((s) => s.mock.calls), (_k, v) =>
      v instanceof Error ? { message: v.message, name: v.name } : v,
    );
    for (const secret of SECRETS) expect(logged).not.toContain(secret);
  });

  it("the failure branch does log, so the check above can fail", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValue({ data: null, error: { name: "rate_limit_exceeded", statusCode: 429, message: "m" } });
    await post();
    expect(JSON.stringify(error.mock.calls)).toContain("rate_limit_exceeded");
  });
});
