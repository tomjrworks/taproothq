import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { getHelperPairToken } from "@/lib/api";

export const GET = withAuthedProxy(async (_req, jwt) => {
  const data = await getHelperPairToken(jwt);
  return NextResponse.json(data);
});
