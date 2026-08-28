"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";

import Reveal from "@/components/motion/Reveal";
import SafeLink from "@/components/ui/SafeLink";
import { BrandIcon } from "@/components/ui/BrandIcons";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Accent, HomePage, Program } from "@/content/types";

const ACCENT: Record<Accent, string> = {
  persimmon: "bg-persimmon text-white",
  ink: "bg-ink-800 text-white",
  cyan: "bg-cyan-brand text-ink-900",
  gold: "bg-gold text-ink-900",
  teal: "bg-teal text-white",
  mahogany: "bg-mahogany text-white",
};

/* Pin geometry and pacing -------------------------------------------------
   PIN_TOP  where the section parks while pinned. The fixed chrome is 144px
            tall on desktop (48px crisis bar + 96px nav), so this leaves the
            requested sliver of margin above the "Our programs" heading.
   ARRIVE   scroll distance a card takes to come in and settle.
   DWELL    scroll distance nothing moves, so there is time to actually read
            the card before the next one covers it. Roughly three notches of a
            typical wheel.
   ------------------------------------------------------------------------ */
/* The section carries the same 119px top padding as every other home section.
   That padding scrolls up behind the fixed chrome while pinned, so the park
   position is measured back from where the heading should land: 144px of fixed
   chrome plus the gap we want to see above "Our programs". */
const SECTION_PT = 119;
const CHROME = 144;
const HEADING_GAP = 48;
const PIN_TOP = CHROME + HEADING_GAP - SECTION_PT;
const ARRIVE = 320;
const DWELL = 340;

/* Deck geometry -----------------------------------------------------------
   PEEK       how much of its top edge each card already read leaves showing.
   SHRINK     how much narrower each layer further back sits, which is what
              sells the pile as having depth rather than being a flat offset.
   MAX_DEPTH  layers past this drop out, otherwise six cards build a fringe
              taller than the gap above the stack.
   ------------------------------------------------------------------------ */
const PEEK = 11;
const SHRINK = 0.03;
const MAX_DEPTH = 3;

