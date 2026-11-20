import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send, keys, checkBotId } = vi.hoisted(() => ({ send: vi.fn(), keys: [] as string[], checkBotId: vi.fn() }));

// Local and test runs never see a real verdict (botid answers "human" outside Vercel), so the verdict is mocked.
vi.mock("botid/server", () => ({ checkBotId }));

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
  checkBotId.mockReset();
  checkBotId.mockResolvedValue({ isHuman: true, isBot: false, isVerifiedBot: false, bypassed: false });
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

  it("refuses the same host on another port", async () => {
    expect((await post(valid, { origin: `https://${HOST}:8443` })).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
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

  it("accepts a body of exactly 16 KB, by header and by bytes", async () => {
    const json = JSON.stringify(valid);
    const body = json + " ".repeat(16 * 1024 - Buffer.byteLength(json));
    expect(Buffer.byteLength(body)).toBe(16 * 1024);
    const res = await POST(
      new Request(`https://${HOST}/api/contact`, {
        method: "POST",
        headers: { origin: `https://${HOST}`, host: HOST, "content-length": String(16 * 1024) },
        body,
      }),
    );
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledOnce();
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

describe("BotID", () => {
  const BOT = { isHuman: false, isBot: true, isVerifiedBot: false, bypassed: false };

  it("checks every valid send once", async () => {
    expect((await post()).status).toBe(200);
    expect(checkBotId).toHaveBeenCalledOnce();
  });

  it("answers 403 with no email when BotID calls it a bot", async () => {
    checkBotId.mockResolvedValue(BOT);
    const res = await post();
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "forbidden" });
    expect(send).not.toHaveBeenCalled();
  });

  it("refuses a verified bot too: no crawler has a reason to send this form", async () => {
    checkBotId.mockResolvedValue({ ...BOT, isVerifiedBot: true });
    expect((await post()).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  // botid reads Vercel's answer without checking res.ok: an error body comes back as { isHuman: true }, no isBot.
  it.each([
    ["an error body (isBot missing)", { isHuman: true }],
    ["isBot null", { isHuman: true, isBot: null }],
    ["a verified bot without isBot", { isHuman: false, isBot: false, isVerifiedBot: true }],
  ])("answers 403 with no email for %s", async (_name, verdict) => {
    checkBotId.mockResolvedValue(verdict);
    expect((await post()).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("gives a bot no quiet 200 through the honeypot", async () => {
    checkBotId.mockResolvedValue(BOT);
    expect((await post({ ...valid, hp: "x" })).status).toBe(403);
  });

  // Closed on purpose: a person still has the mailto on the error line; an open door spends the shared quota.
  it("answers 403 with no email when the check itself fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    checkBotId.mockRejectedValue(new Error("upstream ada.secret@example.com"));
    expect((await post()).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
    expect(JSON.stringify(error.mock.calls)).not.toContain("ada.secret");
  });

  it("runs after the Origin check, so a cross-site post costs no verdict", async () => {
    expect((await post(valid, { origin: "https://evil.example" })).status).toBe(403);
    expect(checkBotId).not.toHaveBeenCalled();
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
  const RAW = "Ada Secretname ada.secret@example.com my secret message {";
  const none = () => {};

  // Every exit the route has, each carrying the secrets, each proven reached by its status.
  it.each([
    ["no Origin", none, () => post(valid, { origin: null }), 403],
    ["a foreign Origin", none, () => post(valid, { origin: "https://evil.example" }), 403],
    ["a Content-Length over the cap", none, () =>
      POST(new Request(`https://${HOST}/api/contact`, {
        method: "POST",
        headers: { origin: `https://${HOST}`, host: HOST, "content-length": String(16 * 1024 + 1) },
        body: JSON.stringify(valid),
      })), 413],
    ["a body over the cap", none, () => post({ ...valid, message: `my secret message ${"x".repeat(16 * 1024)}` }), 413],
    ["a body that isn't JSON", none, () => post(RAW, { raw: true }), 400],
    ["JSON that isn't an object", none, () => post(JSON.stringify(SECRETS), { raw: true }), 400],
    ["a bot verdict", () => checkBotId.mockResolvedValue({ isHuman: false, isBot: true, isVerifiedBot: false, bypassed: false }), () => post(), 403],
    ["a failed bot check", () => checkBotId.mockRejectedValue(new Error("provider said ada.secret@example.com")), () => post(), 403],
    ["a filled honeypot", none, () => post({ ...valid, hp: "x" }), 200],
    ["a too-fast submit", none, () => post({ ...valid, elapsedMs: 100 }), 429],
    ["a failed validation", none, () => post({ ...valid, email: "ada.secret@" }), 400],
    ["a missing key", () => { delete process.env.RESEND_API_KEY; }, () => post(), 500],
    ["a resolved error", () => send.mockResolvedValue({ data: null, error: { name: "x", statusCode: 500, message: "provider said ada.secret@example.com" } }), () => post(), 502],
    ["neither data nor an error", () => send.mockResolvedValue({ data: null, error: null }), () => post(), 502],
    ["a rejection", () => send.mockRejectedValue(new Error("provider said ada.secret@example.com")), () => post(), 502],
    ["a success", none, () => post(), 200],
  ] as const)("never logs the submission or the provider's message: %s", async (_name, arrange, request, status) => {
    const spies = (["error", "log", "warn", "info", "debug"] as const).map((m) =>
      vi.spyOn(console, m).mockImplementation(() => {}),
    );
    arrange();
    expect((await request()).status).toBe(status);
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
