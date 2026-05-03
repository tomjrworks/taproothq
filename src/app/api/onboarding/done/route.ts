import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { advanceStep, ApiError } from "@/lib/api";

export async function POST() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  try {
    await advanceStep(session.access_token, "complete");
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
