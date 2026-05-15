"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BillingSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/dashboard/billing"), 2000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <p className="mb-2 font-serif text-xl text-bark">
        you&apos;re subscribed
      </p>
      <p className="font-sans text-sm text-bark/50">
        taking you back to billing…
      </p>
    </div>
  );
}
