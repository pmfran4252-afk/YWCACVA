"use client";

import { useRef } from "react";

import Button from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcons";
import SplitHeadline from "@/components/motion/SplitHeadline";
import Reveal from "@/components/motion/Reveal";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { Accent, MonthlySpotlight as Spotlight } from "@/content/types";

const ACCENT: Record<Accent, { bg: string; sub: string; rule: string; theme: string }> = {
  persimmon: { bg: "bg-persimmon text-white", sub: "text-white/85", rule: "border-white/25", theme: "text-white" },
  ink: { bg: "bg-ink text-white", sub: "text-white/75", rule: "border-white/20", theme: "text-gold" },
  cyan: { bg: "bg-cyan-brand text-ink-900", sub: "text-ink-800/80", rule: "border-ink/20", theme: "text-ink-900" },
  gold: { bg: "bg-gold text-ink-900", sub: "text-ink-800/80", rule: "border-ink/20", theme: "text-ink-900" },
  teal: { bg: "bg-teal text-white", sub: "text-white/85", rule: "border-white/25", theme: "text-gold" },
  mahogany: { bg: "bg-mahogany text-white", sub: "text-white/80", rule: "border-white/20", theme: "text-gold" },
};

/**
 * The second hero: whatever campaign YWCA is running this month.
 *
 * Sits directly under the support router so it is the first thing a visitor
 * who is *not* in crisis meets. Editors swap it monthly from the Studio, and
 * turning `active` off removes the section rather than leaving a stale
 * campaign on the home page.
 */
export default function MonthlySpotlight({ spotlight }: { spotlight: Spotlight }) {
  const scope = useRef<HTMLElement>(null);
  const a = ACCENT[spotlight.accent] ?? ACCENT.mahogany;

  // The watermark drifts slowly as the section crosses the viewport.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mark = scope.current!.querySelector("[data-mark]");
      if (!mark) return;

      gsap.to(mark, {
        yPercent: -14,
        rotate: 6,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={`relative overflow-hidden ${a.bg}`}
      aria-labelledby="spotlight-heading"
    >
      {/* Oversized icon watermark */}
      <div
        aria-hidden="true"
        data-mark
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.13] md:-right-10"
      >
        <BrandIcon
          name={spotlight.icon}
          className="size-[22rem] md:size-[30rem] lg:size-[36rem]"
        />
      </div>

      <div className="container-page relative py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            {spotlight.monthLabel && (
              <Reveal>
                <p className={`eyebrow ${a.sub}`}>{spotlight.monthLabel}</p>
              </Reveal>
            )}

            {spotlight.eyebrow && (
              <Reveal delay={0.08}>
                <p className={`mt-4 font-display text-lg font-bold md:text-xl ${a.theme}`}>
                  {spotlight.eyebrow}
                </p>
              </Reveal>
            )}

            <SplitHeadline
              as="h2"
              className="mt-3 max-w-[16ch] font-display font-black leading-[0.98] tracking-[-0.03em]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {spotlight.title}
            </SplitHeadline>

            {spotlight.body && (
              <Reveal delay={0.2}>
                <p className={`mt-7 max-w-[58ch] text-lg leading-relaxed ${a.sub}`}>
                  {spotlight.body}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.28}>
              <div className="mt-10 flex flex-wrap gap-3">
                {spotlight.primaryCta && (
                  <Button
                    href={spotlight.primaryCta.href}
                    variant={spotlight.accent === "persimmon" ? "ink" : "primary"}
                    size="lg"
                  >
                    {spotlight.primaryCta.label}
                  </Button>
                )}
                {spotlight.secondaryCta && (
                  <Button
                    href={spotlight.secondaryCta.href}
                    variant="outlineLight"
                    size="lg"
                  >
                    {spotlight.secondaryCta.label}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>

          {spotlight.stats && spotlight.stats.length > 0 && (
            <Reveal stagger staggerAmount={0.08} className="lg:col-span-5">
              <dl className="grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-0">
                {spotlight.stats.map((s) => (
                  <div
                    key={s.label}
                    className={`border-t pt-5 lg:py-6 ${a.rule} lg:first:border-t-0 lg:first:pt-0`}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-black tabular-nums leading-none md:text-4xl">
                        {s.value}
                      </span>
                      <span className={`mt-2 block text-[14px] leading-snug ${a.sub}`}>
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
