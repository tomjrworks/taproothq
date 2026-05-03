"use client";
import { useState } from "react";

export default function DigestToggle() {
  const [enabled, setEnabled] = useState(true);
  // TODO(P3): persist via /api/dashboard/digest-pref
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-sans text-sm text-bark">
          receive weekly digest emails
        </p>
        <p className="mt-0.5 font-sans text-xs text-bark/40">
          sent sunday mornings
        </p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled((v) => !v)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-dark/40 ${
          enabled ? "bg-forest-dark" : "bg-bark/15"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-cream shadow-sm transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
