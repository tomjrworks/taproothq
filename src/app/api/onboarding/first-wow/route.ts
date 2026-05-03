import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { firstWow, advanceStep } from "@/lib/api";

export const POST = withAuthedProxy(async (req, jwt) => {
  let body: { remembered_text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.remembered_text?.trim()) {
    return NextResponse.json(
      { error: "remembered_text required" },
      { status: 400 },
    );
  }
  if (body.remembered_text.length > 16384) {
    return NextResponse.json(
      { error: "remembered_text exceeds 16384 characters" },
      { status: 400 },
    );
  }
  const result = await firstWow(jwt, body.remembered_text.trim());
  await advanceStep(jwt, "done");
  return NextResponse.json(result);
});
