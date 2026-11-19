"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { needsCleanReload, type Win } from "@/lib/analytics-boundary";

export default function AnalyticsBoundary() {
  const path = usePathname();
  useLayoutEffect(() => {
    if (needsCleanReload(window as unknown as Win, path)) window.location.reload();
  }, [path]);
  return null;
}
