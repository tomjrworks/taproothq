import { withOnboardingStep } from "@/lib/onboarding-step";

// Use-cases is a purely informational "here's what you can do" step that
// sits between rules-review and done. No state mutation beyond advancing
// the workspace's onboarding_step.
export const POST = withOnboardingStep("use-cases", "done");
