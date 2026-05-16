"use client";

import Link from "next/link";

export default function TrialBanner({
  daysRemaining,
}: {
  daysRemaining: number;
}) {
  const label =
    daysRemaining <= 0
      ? "your trial has expired"
      : daysRemaining === 1
        ? "1 day left in your trial"
        : `${daysRemaining} days left in your trial`;

  return (
    <div className="border-b border-bark/10 bg-bark/[0.03] px-4 py-2 text-center">
      <p className="font-sans text-xs text-bark/60">
        {label} —{" "}
        <Link
          href="/dashboard/billing"
          className="underline underline-offset-2 hover:text-bark"
        >
          subscribe to continue
        </Link>
      </p>
    </div>
  );
}
