"use client";

import { useRef, useState } from "react";

import {
  ScrollSmoother,
  ScrollTrigger,
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/lib/gsap";

/**
 * Back to top.
 *
 * Lives outside the ScrollSmoother content wrapper, because that wrapper is
 * transformed and a transformed ancestor breaks `position: fixed`.
 *
 * On mobile it sits above the crisis dock rather than beside it, the dock is
 * full-width and thumb-critical, and nothing should ever be mistaken for it or
 * cover it.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  // Appear once the first screen is behind us.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: "top -60%",
      end: "max",
      onToggle: (self) => setVisible(self.isActive),
    });
    return () => st.kill();
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.to(el, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 12,
        scale: visible ? 1 : 0.9,
        duration: prefersReducedMotion() ? 0 : 0.4,
        ease: "power3.out",
      });
    },
    { dependencies: [visible] },
  );

  const toTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother && !prefersReducedMotion()) {
      smoother.scrollTo(0, true);
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="invisible fixed right-4 bottom-24 z-85 grid size-12 place-items-center rounded-full border border-white/15 bg-ink-900/90 text-white opacity-0 shadow-[var(--shadow-lift)] backdrop-blur-md transition-colors duration-300 hover:border-persimmon hover:bg-persimmon md:right-8 md:bottom-8 md:size-14"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5 md:size-6" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
