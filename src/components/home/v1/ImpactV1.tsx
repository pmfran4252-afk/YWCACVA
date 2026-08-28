"use client";

import { useRef } from "react";

import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { HomePage, ImpactStat } from "@/content/types";

export default function ImpactV1({
  home,
  stats,
}: {
  home: HomePage;
  stats: ImpactStat[];
}) {
  const scope = useRef<HTMLElement>(null);

  // A slow horizontal drift on the background wordmark, tied to scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(scope.current!.querySelector("[data-drift]"), {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-ink-900 py-20 text-white md:py-28"
      aria-labelledby="impact-heading"
    >
      <span
        data-drift
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[28vw] font-black leading-none tracking-[-0.05em] text-white/[0.035] select-none"
      >
        empowering women
      </span>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-persimmon">Verified 2025 figures</p>
          <h2
            id="impact-heading"
            className="mt-4 font-display font-black"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {home.impactHeadline}
          </h2>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.08}
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((s) => (
            <div key={s.label} className="group border-t border-white/15 pt-6">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block font-display text-5xl font-black tabular-nums leading-none tracking-[-0.04em] text-white transition-colors duration-500 group-hover:text-persimmon md:text-6xl"
              />
              <p className="mt-4 max-w-[24ch] font-display text-lg font-bold leading-snug">
                {s.label}
              </p>
              {s.context && (
                <p className="mt-1.5 text-[14px] text-ink-400">{s.context}</p>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16">
          <Button href="/get-involved/donate" variant="primary" size="lg">
            Support this work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
