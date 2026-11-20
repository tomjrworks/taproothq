import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { buildContactEmail, parseContactSubmission } from "@/lib/contact";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_ELAPSED_MS = 3000;

const json = (body: unknown, status = 200) => Response.json(body, { status });

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);

  // Vercel BotID (Basic). Closed on failure: a person still has the error line's mailto,
  // and an open door would spend the Resend quota every other product's mail shares.
  // Only an explicit isBot: false passes: botid turns an error body from Vercel into a verdict without isBot.
  try {
    const verdict = await checkBotId();
    if (verdict.isBot !== false || verdict.isVerifiedBot) return json({ error: "forbidden" }, 403);
  } catch (err) {
    console.error("[contact] bot check threw", err instanceof Error ? err.name : "unknown");
    return json({ error: "forbidden" }, 403);
  }

  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) {
    return json({ error: "too_large" }, 413);
  }
  const raw = await req.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "invalid" }, 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ error: "invalid" }, 400);
  }
  const { hp, elapsedMs } = body as { hp?: unknown; elapsedMs?: unknown };

  // Quiet on purpose: a bot that fills the hidden field learns nothing.
  if (hp) return json({ ok: true });

  // Not quiet: a person this quick sees the error line and succeeds on retry.
  if (typeof elapsedMs !== "number" || elapsedMs < MIN_ELAPSED_MS) {
    return json({ error: "too_fast" }, 429);
  }

  const submission = parseContactSubmission(body);
  if (!submission) return json({ error: "invalid" }, 400);

  // The production value carries a trailing newline, possibly as the two literal characters.
  const key = process.env.RESEND_API_KEY?.trim().replace(/\\n$/, "").trim();
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set");
    return json({ error: "not_configured" }, 500);
  }

  // Logs carry the error's name and status only, never the submission or the provider's message.
  try {
    const { subject, text } = buildContactEmail(submission);
    const result = await new Resend(key).emails.send({
      from: "Taproot Labs <forms@taproothq.com>",
      to: "tom@taproothq.com",
      replyTo: submission.email,
      subject,
      text,
    });
    // Resend resolves API and network failures rather than throwing.
    if (result.error) {
      console.error("[contact] send failed", result.error.name, result.error.statusCode);
      return json({ error: "send_failed" }, 502);
    }
    // No error and no message id is not a send either.
    if (!result.data) {
      console.error("[contact] send returned no data");
      return json({ error: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] send threw", err instanceof Error ? err.name : "unknown");
    return json({ error: "send_failed" }, 502);
  }

  return json({ ok: true });
}
