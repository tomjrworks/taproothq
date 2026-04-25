"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Use cases", href: "/use-cases" },
  { label: "About", href: "/about" },
] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 100);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(234, 229, 214, 0.95)"
          : "rgba(234, 229, 214, 0.4)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderColor: scrolled
          ? "rgba(61, 53, 41, 0.08)"
          : "rgba(61, 53, 41, 0.03)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl text-bark tracking-tight leading-none"
        >
          Taproot
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm text-bark/70 transition-colors hover:text-forest-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA — soft pill matching FinalCTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 bg-forest-dark text-cream font-sans text-sm px-5 py-2 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
        >
          <span className="sm:hidden">Book a call</span>
          <span className="hidden sm:inline">Book a discovery call</span>
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </motion.nav>
  );
}
