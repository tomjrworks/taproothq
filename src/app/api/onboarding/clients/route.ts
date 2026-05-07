import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { advanceStep } from "@/lib/api";

export const POST = withAuthedProxy(async (_req, jwt) => {
  await advanceStep(jwt, "obsidian");
  return NextResponse.json({ ok: true });
});
