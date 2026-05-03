import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { getClientSetupInfo } from "@/lib/api";

export const GET = withAuthedProxy(async (_req, jwt) => {
  const data = await getClientSetupInfo(jwt);
  return NextResponse.json(data);
});
