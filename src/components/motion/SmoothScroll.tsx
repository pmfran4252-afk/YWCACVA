"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";

import {
  ScrollSmoother,
  ScrollTrigger,
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/lib/gsap";

/**
 * GSAP ScrollSmoother wrapper.
 *
 * ScrollSmoother requires this exact structure, a fixed wrapper containing a
 * transformed content div, so it lives at the layout level and every page
 * renders inside it.
 *
 * Two deliberate constraints:
 *  • Reduced-motion visitors get native scrolling, not eased scrolling.
 *  • Touch devices keep native momentum (`smoothTouch: 0`). Hijacking scroll on
 *    a phone costs more in feel than it gains, and this site's most urgent
 *    users are on phones.
 */
/**
 * Escape hatch for end-to-end and visual-regression runs. A transformed
 * content wrapper defeats native scrolling, full-page screenshots, and most
 * test-runner scroll helpers, so tooling needs a way to opt out.
 */
const SMOOTH_DISABLED = process.env.NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL === "1";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion() || SMOOTH_DISABLED) {
        document.documentElement.classList.add("motion-reduced");
        return;
      }

      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: 1.1,
        effects: true, // enables data-speed / data-lag parallax
        smoothTouch: 0,
        normalizeScroll: false,
      });

      // Fonts change metrics, which moves every trigger below the fold.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => smoother.kill();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  // Route changes must reset scroll position and re-measure triggers.
  useGSAP(
    () => {
      ScrollSmoother.get()?.scrollTo(0, false);
      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
    },
    { dependencies: [pathname] },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
