"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { safeNext } from "@/lib/safeNext";

type Mode = "password" | "magic-link";
type Stage = "form" | "check-email";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next")) ?? "/dashboard";
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<Mode>("password");
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError ? decodeURIComponent(urlError) : null,
  );

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      const msg = signInError.message.toLowerCase();
      if (msg.includes("invalid") || msg.includes("credentials")) {
        setError("Incorrect email or password.");
      } else if (msg.includes("rate") || msg.includes("limit")) {
        setError("Too many attempts — please wait a moment.");
      } else {
        setError(signInError.message);
      }
      return;
    }

    router.push(next);
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
        shouldCreateUser: false,
      },
    });

    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setStage("check-email");
  }

  if (stage === "check-email") {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[560px] text-center">
          <WordmarkLink />
          <h1 className="mt-10 font-serif text-3xl text-bark leading-snug">
            Check your inbox.
          </h1>
          <p className="mt-4 font-sans text-base text-bark/60 leading-relaxed">
            We sent a sign-in link to{" "}
            <span className="text-bark font-medium">{email}</span>.
          </p>
          <p className="mt-8 font-sans text-sm text-bark/40">
            Wrong email?{" "}
            <button
              type="button"
              className="underline hover:text-forest-dark transition-colors"
              onClick={() => {
                setStage("form");
                setEmail("");
              }}
            >
              Go back
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[560px]">
        <WordmarkLink />

        <div className="mt-10">
          <h1 className="font-serif text-4xl text-bark leading-tight">
            Welcome back.{" "}
            <em className="italic text-forest-dark">Your garden waited.</em>
          </h1>
        </div>

        <div className="mt-10 bg-cream-dark/40 rounded-lg border border-bark/8 p-8">
          {mode === "password" ? (
            <form onSubmit={handlePasswordSignIn} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-sm text-bark/70 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-cream border border-bark/15 rounded px-4 py-3 font-sans text-sm text-bark placeholder-bark/30 focus:outline-none focus:border-forest-dark/60 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="font-sans text-sm text-bark/70"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("magic-link");
                      setError(null);
                    }}
                    className="font-sans text-xs text-bark/40 hover:text-forest-dark transition-colors"
                  >
                    Forgot? Send a magic link
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-cream border border-bark/15 rounded px-4 py-3 pr-12 font-sans text-sm text-bark placeholder-bark/30 focus:outline-none focus:border-forest-dark/60 transition-colors"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-bark/40 hover:text-bark/70 transition-colors"
                  >
                    {showPassword ? "hide" : "show"}
                  </button>
                </div>
              </div>

              {error && (
                <p className="font-sans text-sm text-red-700">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in…" : "Sign in →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-5">
              <p className="font-sans text-sm text-bark/60">
                Enter your email and we&apos;ll send a one-click sign-in link.
              </p>

              <div>
                <label
                  htmlFor="email-magic"
                  className="block font-sans text-sm text-bark/70 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email-magic"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-cream border border-bark/15 rounded px-4 py-3 font-sans text-sm text-bark placeholder-bark/30 focus:outline-none focus:border-forest-dark/60 transition-colors"
                />
              </div>

              {error && (
                <p className="font-sans text-sm text-red-700">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending link…" : "Send magic link →"}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-bark/8 text-center">
            {mode === "password" ? (
              <button
                type="button"
                onClick={() => {
                  setMode("magic-link");
                  setError(null);
                }}
                className="font-sans text-sm text-bark/50 hover:text-forest-dark transition-colors"
              >
                Send me a magic link instead
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMode("password");
                  setError(null);
                }}
                className="font-sans text-sm text-bark/50 hover:text-forest-dark transition-colors"
              >
                Use a password instead
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-sm text-bark/40">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-bark/60 underline hover:text-forest-dark transition-colors"
          >
            Get started
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <span className="font-sans text-sm text-bark/40">Loading…</span>
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

function WordmarkLink() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-serif text-2xl text-bark tracking-tight leading-none w-fit"
    >
      Taproot
      <Image
        src="/images/taproot-logo.png"
        alt=""
        width={401}
        height={477}
        priority
        className="h-7 w-auto"
      />
    </Link>
  );
}
