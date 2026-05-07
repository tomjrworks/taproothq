import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { acceptRulesReview } from "@/lib/api";

export const POST = withAuthedProxy(async (req, jwt) => {
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
