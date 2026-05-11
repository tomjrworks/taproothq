import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { getClientSetupInfo } from "@/lib/api";

// Trim the AI-clients list shown in the SITE onboarding wizard to the two
// integrations that cover >90% of users today. Other clients still ship via
// PRODUCT (cursor, claude_desktop, cli, etc.) but are hidden from this step
// to keep the wizard focused. Plan: calm-prancing-hoare.md D4.
const ALLOWED_CLIENT_IDS = new Set(["claude_web", "chatgpt"]);

export const GET = withAuthedProxy(async (_req, jwt) => {
  const data = await getClientSetupInfo(jwt);
  const filtered = data.filter((c) => ALLOWED_CLIENT_IDS.has(c.id));
  if (filtered.length === 0 && data.length > 0) {
    console.warn(
      "[clients/setup-info] filter removed all clients — PRODUCT IDs may have changed. Returning unfiltered list.",
      { receivedIds: data.map((c) => c.id) },
    );
    return NextResponse.json(data);
  }
  return NextResponse.json(filtered);
});
