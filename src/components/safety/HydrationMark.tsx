"use client";

import { useEffect } from "react";

/**
 * Signals that React has hydrated and Next's router is now handling link
 * clicks, so the pre-hydration navigation guard in the document head can stop
 * intercepting. Renders nothing.
 */
export default function HydrationMark() {
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__ywcaHydrated = true;
    return () => {
      (window as unknown as Record<string, unknown>).__ywcaHydrated = false;
    };
  }, []);

  return null;
}
