"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
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
          ? "rgba(242, 240, 235, 0.95)"
          : "rgba(242, 240, 235, 0.4)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderColor: scrolled
          ? "rgba(61, 53, 41, 0.08)"
          : "rgba(61, 53, 41, 0.03)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-sans text-lg font-bold text-bark">
          Taproot
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-stone transition-colors hover:text-forest-dark"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-stone transition-colors hover:text-forest-dark"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* CTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-forest-dark px-4 sm:px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-cream transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="sm:hidden">Let&apos;s Talk</span>
          <span className="hidden sm:inline">Book a Discovery Call</span>
        </a>
      </div>
    </motion.nav>
  );
}
