// Validation and email text for the two Labs forms. Pure, so the forms can share its limits.

export const INTERESTS = ["iOS apps", "Web apps", "AI tools", "Automation"];
export const LIMITS = { name: 100, email: 254, company: 120, message: 4000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL = /[\u0000-\u001F\u007F-\u009F\u2028\u2029]/g;
const CONTROL_EXCEPT_NEWLINE = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u2028\u2029]/g;
const SUBJECT_MAX = 120;

export type ContactSubmission = {
  kind: "contact" | "work";
  name: string;
  email: string;
  company?: string;
  interests?: string[];
  message?: string;
};

const clean = (s: string) => s.replace(CONTROL, "").trim();

export function parseContactSubmission(input: unknown): ContactSubmission | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return null;
  const { kind, name, email, company, interests, message } = input as Record<string, unknown>;

  if (kind !== "contact" && kind !== "work") return null;
  if (typeof name !== "string" || typeof email !== "string") return null;

  const cleanName = clean(name);
  if (!cleanName || cleanName.length > LIMITS.name) return null;

  // Checked before stripping: joining "a@b.com\nfoo" would pass as a different address.
  if (/[\r\n]/.test(email.trim())) return null;
  const cleanEmail = clean(email);
  if (cleanEmail.length > LIMITS.email || !EMAIL_RE.test(cleanEmail)) return null;

  if (message !== undefined && typeof message !== "string") return null;
  const cleanMessage = message?.replace(CONTROL_EXCEPT_NEWLINE, "").trim() ?? "";
  if (cleanMessage.length > LIMITS.message) return null;

  const base = { name: cleanName, email: cleanEmail };
  if (kind === "contact") {
    return cleanMessage ? { kind, ...base, message: cleanMessage } : null;
  }

  if (company !== undefined && typeof company !== "string") return null;
  const cleanCompany = company === undefined ? "" : clean(company);
  if (cleanCompany.length > LIMITS.company) return null;

  if (interests !== undefined) {
    if (!Array.isArray(interests)) return null;
    if (!interests.every((i) => INTERESTS.includes(i))) return null;
  }

  return {
    kind,
    ...base,
    company: cleanCompany || undefined,
    interests: interests as string[] | undefined,
    message: cleanMessage || undefined,
  };
}

export function buildContactEmail(s: ContactSubmission, now: Date = new Date()) {
  const name = s.name.replace(/[\r\n]/g, "");
  const subject = (
    s.kind === "contact" ? `New note from ${name}` : `${name} asked to see our work`
  ).slice(0, SUBJECT_MAX);

  const lines = [`Name: ${s.name}`, `Email: ${s.email}`];
  if (s.company) lines.push(`Company: ${s.company}`);
  if (s.interests?.length) lines.push(`Wants to see: ${s.interests.join(", ")}`);
  if (s.message) lines.push("", s.message);
  lines.push("", `Sent from the ${s.kind} form on taproothq.com at ${now.toISOString()}`);

  return { subject, text: lines.join("\n") };
}
