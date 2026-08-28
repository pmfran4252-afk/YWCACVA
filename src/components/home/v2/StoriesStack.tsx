"use client";

import { useRef } from "react";

import Reveal from "@/components/motion/Reveal";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import type { Story } from "@/content/types";

const TINT = [
  "bg-paper text-ink-900",
  "bg-ink text-white",
  "bg-persimmon text-white",
  "bg-bone-dark text-ink-900",
  "bg-mahogany text-white",
];

/**
 * Stacking card reveal: each quote pins in turn and the one behind it recedes,
 * so the stack builds as the visitor scrolls.
 *
 * Pinned only on tall, pointer-precise viewports. Short screens don't have the
 * headroom for a pinned stack, and reduced-motion visitors get a plain list.
 */
export default function StoriesStack({
  headline,
  stories,
}: {
  headline: string;
  stories: Story[];
}) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          canStack:
            "(min-width: 768px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.canStack) return;

          const cards = gsap.utils.toArray<HTMLElement>("[data-card]", section.current);
          if (cards.length < 2) return;

          cards.forEach((card, i) => {
            const isLast = i === cards.length - 1;

            // Pin every card at the same offset. pinSpacing stays off so the
            // cards land on top of each other instead of each reserving a
            // full screen of empty space.
            ScrollTrigger.create({
              trigger: card,
              start: "top 14%",
              endTrigger: cards[cards.length - 1],
              end: "top 30%",
              pin: true,
              pinSpacing: false,
              id: `story-card-${i}`,
            });

            if (isLast) return;

            // As the next card rises, this one settles back and dims.
            gsap.to(card, {
              scale: 0.93,
              yPercent: -2,
              filter: "brightness(0.93)",
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: "top 14%",
                scrub: true,
              },
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="bg-bone py-20 md:py-28" aria-labelledby="stories-v2">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-persimmon">In their words</p>
          <h2
            id="stories-v2"
            className="mt-4 font-display font-black text-ink-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Real women, real outcomes. Names and details are changed to protect
            the privacy of everyone we serve.
          </p>
        </Reveal>

        <div className="mt-14 space-y-6 md:mt-20 md:space-y-8">
          {stories.map((s, i) => (
            <article
              key={s.attribution}
              data-card
              className={`rounded-3xl p-8 shadow-[var(--shadow-card)] will-change-transform md:p-14 ${TINT[i % TINT.length]}`}
            >
              <div className="flex items-start justify-between gap-6">
                <svg viewBox="0 0 24 24" className="size-9 shrink-0 opacity-40" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 5C6.5 6.7 5 9.4 5 13v6h6v-6H8.2c.1-2.3 1-3.9 2.8-4.8L9.5 5Zm9 0c-3 1.7-4.5 4.4-4.5 8v6h6v-6h-2.8c.1-2.3 1-3.9 2.8-4.8L18.5 5Z" />
                </svg>
                <span className="font-display text-[13px] font-black tabular-nums opacity-40">
                  {String(i + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
                </span>
              </div>

              <blockquote className="mt-7">
                <p className="max-w-[26ch] font-display text-2xl font-black leading-[1.12] tracking-[-0.02em] md:max-w-[22ch] md:text-4xl">
                  {s.quote}
                </p>
                <footer className="mt-8 flex items-center gap-3 text-[15px]">
                  <span className="grid size-10 place-items-center rounded-full bg-current/15 font-display font-black">
                    <span className="opacity-100">{s.attribution.charAt(0)}</span>
                  </span>
                  <span>
                    <span className="block font-semibold">{s.attribution}</span>
                    {s.locality && (
                      <span className="block text-[13px] opacity-70">{s.locality}</span>
                    )}
                  </span>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
