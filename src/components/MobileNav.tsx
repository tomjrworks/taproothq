"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, CALENDLY_URL, AUDIT_URL } from "@/lib/constants";

export default function MobileNav({
  open,
  onClose,
  resolveHref,
}: {
  open: boolean;
  onClose: () => void;
  resolveHref: (href: string) => string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-cream flex flex-col"
        >
          {/* Header with close button */}
          <div className="px-6 h-16 flex items-center justify-between border-b border-bark/5">
            <span className="font-display font-bold text-lg tracking-tight text-bark">
              Taproot
            </span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-bark"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={resolveHref(link.href)}
                onClick={onClose}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-display text-2xl font-semibold text-bark hover:text-forest transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            <div className="flex flex-col gap-4 mt-4 w-64">
              <a
                href={AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center justify-center bg-forest text-cream font-medium px-6 py-3 rounded-md hover:bg-forest-dark transition-colors text-base"
              >
                Start Free Audit
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center justify-center border border-bark/20 text-bark font-medium px-6 py-3 rounded-md hover:border-bark/40 transition-colors text-base"
              >
                Book a Call
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
