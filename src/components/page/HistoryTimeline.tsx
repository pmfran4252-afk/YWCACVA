"use client";

import { useRef, useState } from "react";

import Reveal from "@/components/motion/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import type { TimelineEvent } from "@/content/types";

/* Pin geometry. The fixed chrome is 144px tall, so parking the section a
   little below that keeps the heading in view for the whole horizontal run. */
const PIN_TOP = 150;

export default function HistoryTimeline({ events }: { events: TimelineEvent[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          horizontal:
            "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.horizontal) return;

          const el = track.current;
          if (!el) return;

          // Measured in a function so ScrollTrigger re-reads it on refresh
          // rather than baking in a first-paint width.
          const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 120);

          const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", el);

          gsap.to(el, {
            x: () => -distance(),
            ease: "none", // required: keeps scroll and x position 1:1
            scrollTrigger: {
              trigger: section.current,
              start: `top ${PIN_TOP}px`,
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: () => {
                // Whichever milestone sits nearest the middle of the screen is
                // the one being read, so that is the one that lights up.
                const mid = window.innerWidth / 2;
                let nearest = 0;
                let best = Infinity;

                dots.forEach((dot, i) => {
                  const rect = dot.getBoundingClientRect();
                  const d = Math.abs(rect.left + rect.width / 2 - mid);
                  if (d < best) {
                    best = d;
                    nearest = i;
                  }
                });

                setActive((prev) => (prev === nearest ? prev : nearest));
              },
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
      className="overflow-hidden bg-paper py-16 md:py-24 lg:py-0"
      aria-labelledby="history-heading"
    >
      {/* justify-start, not center: with a centred column any change in the
          track's height re-centres everything and the heading visibly shifts
          as you scroll through the timeline. */}
      <div className="lg:flex lg:h-[100svh] lg:flex-col lg:justify-start lg:pt-[9.5rem]">
        <Reveal className="container-page lg:shrink-0">
          <p className="eyebrow text-persimmon">Our history</p>
          <h2
            id="history-heading"
            className="mt-4 max-w-[20ch] font-display font-black text-ink-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            More than a century in Central Virginia
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-600">
            From a boarding home on Church Street to a regional network of
            crisis, housing, and advocacy services.
          </p>
        </Reveal>

        {/* ---------- Mobile: vertical ---------- */}
        <Reveal stagger staggerAmount={0.04} className="container-page mt-12 lg:hidden">
          <ol className="relative border-l border-ink-200 pl-8">
            {events.map((t) => (
              <li key={`${t.dateLabel}-${t.sortYear}`} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[calc(2rem+1px)] top-2 size-3 -translate-x-1/2 rounded-full ${
                    t.isMilestone ? "bg-persimmon ring-4 ring-persimmon/20" : "bg-ink-300"
                  }`}
                />
                <p
                  className={`font-display text-sm font-black tabular-nums ${
                    t.isMilestone ? "text-persimmon" : "text-ink-400"
                  }`}
                >
                  {t.dateLabel}
                </p>
                <p
                  className={`mt-2 max-w-[62ch] leading-relaxed ${
                    t.isMilestone
                      ? "font-display text-lg font-bold text-ink-900"
                      : "text-ink-600"
                  }`}
                >
                  {t.event}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ---------- Desktop: pinned horizontal run ---------- */}
        <div className="hidden lg:mt-12 lg:block lg:h-[19rem] lg:shrink-0">
          <div
            ref={track}
            className="flex h-full w-max items-stretch pl-16 pr-24 xl:pl-24"
            role="list"
          >
            {events.map((t, i) => {
              const isActive = i === active;
              return (
                <div
                  key={`${t.dateLabel}-${t.sortYear}`}
                  role="listitem"
                  className="relative w-[22rem] shrink-0 pr-10"
                >
                  {/* Rail travels with the track, so the dots stay on it */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 top-[4.15rem] h-px ${
                      i <= active ? "bg-persimmon/50" : "bg-ink-200"
                    }`}
                  />

                  <p
                    className={`font-display text-sm font-black tabular-nums transition-colors duration-400 ${
                      isActive ? "text-persimmon" : "text-ink-400"
                    }`}
                  >
                    {t.dateLabel}
                  </p>

                  <span
                    data-dot
                    aria-hidden="true"
                    className={`relative z-10 mt-8 block rounded-full transition-all duration-400 ease-[var(--ease-out-expo)] ${
                      isActive
                        ? "size-5 bg-persimmon ring-8 ring-persimmon/15"
                        : t.isMilestone
                          ? "size-3.5 bg-ink-400"
                          : "size-2.5 bg-ink-300"
                    }`}
                  />

                  <p
                    className={`mt-8 pr-4 text-[17px] leading-relaxed transition-colors duration-400 ${
                      isActive ? "font-semibold text-ink-900" : "text-ink-500"
                    }`}
                  >
                    {t.event}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="container-page mt-10 text-[13px] text-ink-400">
            Keep scrolling to move through the timeline.
          </p>
        </div>
      </div>
    </section>
  );
}
