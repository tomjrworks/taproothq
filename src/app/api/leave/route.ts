import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { leaveTaproot } from "@/lib/api";

export const POST = withAuthedProxy(async (_req, jwt) => {
  const result = await leaveTaproot(jwt);
  return NextResponse.json(result);
});
