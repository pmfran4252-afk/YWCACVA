"use client";

import SafeLink from "@/components/ui/SafeLink";
import { useRef } from "react";

import Reveal from "@/components/motion/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Accent, HomePage, Program } from "@/content/types";

const ACCENT: Record<Accent, string> = {
  persimmon: "bg-persimmon text-white",
  ink: "bg-ink text-white",
  cyan: "bg-cyan-brand text-ink-900",
  gold: "bg-gold text-ink-900",
  teal: "bg-teal text-white",
  mahogany: "bg-mahogany text-white",
};

const RULE: Record<Accent, string> = {
  persimmon: "bg-white/30",
  ink: "bg-white/20",
  cyan: "bg-ink/20",
  gold: "bg-ink/20",
  teal: "bg-white/30",
  mahogany: "bg-white/20",
};

/**
 * Programs as a pinned horizontal rail: the section pins and the track moves
 * sideways as the visitor scrolls down.
 *
 * Only on pointer-precise screens ≥1024px. On a phone this becomes a native
 * scroll-snap rail, hijacking vertical scroll on touch to move content
 * sideways is disorienting and fights the platform.
 */
export default function ProgramsV2({
  home,
  programs,
}: {
  home: HomePage;
  programs: Program[];
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.isDesktop) return;

          const el = track.current!;
          // Measured in a function so ScrollTrigger re-reads it on refresh
          // rather than baking in a first-paint width.
          const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);

          gsap.to(el, {
            x: () => -distance(),
            ease: "none", // required: keeps scroll and x position 1:1
            scrollTrigger: {
              trigger: section.current,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="overflow-hidden bg-paper py-20 lg:py-0"
      aria-labelledby="programs-heading-v2"
    >
      <div className="lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
        <Reveal className="container-page lg:pt-10">
          <p className="eyebrow text-persimmon">What we do</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2
              id="programs-heading-v2"
              className="max-w-[16ch] font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {home.programsHeadline}
            </h2>
            <SafeLink
              href="/programs"
              className="group inline-flex items-center gap-2 pb-1 text-[15px] font-semibold text-ink-900"
            >
              All programs
              <span className="grid size-8 place-items-center rounded-full border border-ink-200 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white">
                <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </SafeLink>
          </div>
        </Reveal>

        {/* Rail: native scroll-snap on touch, transformed track on desktop */}
        <div className="hide-scrollbar mt-10 overflow-x-auto lg:mt-14 lg:overflow-visible">
          <div
            ref={track}
            className="flex w-max gap-4 px-5 md:px-10 lg:gap-6 lg:pl-16 lg:pr-24 xl:pl-24"
          >
            {programs.map((p, i) => (
              <SafeLink
                key={p.slug}
                href={`/programs/${p.slug}`}
                className={`group relative flex h-[26rem] w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform duration-600 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:w-[24rem] lg:h-[27rem] lg:w-[25rem] ${ACCENT[p.accent]}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-10 -top-40 h-56 rotate-12 bg-white/10 opacity-0 blur-2xl transition-all duration-900 ease-[var(--ease-out-expo)] group-hover:top-full group-hover:opacity-100"
                />

                <div className="relative">
                  <span className="font-display text-[13px] font-black tabular-nums opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`mt-4 block h-px w-full ${RULE[p.accent]}`} />
                  <h3 className="mt-6 font-display text-2xl font-black leading-[1.02] lg:text-[1.7rem]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed opacity-85">
                    {p.summary}
                  </p>
                </div>

                <div className="relative flex items-end justify-between gap-4">
                  {p.impactHighlights[0] && (
                    <p className="leading-none">
                      <span className="block font-display text-3xl font-black tabular-nums">
                        {p.impactHighlights[0].value}
                      </span>
                      <span className="mt-2 block max-w-[20ch] text-[12px] leading-snug opacity-80">
                        {p.impactHighlights[0].label}
                      </span>
                    </p>
                  )}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:text-ink-900">
                    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                      <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </SafeLink>
            ))}
          </div>
        </div>

        <p className="container-page mt-6 hidden text-[13px] text-ink-400 lg:block lg:pb-10">
          Keep scrolling to move through every program.
        </p>
      </div>
    </section>
  );
}
