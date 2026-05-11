import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { coerceLegacyStep } from "@/lib/api";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseConfigured =
  supabaseUrl.startsWith("https://") && supabaseAnonKey.length > 10;

export async function middleware(request: NextRequest) {
  // Skip auth checks when Supabase isn't configured (local dev without credentials)
  if (!supabaseConfigured) return NextResponse.next();

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Refresh session — IMPORTANT: getUser() must be called to keep the
  // session alive. Do not replace with getSession().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith("/onboarding") || pathname.startsWith("/dashboard");

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Resume gate: keep signed-in users on the step their workspace says they're on.
  if (
    user &&
    (pathname.startsWith("/onboarding") || pathname.startsWith("/dashboard"))
  ) {
    const { data: ws, error: wsErr } = await supabase
      .from("workspaces")
      .select("settings")
      .single();

    // No workspace yet (race with workspace-create on first signin) — let through;
    // the onboarding layout will retry workspace creation.
    if (!wsErr && ws) {
      const rawStep =
        (ws.settings as { onboarding_step?: string } | null)?.onboarding_step ??
        "clients";
      const step = coerceLegacyStep(rawStep);

      if (step === "complete") {
        // Completed user wandered into /onboarding — bounce to dashboard.
        if (pathname.startsWith("/onboarding")) {
          const url = request.nextUrl.clone();
          url.pathname = "/dashboard";
          url.search = "";
          return NextResponse.redirect(url);
        }
      } else {
        // Mid-wizard user hit /dashboard — bounce to their saved step.
        if (pathname.startsWith("/dashboard")) {
          const url = request.nextUrl.clone();
          url.pathname = `/onboarding/${step}`;
          url.search = "";
          return NextResponse.redirect(url);
        }
        // Mid-wizard user hit a different step's URL — bounce to saved step.
        if (
          pathname.startsWith("/onboarding/") &&
          pathname !== `/onboarding/${step}`
        ) {
          const url = request.nextUrl.clone();
          url.pathname = `/onboarding/${step}`;
          url.search = "";
          return NextResponse.redirect(url);
        }
      }
    }
  }

  // Redirect signed-in users away from auth pages
  if (user && (pathname === "/sign-in" || pathname === "/sign-up")) {
    const next = request.nextUrl.searchParams.get("next") ?? "/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/onboarding/:path*", "/dashboard/:path*"],
};
