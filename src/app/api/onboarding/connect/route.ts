import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep } from "@/lib/api";

export const POST = withAuthedProxy(async (_req, jwt) => {
  await advanceStep(jwt, "first-wow");
  return NextResponse.json({ ok: true });
});
