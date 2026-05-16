"use client";

import { useState } from "react";
import { redirectToCheckout } from "@/lib/checkout";

type Interval = "month" | "year";

export default function ExpiredBlock() {
  const [interval, setInterval] = useState<Interval>("month");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    await redirectToCheckout(interval);
    setLoading(false);
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 font-serif text-xl text-bark">your trial has ended</p>
      <p className="mb-8 font-sans text-sm text-bark/50">
        subscribe to re-enable sync and AI tools. your vault files are safe.
      </p>

      <div className="flex items-center gap-3">
        <div className="flex rounded-sm border border-bark/15 overflow-hidden text-sm font-sans">
          <button
            onClick={() => setInterval("month")}
            className={`px-3 py-1.5 transition-colors ${
              interval === "month"
                ? "bg-bark text-cream"
                : "text-bark/50 hover:text-bark"
            }`}
          >
            $12 / month
          </button>
          <button
            onClick={() => setInterval("year")}
            className={`px-3 py-1.5 transition-colors ${
              interval === "year"
                ? "bg-bark text-cream"
                : "text-bark/50 hover:text-bark"
            }`}
          >
            $99 / year
          </button>
        </div>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="rounded-sm bg-bark px-4 py-1.5 font-sans text-sm text-cream transition-colors hover:bg-bark/85 disabled:opacity-50"
        >
          {loading ? "…" : "subscribe now"}
        </button>
      </div>
    </div>
  );
}
