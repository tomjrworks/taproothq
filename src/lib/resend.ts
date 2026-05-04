import { Resend } from "resend";
import { createHmac, timingSafeEqual } from "crypto";
import { renderDigestEmail } from "@/emails/digest";
import type { DigestBulletData } from "@/types/digest";

export type SendDigestEmailParams = {
  workspaceId: string;
  workspaceName: string;
  toEmail: string;
  weekLabel: string;
  bullets: DigestBulletData[];
};

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  return new Resend(key);
}

function hmacHex(payload: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error("UNSUBSCRIBE_SECRET not set");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

// Stateless, permanent unsubscribe token — no expiry by design
export function signUnsubscribeToken(workspaceId: string): string {
  const sig = hmacHex(workspaceId);
  return Buffer.from(`${workspaceId}.${sig}`).toString("base64url");
}

export function verifyUnsubscribeToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const dot = decoded.lastIndexOf(".");
    if (dot < 1) return null;
    const workspaceId = decoded.slice(0, dot);
    const sig = decoded.slice(dot + 1);
    const expected = hmacHex(workspaceId);
    if (sig.length !== expected.length) return null;
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return null;
    return timingSafeEqual(a, b) ? workspaceId : null;
  } catch {
    return null;
  }
}

export async function sendDigestEmail(
  params: SendDigestEmailParams,
): Promise<void> {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://connect.taproothq.com";
  const token = signUnsubscribeToken(params.workspaceId);
  const { html, text } = renderDigestEmail({
    workspaceName: params.workspaceName,
    weekLabel: params.weekLabel,
    bullets: params.bullets,
    unsubscribeToken: token,
    appUrl,
  });

  const resend = getResend();
  const unsubUrl = `${appUrl}/api/unsubscribe?token=${token}`;

  const result = await resend.emails.send({
    from: "Taproot <digest@taproothq.com>",
    to: params.toEmail,
    subject: `your garden · ${params.weekLabel}`,
    html,
    text,
    headers: {
      // RFC 8058 one-click unsubscribe — surfaces button in Gmail + Apple Mail
      "List-Unsubscribe": `<${unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  if (result.error) {
    throw new Error(`[sendDigestEmail] ${result.error.message}`);
  }
}
