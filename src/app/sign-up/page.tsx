"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Mode = "password" | "magic-link";
type Stage = "form" | "check-email";

export default function SignUpPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("password");
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePasswordSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback?next=/onboarding/persona`,
      },
    });

    setLoading(false);

    if (signUpError) {
      const msg = signUpError.message.toLowerCase();
      if (msg.includes("already") || msg.includes("exists")) {
        setError("account_exists");
      } else if (msg.includes("password")) {
        setError("weak_password");
      } else {
        setError(signUpError.message);
      }
      return;
    }

    // Auto-confirmed (local dev) → go directly to onboarding
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.confirmed_at) {
      router.push("/onboarding/persona");
    } else {
      setStage("check-email");
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback?next=/onboarding/persona`,
        shouldCreateUser: true,
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
            We sent a link to{" "}
            <span className="text-bark font-medium">{email}</span>. Click it to
            confirm your account and start your garden.
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
            Let&apos;s get your garden growing.{" "}
          </h1>
          <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
            Setup takes about 10 minutes. We&apos;ll build your garden, install
            the helper that keeps it synced, and connect it to the AI tools you
            already use.
          </p>
        </div>

        <div className="mt-10 bg-cream-dark/40 rounded-lg border border-bark/8 p-8">
          {mode === "password" ? (
            <form onSubmit={handlePasswordSignUp} className="space-y-5">
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
                <label
                  htmlFor="password"
                  className="block font-sans text-sm text-bark/70 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8+ characters"
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

              {error === "account_exists" && (
                <p className="font-sans text-sm text-red-700">
                  An account with this email already exists.{" "}
                  <Link
                    href="/sign-in"
                    className="underline hover:text-forest-dark"
                  >
                    Sign in instead?
                  </Link>
                </p>
              )}
              {error === "weak_password" && (
                <p className="font-sans text-sm text-red-700">
                  Password must be at least 8 characters.
                </p>
              )}
              {error &&
                error !== "account_exists" &&
                error !== "weak_password" && (
                  <p className="font-sans text-sm text-red-700">{error}</p>
                )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating your garden…" : "Create account →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-5">
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
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-bark/60 underline hover:text-forest-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
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
