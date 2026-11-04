import { describe, expect, it } from "vitest";
import { buildContactEmail, parseContactSubmission } from "./contact";

const contact = { kind: "contact", name: "Ada", email: "ada@example.com", message: "Build a thing" };
const work = { kind: "work", name: "Ada", email: "ada@example.com" };
const parse = (over: Record<string, unknown>, base: Record<string, unknown> = contact) =>
  parseContactSubmission({ ...base, ...over });
const emailOfLength = (n: number) => `${"a".repeat(n - "@example.com".length)}@example.com`;

describe("parseContactSubmission", () => {
  it("accepts a minimal contact and a minimal work submission", () => {
    expect(parse({})).toMatchObject({ kind: "contact", name: "Ada", email: "ada@example.com", message: "Build a thing" });
    expect(parse({}, work)).toMatchObject({ kind: "work", name: "Ada", email: "ada@example.com" });
  });

  it.each([null, undefined, "x", 1, [], ["contact"]])("rejects a non-object body: %j", (input) => {
    expect(parseContactSubmission(input)).toBeNull();
  });

  it("rejects an unknown or missing kind", () => {
    expect(parse({ kind: "spam" })).toBeNull();
    expect(parse({ kind: undefined })).toBeNull();
  });

  it("holds name to 1-100", () => {
    expect(parse({ name: "" })).toBeNull();
    expect(parse({ name: "   " })).toBeNull();
    expect(parse({ name: undefined })).toBeNull();
    expect(parse({ name: 7 })).toBeNull();
    expect(parse({ name: "a" })?.name).toBe("a");
    expect(parse({ name: "a".repeat(100) })?.name).toHaveLength(100);
    expect(parse({ name: "a".repeat(101) })).toBeNull();
  });

  it("holds email to 254 and a valid shape", () => {
    expect(parse({ email: emailOfLength(254) })?.email).toHaveLength(254);
    expect(parse({ email: emailOfLength(255) })).toBeNull();
    for (const bad of ["", "ada", "ada@", "@example.com", "ada@example", "a b@example.com", "a@b@c.com", 7, undefined]) {
      expect(parse({ email: bad })).toBeNull();
    }
  });

  it("rejects CR or LF inside an email rather than joining the pieces", () => {
    expect(parse({ email: "ada@example.com\r\nBcc: x@example.com" })).toBeNull();
    expect(parse({ email: "ada@example.com\nfoo" })).toBeNull();
    expect(parse({ email: "ada@example.com\rfoo" })).toBeNull();
  });

  it("requires a message of 1-4000 on contact", () => {
    expect(parse({ message: undefined })).toBeNull();
    expect(parse({ message: "" })).toBeNull();
    expect(parse({ message: "  \n " })).toBeNull();
    expect(parse({ message: "a" })?.message).toBe("a");
    expect(parse({ message: "a".repeat(4000) })?.message).toHaveLength(4000);
    expect(parse({ message: "a".repeat(4001) })).toBeNull();
  });

  it("leaves the message optional on work, capped at 4000", () => {
    expect(parse({}, work)?.message).toBeUndefined();
    expect(parse({ message: "" }, work)?.message).toBeUndefined();
    expect(parse({ message: "a".repeat(4000) }, work)?.message).toHaveLength(4000);
    expect(parse({ message: "a".repeat(4001) }, work)).toBeNull();
    expect(parse({ message: 7 }, work)).toBeNull();
  });

  it("holds company to 120 on work", () => {
    expect(parse({ company: "a".repeat(120) }, work)?.company).toHaveLength(120);
    expect(parse({ company: "a".repeat(121) }, work)).toBeNull();
    expect(parse({ company: "" }, work)?.company).toBeUndefined();
    expect(parse({ company: 7 }, work)).toBeNull();
  });

  it("holds interests to the allowlist on work", () => {
    const all = ["iOS apps", "Web apps", "AI tools", "Automation"];
    expect(parse({ interests: all }, work)?.interests).toEqual(all);
    expect(parse({ interests: [] }, work)?.interests).toEqual([]);
    expect(parse({ interests: ["iOS apps", "Blockchain"] }, work)).toBeNull();
    expect(parse({ interests: "iOS apps" }, work)).toBeNull();
    expect(parse({ interests: [7] }, work)).toBeNull();
  });

  it("carries no company or interests on a contact submission", () => {
    const parsed = parse({ company: "Acme", interests: ["iOS apps"] });
    expect(parsed?.company).toBeUndefined();
    expect(parsed?.interests).toBeUndefined();
  });

  it("trims and strips control characters, keeping newlines only in the message", () => {
    const parsed = parse({
      name: "  A\u0000d\u0007a\r\n ",
      email: " ada@example.com ",
      message: " line one\u0000\r\nline\ttwo\u2028\nend ",
    });
    expect(parsed?.name).toBe("Ada");
    expect(parsed?.email).toBe("ada@example.com");
    expect(parsed?.message).toBe("line one\nlinetwo\nend");
    expect(parse({ company: "Ac\nme\u0085" }, work)?.company).toBe("Acme");
  });

  it("counts a name of only control characters as empty", () => {
    expect(parse({ name: "\u0000\u0007" })).toBeNull();
  });
});

describe("buildContactEmail", () => {
  const now = new Date("2026-11-04T12:00:00.000Z");
  const full = {
    kind: "work" as const,
    name: "Ada",
    email: "ada@example.com",
    company: "Acme",
    interests: ["iOS apps", "AI tools"],
    message: "Show me\nthe builds",
  };

  it("writes the contact subject and a labelled body", () => {
    const { subject, text } = buildContactEmail(
      { kind: "contact", name: "Ada", email: "ada@example.com", message: "Build a thing" },
      now,
    );
    expect(subject).toBe("New note from Ada");
    expect(text).toContain("Name: Ada");
    expect(text).toContain("Email: ada@example.com");
    expect(text).toContain("Build a thing");
    expect(text).toContain("Sent from the contact form on taproothq.com at 2026-11-04T12:00:00.000Z");
    expect(text).not.toContain("Company:");
    expect(text).not.toContain("Wants to see:");
  });

  it("writes the work subject and every field", () => {
    const { subject, text } = buildContactEmail(full, now);
    expect(subject).toBe("Ada asked to see our work");
    expect(text).toContain("Company: Acme");
    expect(text).toContain("Wants to see: iOS apps, AI tools");
    expect(text).toContain("Show me\nthe builds");
    expect(text).toContain("Sent from the work form on taproothq.com at 2026-11-04T12:00:00.000Z");
  });

  it("strips CR and LF from the subject and caps it at 120", () => {
    expect(buildContactEmail({ ...full, name: "A\r\nBcc: x" }, now).subject).toBe("ABcc: x asked to see our work");
    const long = buildContactEmail({ ...full, name: "a".repeat(100) }, now).subject;
    expect(long).toHaveLength(120);
    expect(long.startsWith("a".repeat(100))).toBe(true);
  });

  it("is text only", () => {
    expect(buildContactEmail(full, now)).not.toHaveProperty("html");
  });
});
