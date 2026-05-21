import { NextResponse } from "next/server";
import { withAuthedProxy } from "@/lib/proxy-handler";
import { deleteAccount } from "@/lib/api";

export const DELETE = withAuthedProxy(async (_req, jwt) => {
  const result = await deleteAccount(jwt);
  return NextResponse.json(result);
});
