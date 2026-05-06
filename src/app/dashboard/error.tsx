"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard.error]", error);
  }, [error]);

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-3xl text-bark">
        the soil shifted —{" "}
        <em className="font-serif italic text-forest-dark">
          something is off.
        </em>
      </h1>
      <p className="mt-4 font-sans text-sm text-bark/60">
        we couldn&apos;t load your garden just now. try again, or reload the
        page if it persists.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded border border-cream-dark bg-cream/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-bark transition hover:bg-cream/70"
      >
        try again
      </button>
    </div>
  );
}
