import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { createCheckoutSession } from "@/lib/api";

export const POST = withAuthedProxy(async (req, jwt) => {
  const body = await req.json();
  const interval: "month" | "year" =
    body.interval === "year" ? "year" : "month";
  const { url } = await createCheckoutSession(jwt, interval);
  return NextResponse.json({ url });
});
