"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AUDIT_URL, CALENDLY_URL } from "@/lib/constants";
import Link from "next/link";

export default function StickyNav() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [200, 350], [0, 1]);
  const y = useTransform(scrollY, [200, 350], [-20, 0]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-bark/5"
      style={{ opacity, y }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-sans font-bold text-lg tracking-tight text-bark"
        >
          Main Loop Systems
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <a href="#services" className="text-sm text-stone hover:text-forest transition-colors">
            What We Do
          </a>
          <a href="#about" className="text-sm text-stone hover:text-forest transition-colors">
            About
          </a>
          <Link href="/blog" className="text-sm text-stone hover:text-forest transition-colors">
            Blog
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-forest text-cream px-4 py-2 rounded-md hover:bg-forest-dark transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile: just the CTA */}
        <a
          href={AUDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden text-sm font-medium bg-forest text-cream px-4 py-2 rounded-md"
        >
          Free Audit
        </a>
      </div>
    </motion.nav>
  );
}
