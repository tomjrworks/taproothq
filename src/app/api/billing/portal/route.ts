import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { createPortalSession } from "@/lib/api";

export const POST = withAuthedProxy(async (_req, jwt) => {
  const { url } = await createPortalSession(jwt);
  return NextResponse.json({ url });
});
