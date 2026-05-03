import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { savePersona, advanceStep } from "@/lib/api";

export const POST = withAuthedProxy(async (req, jwt) => {
  let body: { traits?: string[]; freetext?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body.freetext && body.freetext.length > 2048) {
    return NextResponse.json(
      { error: "freetext exceeds 2048 characters" },
      { status: 400 },
    );
  }
  await savePersona(jwt, body.traits ?? [], body.freetext);
  await advanceStep(jwt, "clients");
  return NextResponse.json({ ok: true });
});
