import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep, type OnboardingStep } from "@/lib/api";

export type StepCheck =
  | { ok: true }
  | { ok: false; current: string | undefined };

export async function requireOnboardingStep(
  expected: OnboardingStep,
): Promise<StepCheck> {
  const supabase = createClient();
  const { data: ws } = await supabase
    .from("workspaces")
    .select("settings")
    .single();
  const currentStep = (ws?.settings as { onboarding_step?: string } | null)
    ?.onboarding_step;
  if (currentStep !== expected) return { ok: false, current: currentStep };
  return { ok: true };
}

export function withOnboardingStep(
  expected: OnboardingStep,
  next: OnboardingStep,
) {
  return withAuthedProxy(async (_req, jwt) => {
    const check = await requireOnboardingStep(expected);
    if (!check.ok) {
      return NextResponse.json(
        {
          error: "precondition_failed",
          reason: `not_at_${expected}_step`,
          current: check.current,
        },
        { status: 400 },
      );
    }
    await advanceStep(jwt, next);
    return NextResponse.json({ ok: true, advanced_to: next });
  });
}
