"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const STEP_MAP: Record<string, number> = {
  "/onboarding/persona": 2,
  "/onboarding/clients": 3,
  "/onboarding/obsidian": 4,
  "/onboarding/helper": 5,
  "/onboarding/permissions": 6,
  "/onboarding/connect": 7,
  "/onboarding/first-wow": 8,
  "/onboarding/rules-review": 9,
  "/onboarding/done": 10,
};

export function OnboardingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step = STEP_MAP[pathname] ?? 2;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bark/8">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-xl text-bark tracking-tight leading-none"
        >
          Taproot
          <Image
            src="/images/taproot-logo.png"
            alt=""
            width={401}
            height={477}
            className="h-6 w-auto"
          />
        </Link>
        <span className="font-mono text-xs text-bark/40 uppercase tracking-widest">
          Step {step} of 10
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[640px]">{children}</div>
      </main>

      <footer className="flex items-center justify-center px-6 py-4 border-t border-bark/8">
        <a
          href="mailto:tom@taproothq.com?subject=Taproot%20setup%20help"
          className="font-sans text-sm text-bark/40 hover:text-bark transition-colors"
        >
          Need help?
        </a>
      </footer>
    </div>
  );
}
