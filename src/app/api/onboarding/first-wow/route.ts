import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep } from "@/lib/api";

// First-wow is now an instructional step: the user is told to go save +
// retrieve a note in their actual AI client, not in this wizard. The proxy
// just advances the workspace's onboarding_step to rules-review — no note
// is saved to the user's vault. Avoids polluting inbox/ with placeholder
// content that would have to be cleaned up post-walk.
export const POST = withAuthedProxy(async (_req, jwt) => {
  await advanceStep(jwt, "rules-review");
  return NextResponse.json({ ok: true, advanced_to: "rules-review" });
});
