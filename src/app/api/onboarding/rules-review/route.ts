import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { acceptRulesReview } from "@/lib/api";
import { requireOnboardingStep } from "@/lib/onboarding-step";

export const POST = withAuthedProxy(async (req, jwt) => {
  const check = await requireOnboardingStep("rules-review");
  if (!check.ok) {
    return NextResponse.json(
      {
        error: "precondition_failed",
        // Underscore form matches the client double-submit handler in
        // src/app/onboarding/rules-review/page.tsx (commit 6237e4d).
        reason: "not_at_rules_review_step",
        current: check.current,
      },
      { status: 400 },
    );
  }
  let body: { accept?: boolean; edits?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof body.accept !== "boolean") {
    return NextResponse.json(
      { error: "accept_required_boolean" },
      { status: 400 },
    );
  }
  if (body.edits != null && typeof body.edits !== "string") {
    return NextResponse.json(
      { error: "edits_must_be_string" },
      { status: 400 },
    );
  }
  if (body.edits != null && body.edits.length > 200_000) {
    return NextResponse.json(
      { error: "edits_too_large", limit: 200_000 },
      { status: 400 },
    );
  }
  try {
    const result = await acceptRulesReview(jwt, body.accept, body.edits);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "rules_review_failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
});
