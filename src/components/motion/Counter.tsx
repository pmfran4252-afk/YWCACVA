"use client";

import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Counts up when scrolled into view. The final value is rendered on the
 * server and only replaced once the animation starts, so the real number is
 * always in the DOM for search engines and assistive tech.
 */
export default function Counter({
  value,
  prefix,
  suffix,
  className,
  duration = 2,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { dependencies: [value, duration] },
  );

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{format(value)}</span>
      {suffix}
    </span>
  );
}
