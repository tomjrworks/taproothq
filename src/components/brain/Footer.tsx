"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-night border-t border-ivory/5 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <p className="font-sans font-bold text-ivory">Taproot</p>

          {/* Links + Copyright */}
          <div className="flex gap-6 items-center">
            <Link
              href="#"
              className="font-mono text-xs uppercase tracking-wide text-stone hover:text-forest transition"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="font-mono text-xs uppercase tracking-wide text-stone hover:text-forest transition"
            >
              Terms
            </Link>
            <span className="text-xs text-stone/40">&copy; 2026 Taproot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
