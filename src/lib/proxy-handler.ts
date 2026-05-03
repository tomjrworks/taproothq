import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/api";

const ALLOWED_ORIGINS = new Set<string>([
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://taproothq.com",
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://localhost:3001"]
    : []),
]);

type AuthedHandler = (req: NextRequest, jwt: string) => Promise<NextResponse>;

export function withAuthedProxy(handler: AuthedHandler) {
  return async function (req: NextRequest): Promise<NextResponse> {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      return await handler(req, session.access_token);
    } catch (err) {
      if (err instanceof ApiError) {
        return NextResponse.json(
          { error: err.message },
          { status: err.status },
        );
      }
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  };
}
