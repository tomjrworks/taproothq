import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep, coerceLegacyStep, type OnboardingStep } from "@/lib/api";

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
  // PRODUCT seeds new workspaces with legacy step names (migration 0021 still
  // writes "persona"; 2026-05-06 pivot left "vault" behind). Coerce on read so
  // the precondition guard compares against canonical names. The first
  // successful advance through this step overwrites the legacy DB value.
  const rawStep = (ws?.settings as { onboarding_step?: string } | null)
    ?.onboarding_step;
  const currentStep = rawStep ? coerceLegacyStep(rawStep) : undefined;
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
