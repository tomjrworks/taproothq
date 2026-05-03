import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep } from "@/lib/api";

export const POST = withAuthedProxy(async (_req, jwt) => {
  const supabase = createClient();
  const { data: ws } = await supabase
    .from("workspaces")
    .select("settings")
    .single();
  const currentStep = (ws?.settings as { onboarding_step?: string } | null)
    ?.onboarding_step;
  if (currentStep !== "done") {
    return NextResponse.json(
      {
        error: "precondition_failed",
        reason: "not_at_done_step",
        current: currentStep,
      },
      { status: 400 },
    );
  }
  await advanceStep(jwt, "complete");
  return NextResponse.json({ ok: true });
});
