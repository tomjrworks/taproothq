import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep } from "@/lib/api";

// Use-cases is a purely informational "here's what you can do" step that
// sits between rules-review and done. No state mutation beyond advancing
// the workspace's onboarding_step. The page itself shows the user the
// capabilities + example prompts they can try in their AI client.
export const POST = withAuthedProxy(async (_req, jwt) => {
  await advanceStep(jwt, "done");
  return NextResponse.json({ ok: true, advanced_to: "done" });
});
