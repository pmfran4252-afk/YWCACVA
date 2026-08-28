"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, useGSAP, whenAnimatable } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  /** Seconds between staggered children. */
  staggerAmount?: number;
  delay?: number;
  y?: number;
  /** Where the element must reach before it animates. */
  start?: string;
  as?: ElementType;
  className?: string;
};

/**
 * The workhorse scroll reveal. Content starts visible in CSS and is only
 * hidden once `.motion-ready` is on <html> (set by an inline script before
 * paint, and never set for reduced-motion users), so a JS failure or a
 * motion-averse visitor still sees a complete page.
 */
export default function Reveal({
  children,
  stagger = false,
  staggerAmount = 0.09,
  delay = 0,
  y = 28,
  start = "top 85%",
  as: Tag = "div",
  className,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      whenAnimatable(() => {
        const el = scope.current;
        if (!el) return;

        const targets = stagger ? Array.from(el.children) : [el];
        if (!targets.length) return;

        gsap.set(targets, { opacity: 0, y });

        const tween = gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger ? staggerAmount : 0,
          scrollTrigger: { trigger: el, start, once: true },
          // Clear inline styles so hover transforms and sticky positioning are
          // not fighting a leftover translate3d.
          clearProps: "transform,opacity,willChange",
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(targets, { clearProps: "opacity,transform,willChange" });
        };
      }),
    { scope, dependencies: [stagger, delay, y, start] },
  );

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
