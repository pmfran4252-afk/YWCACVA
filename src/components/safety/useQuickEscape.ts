"use client";

import { useCallback, useEffect } from "react";

import { EXIT_FLAG, exitNow } from "@/lib/safety";

/**
 * Quick Exit: keyboard shortcut, the exit call itself, and the
 * back/forward-cache trap that catches a Back press after leaving.
 *
 * See src/lib/safety.ts for how this combines with SafeLink to keep the site
 * to a single history entry, and for what it honestly cannot do.
 */
export function useQuickEscape(destination: string) {
  const escape = useCallback(() => exitNow(destination), [destination]);

  /* --- Escape, Escape --- */
  useEffect(() => {
    let lastEscape = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const now = Date.now();
      // Two presses within 700ms. A single Escape stays free for closing
      // menus and dialogs.
      if (now - lastEscape < 700) {
        escape();
        return;
      }
      lastEscape = now;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [escape]);

  /* --- Back/forward-cache trap ---
     If the browser restores this page after an exit, leave again. The flag is
     cleared on every pageshow, so a later deliberate visit is unaffected. */
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      let flagged = false;
      try {
        flagged = window.sessionStorage.getItem(EXIT_FLAG) === "1";
        window.sessionStorage.removeItem(EXIT_FLAG);
      } catch {
        return;
      }

      if (!flagged) return;

      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      const cameBack = e.persisted || nav?.type === "back_forward";

      if (cameBack) exitNow(destination);
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [destination]);

  return escape;
}
