"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Use cases", href: "/use-cases" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export default function Footer() {
  return (
    <footer
      className="film-grain py-16 md:py-20"
      style={{ backgroundColor: "#7a6655" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
          {/* Wordmark */}
          <p className="font-serif text-3xl md:text-4xl text-cream leading-none tracking-tight">
            Taproot
          </p>

          {/* Links + copy */}
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="font-sans text-xs text-cream/40">
              &copy; 2026 Taproot
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
