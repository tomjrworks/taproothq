import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { markClientConnected } from "@/lib/api";

export const POST = withAuthedProxy(async (req, jwt) => {
  const id = new URL(req.url).pathname.split("/").at(-2)!;
  await markClientConnected(jwt, id);
  return NextResponse.json({ ok: true });
});
