"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

/* Registering more than once is harmless, but keeping it in one module means
   every consumer is guaranteed the plugins exist before it animates. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Observer,
    DrawSVGPlugin,
  );

  gsap.defaults({ ease: "power3.out", duration: 0.9 });

  // ScrollTrigger recalculates on resize, but mobile browsers fire resize on
  // every URL-bar collapse. Ignoring pure height changes stops pinned sections
  // from jumping as the user scrolls on a phone.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs an animation setup only when it can actually finish.
 *
 * Browsers throttle requestAnimationFrame in hidden tabs, which freezes GSAP
 * mid-tween. Any entrance animation that starts from `opacity: 0` therefore
 * leaves its content invisible for as long as the tab stays in the background
 *, including, on this site, hero copy and crisis contact details. So we do
 * not hide anything until the document is actually visible, and defer setup to
 * the first visibilitychange when it is not.
 *
 * Returns a cleanup that both removes the listener and disposes whatever the
 * callback created.
 */
export function whenAnimatable(setup: () => void | (() => void)) {
  if (typeof document === "undefined" || prefersReducedMotion()) return () => {};

  let dispose: void | (() => void);

  if (document.visibilityState === "visible") {
    dispose = setup();
    return () => {
      if (typeof dispose === "function") dispose();
    };
  }

  const onVisible = () => {
    if (document.visibilityState !== "visible") return;
    document.removeEventListener("visibilitychange", onVisible);
    dispose = setup();
  };

  document.addEventListener("visibilitychange", onVisible);

  return () => {
    document.removeEventListener("visibilitychange", onVisible);
    if (typeof dispose === "function") dispose();
  };
}

/* Dev-only handle for debugging from the console: inspect ScrollTriggers,
   jump the smoother, or force a frame with __gsap.gsap.ticker.tick(). Stripped
   from production builds. */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as unknown as Record<string, unknown>).__gsap = {
    gsap,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
  };
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Observer,
  DrawSVGPlugin,
};
