import type { DigestBulletData } from "@/types/digest";

type RenderParams = {
  workspaceName: string;
  weekLabel: string;
  bullets: DigestBulletData[];
  unsubscribeToken: string;
  appUrl: string;
};

const C = {
  cream: "#EAE5D6",
  bark: "#3d3529",
  forestDark: "#1A5C32",
  muted: "rgba(61,53,41,0.45)",
  faint: "rgba(61,53,41,0.25)",
  border: "rgba(61,53,41,0.08)",
  bg: "#f0ece1",
};

export function renderDigestEmail({
  workspaceName,
  weekLabel,
  bullets,
  unsubscribeToken,
  appUrl,
}: RenderParams): { html: string; text: string } {
  const dashboardUrl = `${appUrl}/dashboard`;
  const unsubUrl = `${appUrl}/api/unsubscribe?token=${unsubscribeToken}`;

  const bulletRows = bullets
    .map((b) => {
      const chips = b.source_keys
        .map(
          (k) =>
            `<span style="display:inline-block;font-family:monospace;font-size:10px;padding:2px 6px;border:1px solid ${C.faint};border-radius:2px;color:${C.muted};margin-right:4px;">${esc(k)}</span>`,
        )
        .join("");

      const count = b.evidence.length;
      const countLabel = `${count} source${count !== 1 ? "s" : ""}`;

      return `
<tr>
  <td style="padding:16px 0;border-bottom:1px solid ${C.border};">
    <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:${C.bark};line-height:1.55;">${esc(b.text)}</p>
    <div>${chips}<span style="font-family:monospace;font-size:10px;color:${C.muted};">${esc(countLabel)}</span></div>
  </td>
</tr>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>your garden · ${esc(weekLabel)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:${C.cream};border-radius:4px;overflow:hidden;">

        <!-- header eyebrow -->
        <tr>
          <td style="padding:32px 36px 20px 36px;">
            <p style="margin:0 0 4px 0;font-family:monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${C.muted};">taproot</p>
            <p style="margin:0;font-family:monospace;font-size:11px;color:${C.muted};">— ${esc(weekLabel)} —</p>
          </td>
        </tr>

        <!-- heading -->
        <tr>
          <td style="padding:0 36px 28px 36px;">
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:${C.bark};line-height:1.35;">three things in your garden<br /><em>this week.</em></h1>
          </td>
        </tr>

        <!-- bullets -->
        <tr>
          <td style="padding:0 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              ${bulletRows}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 36px 28px 36px;">
            <a href="${dashboardUrl}" style="display:inline-block;padding:10px 22px;background-color:${C.forestDark};color:${C.cream};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:0.01em;text-decoration:none;border-radius:3px;">open your garden →</a>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="padding:0 36px 32px 36px;border-top:1px solid ${C.border};">
            <p style="margin:16px 0 0 0;font-family:monospace;font-size:10px;color:${C.muted};">this is your weekly taproot digest for ${esc(workspaceName)}.</p>
            <p style="margin:6px 0 0 0;font-family:monospace;font-size:10px;"><a href="${unsubUrl}" style="color:${C.muted};text-decoration:underline;">unsubscribe from digest emails</a></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const bulletText = bullets
    .map(
      (b, i) =>
        `${i + 1}. ${b.text}\n   [${b.source_keys.join(", ")}] · ${b.evidence.length} source${b.evidence.length !== 1 ? "s" : ""}`,
    )
    .join("\n\n");

  const text = `your garden · ${weekLabel}

${bulletText}

open your garden: ${dashboardUrl}

---
this is your weekly taproot digest for ${workspaceName}.
unsubscribe: ${unsubUrl}`;

  return { html, text };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
