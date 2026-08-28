"use client";

import { ScrollSmoother, gsap, prefersReducedMotion } from "@/lib/gsap";

/** Height of the fixed chrome, so an anchor target is not parked under it. */
const CHROME_OFFSET = 160;

/**
 * Scrolls to an in-page anchor.
 *
 * A plain `href="#id"` does not work reliably here: ScrollSmoother transforms
 * the content, so the browser's native anchor jump lands in the wrong place.
 * This routes through the smoother when it is running and falls back to native
 * scrolling when it is not.
 */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  const reduced = prefersReducedMotion();
  const smoother = ScrollSmoother.get();

  if (smoother) {
    smoother.scrollTo(target, !reduced, `top ${CHROME_OFFSET}px`);
    return;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - CHROME_OFFSET;

  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  void gsap;
}
