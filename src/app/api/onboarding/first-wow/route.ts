import { withOnboardingStep } from "@/lib/onboarding-step";

// First-wow is an instructional step: the user is told to go save +
// retrieve a note in their actual AI client, not in this wizard. The proxy
// just advances the workspace's onboarding_step to rules-review — no note
// is saved to the user's vault.
export const POST = withOnboardingStep("first-wow", "rules-review");
