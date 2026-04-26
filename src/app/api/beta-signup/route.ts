import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email: string | undefined;
  try {
    const body = (await req.json()) as { email?: string };
    email = body.email?.trim().toLowerCase();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("[beta-signup] missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  // Resend treats duplicate contacts as a soft error — surface success either way
  // so the UI doesn't punish someone who signed up twice.
  const result = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  });

  if (result.error) {
    const msg = result.error.message ?? "";
    const isDuplicate = /already|exist/i.test(msg);
    if (!isDuplicate) {
      console.error("[beta-signup] resend error:", result.error);
      return Response.json({ error: "Signup failed" }, { status: 502 });
    }
  }

  // Fire-and-forget Discord ping; never block the user response on it.
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `New Taproot beta signup: \`${email}\``,
      }),
    }).catch((err) => {
      console.error("[beta-signup] discord webhook error:", err);
    });
  }

  return Response.json({ ok: true });
}