export default function ProgramsStack({
  home,
  programs,
}: {
  home: HomePage;
  programs: Program[];
}) {
  const section = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          canStack:
            "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.canStack) return;

          const cards = gsap.utils.toArray<HTMLElement>("[data-prog-card]", stack.current);
          if (cards.length < 2) return;

          /* One pinned, scrubbed timeline rather than a ScrollTrigger per card.
             The previous per-card version let the browser apply partial scrub
             values before the section was pinned, so the first card visibly
             dimmed and un-dimmed as the pointer reached the section. Driving
             everything from a single timeline means a card is faded until the
             pin engages, and nothing moves during a dwell. */
          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section.current,
              start: `top ${PIN_TOP}px`,
              end: () => `+=${cards.length * (ARRIVE + DWELL)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /* Everything starts faded out and slightly low. Scaling from the
             top edge keeps the peek spacing exactly PEEK per layer: with the
             default centre origin, shrinking a card also drags its top edge
             down and eats most of the offset back. */
          gsap.set(cards, {
            autoAlpha: 0,
            y: 44,
            scale: 1,
            transformOrigin: "50% 0%",
          });

          /* The section is pinned, so without a hint the page reads as stuck.
             The cue only earns its place between the first and last card. */
          const cue = section.current!.querySelector<HTMLElement>("[data-prog-cue]");
          const dot = cue?.querySelector<HTMLElement>("[data-prog-cue-dot]");
          const last = cards.length - 1;

          /* The travelling dot loops on its own clock. It cannot live on the
             scrubbed timeline, which has no room for an infinite repeat. */
          const drift = dot
            ? gsap.to(dot, {
                y: 15,
                opacity: 0,
                duration: 1.1,
                ease: "power1.in",
                repeat: -1,
                repeatDelay: 0.15,
              })
            : null;

          cards.forEach((card, i) => {
            const label = `card-${i}`;
            tl.addLabel(label);

            /* Every card already read slides up one notch at the moment the
               next one arrives, so the pile gains a visible edge per card
               rather than the outgoing one simply fading away. They move
               together on the label, which keeps the whole deck in step. */
            for (let j = 0; j < i; j++) {
              const depth = i - j;
              tl.to(
                cards[j],
                {
                  y: -depth * PEEK,
                  scale: 1 - depth * SHRINK,
                  autoAlpha: depth > MAX_DEPTH ? 0 : 1,
                  duration: 1,
                  ease: "power2.inOut",
                },
                label,
              );
            }

            /* Opacity resolves well before the slide finishes. The cards
               behind now stay fully opaque so their edges stay vivid, which
               means a slow cross-fade would show the previous card's headline
               straight through the arriving one. */
            tl.to(card, { autoAlpha: 1, duration: 0.22, ease: "none" }, label);
            tl.to(card, { y: 0, duration: 1, ease: "power2.out" }, label);

            if (cue && (i === 0 || i === last)) {
              tl.to(cue, { autoAlpha: i === last ? 0 : 1, duration: 0.5 }, label);
            }

            // Hold. Nothing moves, so there is time to read the card.
            tl.to({}, { duration: DWELL / ARRIVE });
          });

          return () => {
            drift?.kill();
            gsap.set(cards, { clearProps: "opacity,visibility,transform,transformOrigin" });
            if (cue) gsap.set(cue, { clearProps: "opacity,visibility" });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      /* The pin parks the section this far down, so a full-height desktop
         section is the viewport minus that offset. Sharing the number with the
         pin maths keeps the two from drifting apart. */
      style={{ "--prog-pin": `${PIN_TOP}px` } as CSSProperties}
      className="bg-ink-900 py-20 text-white lg:flex lg:min-h-[calc(100svh-var(--prog-pin))] lg:flex-col lg:pb-24 lg:pt-28"
      aria-labelledby="programs-v3"
    >
      <div className="container-page lg:relative lg:flex lg:flex-1 lg:flex-col">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-persimmon">Our programs</p>
            <h2
              id="programs-v3"
              className="mt-4 font-display font-black"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {home.programsHeadline}
            </h2>
          </div>
          <SafeLink
            href="/programs"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold"
          >
            All programs
            <span className="grid size-8 place-items-center rounded-full border border-white/20 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon">
              <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </SafeLink>
        </Reveal>

        {/* Cards flow normally on small screens and stack in place on desktop. */}
        <div
          ref={stack}
          className="mt-12 space-y-5 lg:relative lg:mt-14 lg:min-h-[24rem] lg:flex-1 lg:space-y-0"
        >
          {programs.map((p, i) => (
            <article
              key={p.slug}
              data-prog-card
              /* The upward shadow falls on the card behind, so each sheet in
                 the pile is separated by a real gradient rather than only by
                 its accent colour. A downward shadow would land on the
                 near-black section and show nothing. */
              className={`overflow-hidden rounded-3xl will-change-transform lg:absolute lg:inset-0 lg:shadow-[0_-10px_28px_-10px_rgba(0,0,0,0.6)] ${ACCENT[p.accent]}`}
            >
              <SafeLink
                href={`/programs/${p.slug}`}
                className="group relative grid h-full gap-8 p-8 pt-20 md:grid-cols-12 md:items-center md:p-12 md:pt-12"
              >
                {/* Hairline along the top edge. On a peeking sliver this is
                    the only part of the card visible, so it needs a defined
                    lip. `current` picks up each accent's own foreground, so
                    it reads on the light cards as well as the dark ones. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-current/25"
                />

                {/* The index sits in the card's corner rather than in the text
                    column, which is vertically centred on desktop and would
                    otherwise drag the number down to the middle of the card.
                    Decorative: the cards are already an ordered list. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-8 top-6 font-display text-5xl font-black leading-none tabular-nums opacity-60 md:left-12 md:top-6 md:text-6xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {p.shortName && (
                  <span className="eyebrow absolute right-8 top-7 rounded-full bg-current/15 px-2.5 py-1 text-[10px] md:right-12 md:top-8">
                    <span className="opacity-100">{p.shortName}</span>
                  </span>
                )}
                {/* Icon watermark: says what the service looks like in
                    practice, without adding another line of copy. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 top-1/2 -translate-y-1/2 opacity-[0.08] transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:opacity-[0.13] group-hover:scale-105 md:-right-20"
                >
                  <BrandIcon name={p.icon} className="size-52 md:size-72" />
                </span>

                <div className="relative md:col-span-7">

                  <h3 className="font-display text-3xl font-black leading-[1.0] md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed opacity-85 md:text-base">
                    {p.summary}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2.5 text-[15px] font-semibold">
                    Learn more
                    <span className="grid size-9 place-items-center rounded-full bg-current/15 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                      <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>

                <dl className="relative grid grid-cols-2 gap-x-6 gap-y-5 border-t border-current/15 pt-7 md:col-span-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                  {p.impactHighlights.slice(0, 4).map((h) => (
                    <div key={h.label}>
                      <dt className="sr-only">{h.label}</dt>
                      <dd>
                        <span className="block font-display text-2xl font-black tabular-nums leading-none md:text-3xl">
                          {h.value}
                        </span>
                        <span className="mt-2 block text-[12px] leading-snug opacity-80">
                          {h.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </SafeLink>
            </article>
          ))}
        </div>

        {/* Sits in the section's bottom padding so it costs no height, which
            matters while the whole section is pinned into one viewport. */}
        <div
          data-prog-cue
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-14 hidden justify-center opacity-0 lg:flex"
        >
          <svg viewBox="0 0 24 38" className="h-10 w-auto text-white/45" fill="none">
            <rect
              x="1.25"
              y="1.25"
              width="21.5"
              height="35.5"
              rx="10.75"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle data-prog-cue-dot cx="12" cy="10.5" r="2.3" className="fill-white" />
          </svg>
        </div>
      </div>
    </section>
  );
}
