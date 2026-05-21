import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { getDigestPref, setDigestPref } from "@/lib/api";

export const GET = withAuthedProxy(async (_req, jwt) => {
  const result = await getDigestPref(jwt);
  return NextResponse.json(result);
});

export const POST = withAuthedProxy(async (req, jwt) => {
  const body = (await req.json().catch(() => ({}))) as {
    email_subscribed?: unknown;
  };
  if (typeof body.email_subscribed !== "boolean") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const result = await setDigestPref(jwt, body.email_subscribed);
  return NextResponse.json(result);
});
