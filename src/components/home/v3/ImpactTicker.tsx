"use client";

import { useRef } from "react";

import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { LineIcon } from "@/components/ui/LineIcons";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { HomePage, ImpactStat } from "@/content/types";

export default function ImpactTicker({
  home,
  stats,
}: {
  home: HomePage;
  stats: ImpactStat[];
}) {
  const marquee = useRef<HTMLDivElement>(null);

  // Seamless loop: the strip is duplicated, and we travel exactly one copy's
  // width before wrapping, so there is no visible seam or reset.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const strip = marquee.current!.querySelector<HTMLElement>("[data-strip]")!;

      const tween = gsap.to(marquee.current!.querySelectorAll("[data-strip]"), {
        xPercent: -100,
        ease: "none",
        duration: 28,
        repeat: -1,
      });

      // Slow to a crawl on hover so a reader can actually catch a figure.
      const el = marquee.current!;
      const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 });
      const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
      el.addEventListener("pointerenter", slow);
      el.addEventListener("pointerleave", resume);

      void strip;

      return () => {
        el.removeEventListener("pointerenter", slow);
        el.removeEventListener("pointerleave", resume);
      };
    },
    { scope: marquee },
  );

  const strip = stats.map((s) => `${s.prefix ?? ""}${s.value.toLocaleString("en-US")}${s.suffix ?? ""} ${s.label}`);

  return (
    <section
      className="bg-persimmon pb-20 text-white md:pb-28"
      aria-labelledby="impact-v3"
    >
      {/* Marquee */}
      <div
        ref={marquee}
        aria-hidden="true"
        className="flex select-none overflow-hidden border-y border-white/20 py-6 md:py-7"
      >
        {[0, 1].map((copy) => (
          <div key={copy} data-strip className="flex shrink-0 items-center gap-14 pr-14">
            {strip.map((line) => (
              <span
                key={line}
                className="flex shrink-0 items-center gap-14 whitespace-nowrap font-display text-lg font-bold uppercase tracking-[0.12em] md:text-2xl"
              >
                {line}
                <span className="size-2 shrink-0 rounded-full bg-white/50" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="container-page mt-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-white/70">Verified 2025 figures</p>
          <h2
            id="impact-v3"
            className="mt-4 font-display font-black"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {home.impactHeadline}
          </h2>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.07}
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((s) => (
            <div key={s.label} className="group border-t border-white/25 pt-6">
              {/* Icon rides the top rule opposite the figure, so it labels the
                  number without competing with it. */}
              {/* Capped width pulls the icon in beside the figure instead of
                  parking it on the far edge of the column, while keeping the
                  icons aligned with each other across the row. */}
              <div className="flex items-start justify-between gap-4 md:max-w-[19rem]">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="block font-display text-5xl font-black tabular-nums leading-none tracking-[-0.04em] md:text-6xl"
                />
                {s.icon && (
                  <LineIcon
                    name={s.icon}
                    className="mt-1 size-11 shrink-0 text-white/45 transition-colors duration-500 group-hover:text-white/80"
                  />
                )}
              </div>
              <p className="mt-4 max-w-[24ch] font-display text-lg font-bold leading-snug">
                {s.label}
              </p>
              {s.context && (
                <p className="mt-1.5 text-[14px] text-white/75">{s.context}</p>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16">
          <Button href="/get-involved/donate" variant="ink" size="lg">
            Support this work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
