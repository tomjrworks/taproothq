"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Use cases", href: "/use-cases" },
  { label: "About", href: "/about" },
] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 100);
    });
    return unsubscribe;
  }, [scrollY]);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{
          backgroundColor:
            scrolled || menuOpen
              ? "rgba(234, 229, 214, 0.95)"
              : "rgba(234, 229, 214, 0.4)",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "blur(0px)",
          WebkitBackdropFilter:
            scrolled || menuOpen ? "blur(12px)" : "blur(0px)",
          borderColor: scrolled
            ? "rgba(61, 53, 41, 0.08)"
            : "rgba(61, 53, 41, 0.03)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 font-serif text-2xl text-bark tracking-tight leading-none"
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

          {/* Desktop nav links */}
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

          {/* Right cluster: CTA + mobile hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="#join"
              onClick={() => setMenuOpen(false)}
              className="group inline-flex items-center gap-1.5 bg-forest-dark text-cream font-sans text-sm px-5 py-2 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
            >
              <span className="sm:hidden">Join beta</span>
              <span className="hidden sm:inline">Join the beta</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="sm:hidden -mr-2 p-2 text-bark transition-colors hover:text-forest-dark"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu sheet — sits under the fixed nav bar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 sm:hidden border-b"
            style={{
              backgroundColor: "rgba(234, 229, 214, 0.98)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: "rgba(61, 53, 41, 0.08)",
            }}
          >
            <nav className="flex flex-col px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl text-bark py-3 transition-colors hover:text-forest-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 8h14M4 14h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6l10 10M16 6l-10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
