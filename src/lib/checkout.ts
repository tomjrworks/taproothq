"use client";

import { toast } from "@/components/dashboard/ui/use-toast";

type Interval = "month" | "year";

// Shared client-side billing redirects (C2). Both POST to a SITE proxy route
// that forwards to the PRODUCT billing API and returns { url }. On any
// non-OK response (PRODUCT down, expired session, 503) the proxy returns no
// url — surface a toast instead of silently dead-ending the click.
async function startBillingFlow(
  path: "/api/billing/checkout" | "/api/billing/portal",
  body?: object,
): Promise<void> {
  const fail = (description: string) =>
    toast({
      title: "Couldn't open billing",
      description,
      variant: "destructive",
    });

  try {
    const res = await fetch(path, {
      method: "POST",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      fail("Something went wrong. Please try again in a moment.");
      return;
    }
    const { url } = (await res.json()) as { url?: string };
    if (!url) {
      fail("No checkout link came back. Please try again.");
      return;
    }
    window.location.href = url;
  } catch {
    fail("Check your connection and try again.");
  }
}

export function redirectToCheckout(interval: Interval): Promise<void> {
  return startBillingFlow("/api/billing/checkout", { interval });
}

export function redirectToPortal(): Promise<void> {
  return startBillingFlow("/api/billing/portal");
}
