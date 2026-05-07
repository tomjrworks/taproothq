import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { getRulesPreview } from "@/lib/api";

export const GET = withAuthedProxy(async (_req, jwt) => {
  try {
    const preview = await getRulesPreview(jwt);
    return NextResponse.json(preview);
  } catch (err: unknown) {
    const status =
      err instanceof Error && err.message.includes("persona_not_set")
        ? 404
        : 500;
    const message = err instanceof Error ? err.message : "rules_preview_failed";
    return NextResponse.json({ error: message }, { status });
  }
});
