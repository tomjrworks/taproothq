import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { coerceLegacyStep } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = (searchParams.get("type") ?? "signup") as EmailOtpType;
  const explicitNext = searchParams.get("next");

  if (!token_hash) {
    return NextResponse.redirect(
      new URL("/sign-in?error=confirmation_failed", request.url),
    );
  }

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  const { error } = await supabase.auth.verifyOtp({ token_hash, type });

  if (error) {
    console.error("[auth/confirm] verifyOtp error:", error.message);
    return NextResponse.redirect(
      new URL("/sign-in?error=confirmation_failed", request.url),
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    const productUrl =
      process.env.PRODUCT_API_URL ?? "https://connect.taproothq.com";
    const wsRes = await fetch(`${productUrl}/api/workspace`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
    }).catch((err) => {
      console.error("[auth/confirm] workspace create fetch failed:", err);
      return null;
    });
    if (!wsRes?.ok) {
      const body = await wsRes?.text().catch(() => "");
      console.error(
        "[auth/confirm] workspace create failed:",
        wsRes?.status,
        body,
      );
      return NextResponse.redirect(
        new URL("/sign-in?error=workspace_create_failed", request.url),
      );
    }
  }

  let resolvedNext = explicitNext;
  if (!resolvedNext) {
    const { data: ws } = await supabase
      .from("workspaces")
      .select("settings")
      .single();
    const rawStep =
      (ws?.settings as { onboarding_step?: string } | null)?.onboarding_step ??
      "clients";
    const step = coerceLegacyStep(rawStep);
    resolvedNext = step === "complete" ? "/dashboard" : `/onboarding/${step}`;
  }

  return NextResponse.redirect(new URL(resolvedNext, request.url));
}
