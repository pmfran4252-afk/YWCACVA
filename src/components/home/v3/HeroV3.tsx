"use client";

import Image from "next/image";
import SafeLink from "@/components/ui/SafeLink";
import { useRef, useState } from "react";

import { SplitText, gsap, useGSAP, whenAnimatable } from "@/lib/gsap";
import type { HomePage, Pathway, SiteSettings } from "@/content/types";

const digits = (n: string) => n.replace(/[^\d]/g, "");

const URGENCY: Record<Pathway["urgency"], { dot: string; label: string }> = {
  immediate: { dot: "bg-persimmon", label: "Urgent" },
  support: { dot: "bg-cyan-brand", label: "Support" },
  info: { dot: "bg-gold", label: "Information" },
  help: { dot: "bg-white/60", label: "Give help" },
};

/**
 * CONCEPT 3 hero, the router is the hero.
 *
 * For an organization whose front page is often reached mid-crisis, the first
 * screen's job is not to introduce the brand: it is to get the visitor to the
 * right door in one action. Mission and story come after, once the person who
 * needed something urgent has already left for it.
 */
export default function HeroV3({
  home,
  pathways,
  settings,
}: {
  home: HomePage;
  pathways: Pathway[];
  settings: SiteSettings;
}) {
  const scope = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const primary = settings.hotlines.find((h) => h.isPrimary) ?? settings.hotlines[0];

  useGSAP(
    () =>
      whenAnimatable(() => {
        const root = scope.current!;
        let heroSplitPlayed = false;

        SplitText.create(root.querySelector("[data-headline]"), {
          type: "lines",
          linesClass: "split-line",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            // Plays once; later re-splits (a phone's URL bar collapsing fires
            // resize, which re-splits) just land the lines in place.
            if (heroSplitPlayed) {
              gsap.set(self.lines, { yPercent: 0, opacity: 1 });
              return;
            }
            heroSplitPlayed = true;

            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.09,
              ease: "power4.out",
            });
          },
        });

        gsap.from(root.querySelectorAll("[data-row]"), {
          opacity: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.06,
          delay: 0.45,
          ease: "power3.out",
        });

        gsap.from(root.querySelectorAll("[data-meta]"), {
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        });

        const art = root.querySelector("[data-hero-art]");
        if (art) {
          gsap.from(art, { opacity: 0, scale: 1.06, duration: 1.8, ease: "power2.out" });
          gsap.to(art, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }),
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-ink-900 pb-20 pt-32 text-white md:pb-28 md:pt-56"
      aria-label="Find support"
    >
      {/* Breaking-barriers artwork: full height of the hero, held to the left
          and faded well back. The source is black line art on alpha, so it is
          inverted to sit on the dark ground. */}
      <div
        aria-hidden="true"
        data-hero-art
        className="pointer-events-none absolute inset-y-0 left-0 w-full select-none md:w-[68%] lg:w-[62%]"
      >
        <div className="relative size-full opacity-[0.16] mix-blend-screen md:opacity-[0.18]">
          <Image
            src="/img/woman-breaking-barriers.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 68vw"
            /* cover, not contain: the source is cropped at the waist, and
               contain would letterbox that hard edge into the middle of the
               hero. Cover pushes it flush to the section boundary. */
            className="object-cover object-[45%_center]"
          />
        </div>
        {/* Just enough veil that the headline never fights the line work */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/55 via-ink-900/25 to-ink-900/80 md:to-ink-900" />
        {/* Dissolves the artwork into the section edge instead of cutting it */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-900 to-transparent" />
      </div>

      {/* Soft persimmon bloom behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-persimmon/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-40 size-[32rem] rounded-full bg-cyan-brand/10 blur-[120px]"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- Left: framing --- */}
        <div className="min-w-0 lg:col-span-5">
          <p data-meta className="eyebrow flex items-center gap-3 text-persimmon">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-persimmon opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-persimmon" />
            </span>
            Answered 24 hours a day
          </p>

          <h1
            data-headline
            className="mt-7 font-display font-black leading-[0.95] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.35rem, 1rem + 4vw, 4rem)" }}
          >
            What do you need right now?
          </h1>

          <p data-meta className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink-300">
            {home.finderBody}
          </p>

          {primary && (
            <a
              data-meta
              href={`tel:${digits(primary.number)}`}
              className="group mt-9 inline-flex items-center gap-4 rounded-2xl bg-persimmon px-6 py-4 transition-colors duration-300 hover:bg-persimmon-600"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" aria-hidden="true">
                <path
                  d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-left">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80">
                  {primary.label}
                </span>
                <span className="block font-display text-xl font-black tabular-nums">
                  {primary.number}
                </span>
              </span>
            </a>
          )}

          <p data-meta className="mt-6 max-w-[40ch] text-[14px] leading-relaxed text-ink-400">
            If you are in immediate danger, call 911. Use the Quick Exit button
            at any time to leave this site.
          </p>
        </div>

        {/* --- Right: the router --- */}
        <div className="min-w-0 lg:col-span-7">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <p className="eyebrow text-ink-400">Choose what fits</p>
              <p className="text-[13px] text-ink-500">
                {pathways.length} paths
              </p>
            </div>

            <ul>
              {pathways.map((p, i) => {
                const u = URGENCY[p.urgency];
                return (
                  <li key={p.label} data-row>
                    <SafeLink
                      href={p.destination.href}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      className="group relative flex items-center gap-5 border-b border-white/[0.07] px-6 py-5 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.05]"
                    >
                      {/* Persimmon edge that slides in on hover */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-persimmon transition-transform duration-400 ease-[var(--ease-out-expo)] ${
                          hovered === i ? "scale-y-100" : "scale-y-0"
                        }`}
                      />

                      <span className={`size-2 shrink-0 rounded-full ${u.dot}`} />

                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-persimmon md:text-xl">
                          {p.label}
                        </span>
                        <span className="mt-0.5 block text-[14px] text-ink-400 sm:truncate">
                          {p.description}
                        </span>
                      </span>

                      <span className="hidden shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500 sm:block">
                        {u.label}
                      </span>

                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon">
                        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </SafeLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <p data-meta className="mt-5 text-[14px] text-ink-400">
            Not sure?{" "}
            <SafeLink
              href="/contact/general"
              className="font-semibold text-white underline decoration-persimmon decoration-2 underline-offset-4 transition-colors hover:text-persimmon"
            >
              Talk to someone
            </SafeLink>{" "}
            and we will help you find the right program.
          </p>
        </div>
      </div>
    </section>
  );
}
