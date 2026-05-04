import { createClient } from "@supabase/supabase-js";
import { verifyUnsubscribeToken } from "@/lib/resend";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return htmlResponse(page("missing token.", false), 400);
  }

  const workspaceId = verifyUnsubscribeToken(token);
  if (!workspaceId) {
    return htmlResponse(page("invalid or expired link.", false), 400);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[unsubscribe] missing supabase env vars");
    return htmlResponse(page("server not configured.", false), 500);
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error } = await supabase
    .from("digest_preferences")
    .update({ email_subscribed: false })
    .eq("workspace_id", workspaceId);

  if (error) {
    console.error("[unsubscribe] supabase error:", error);
    return htmlResponse(
      page("something went wrong. try again from your settings.", false),
      502,
    );
  }

  return htmlResponse(
    page(
      "done — you won't receive weekly digest emails. you can re-subscribe any time from your settings.",
      true,
    ),
    200,
  );
}

function htmlResponse(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function page(message: string, success: boolean): string {
  const msgColor = success ? "#1A5C32" : "rgba(61,53,41,0.6)";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>taproot · unsubscribe</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#EAE5D6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:32px 16px}
    .card{max-width:400px;width:100%}
    .eyebrow{font-family:monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(61,53,41,0.4);margin-bottom:16px}
    .msg{font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.55;color:${msgColor};margin-bottom:24px}
    .back{font-family:monospace;font-size:11px;color:rgba(61,53,41,0.4);text-decoration:none}
    .back:hover{color:rgba(61,53,41,0.7)}
  </style>
</head>
<body>
  <div class="card">
    <p class="eyebrow">taproot</p>
    <p class="msg">${esc(message)}</p>
    <a href="https://connect.taproothq.com/dashboard/settings" class="back">← settings</a>
  </div>
</body>
</html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
