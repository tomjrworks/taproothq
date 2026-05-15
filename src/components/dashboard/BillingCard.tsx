"use client";

import { useState } from "react";
import type { BillingStatus } from "@/lib/api";

type Interval = "month" | "year";

async function redirectToCheckout(interval: Interval) {
  const res = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interval }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

async function redirectToPortal() {
  const res = await fetch("/api/billing/portal", { method: "POST" });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BillingCard({ billing }: { billing: BillingStatus }) {
  const [interval, setInterval] = useState<Interval>("month");
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    await redirectToCheckout(interval);
    setLoading(false);
  }

  async function handlePortal() {
    setLoading(true);
    await redirectToPortal();
    setLoading(false);
  }

  const { status, days_remaining, current_period_end, grandfathered } = billing;

  return (
    <div className="rounded-sm border border-bark/10 p-4 space-y-4">
      {/* Status row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {status === "trialing" && (
            <>
              <p className="font-sans text-sm text-bark">
                trial —{" "}
                {days_remaining != null && days_remaining > 0
                  ? `${days_remaining} day${days_remaining === 1 ? "" : "s"} remaining`
                  : "expired"}
              </p>
              <p className="mt-0.5 font-sans text-xs text-bark/40">
                subscribe to keep the AI layer running
              </p>
            </>
          )}
          {status === "active" && (
            <>
              <p className="font-sans text-sm text-bark">active</p>
              <p className="mt-0.5 font-sans text-xs text-bark/40">
                renews {formatDate(current_period_end)}
              </p>
            </>
          )}
          {status === "grandfathered" && (
            <>
              <p className="font-sans text-sm text-bark">early access — free</p>
              <p className="mt-0.5 font-sans text-xs text-bark/40">
                you&apos;re grandfathered in
              </p>
            </>
          )}
          {status === "past_due" && (
            <>
              <p className="font-sans text-sm text-[#b45309]">payment failed</p>
              <p className="mt-0.5 font-sans text-xs text-bark/40">
                update your payment method to avoid interruption
              </p>
            </>
          )}
          {status === "canceled" && (
            <>
              <p className="font-sans text-sm text-bark">subscription ended</p>
              <p className="mt-0.5 font-sans text-xs text-bark/40">
                resubscribe to re-enable sync and AI tools
              </p>
            </>
          )}
          {status === "paused" && (
            <>
              <p className="font-sans text-sm text-bark">paused</p>
              <p className="mt-0.5 font-sans text-xs text-bark/40">
                your subscription is paused
              </p>
            </>
          )}
        </div>

        {/* Action buttons */}
        {status === "active" && (
          <button
            onClick={handlePortal}
            disabled={loading}
            className="rounded-sm border border-bark/15 px-3 py-1.5 font-sans text-sm text-bark/60 transition-colors hover:border-bark/30 hover:text-bark disabled:opacity-50 shrink-0"
          >
            {loading ? "…" : "manage billing"}
          </button>
        )}

        {status === "past_due" && (
          <button
            onClick={handlePortal}
            disabled={loading}
            className="rounded-sm bg-bark px-3 py-1.5 font-sans text-sm text-cream transition-colors hover:bg-bark/85 disabled:opacity-50 shrink-0"
          >
            {loading ? "…" : "update payment"}
          </button>
        )}
      </div>

      {(status === "trialing" || status === "canceled") && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex overflow-hidden rounded-sm border border-bark/15 font-sans text-sm">
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
            onClick={handleCheckout}
            disabled={loading}
            className="rounded-sm bg-bark px-4 py-1.5 font-sans text-sm text-cream transition-colors hover:bg-bark/85 disabled:opacity-50"
          >
            {loading
              ? "…"
              : status === "canceled"
                ? "resubscribe"
                : "subscribe"}
          </button>
        </div>
      )}

      {grandfathered && status !== "grandfathered" && (
        <p className="font-sans text-xs text-bark/30">grandfathered account</p>
      )}
    </div>
  );
}
