import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { getHelperStatus } from "@/lib/api";

export const GET = withAuthedProxy(async (_req, jwt) => {
  const data = await getHelperStatus(jwt);
  return NextResponse.json(data);
});
