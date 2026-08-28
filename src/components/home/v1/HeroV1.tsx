"use client";

import Image from "next/image";
import { useRef } from "react";

import Button from "@/components/ui/Button";
import { SplitText, gsap, prefersReducedMotion, useGSAP, whenAnimatable } from "@/lib/gsap";
import type { HomePage } from "@/content/types";

export default function HeroV1({ home }: { home: HomePage }) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      whenAnimatable(() => {
        const root = scope.current!;
        let heroSplitPlayed = false;

        /* Everything below is created synchronously so useGSAP's context owns it
           and reverts it cleanly. An earlier version built the timeline inside a
           `document.fonts.ready` callback; those tweens fell outside the context,
           so a cleanup froze them mid-flight and the headline stayed invisible. */

        gsap.from(root.querySelectorAll("[data-fade-first]"), {
          y: 14,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        });

        // autoSplit re-splits when webfonts finish loading or the box resizes,
        // and kills the animation returned from onSplit before each re-split , 
        // which is exactly the lifecycle a masked line reveal needs.
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
              yPercent: 118,
              opacity: 0,
              duration: 1.25,
              stagger: 0.09,
              delay: 0.3,
              ease: "power4.out",
            });
          },
        });

        gsap.from(root.querySelectorAll("[data-fade-late]"), {
          y: 22,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          delay: 1.05,
          ease: "power4.out",
        });

        // The frame settles out of a slight over-crop rather than just appearing.
        gsap.from(root.querySelector("[data-hero-media]"), {
          scale: 1.09,
          duration: 2.2,
          ease: "power2.out",
        });
      }),
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-persimmon pt-28 md:justify-center md:pt-36"
    >
      {/* --- Media --- */}
      <div className="absolute inset-0" aria-hidden="true">
        <div data-hero-media className="relative size-full">
          <Image
            src="/img/woman-wall.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-[right_center]"
          />
        </div>
        {/* Legibility scrim, vertical on mobile, horizontal on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent md:bg-gradient-to-r md:from-persimmon md:from-25% md:via-persimmon/70 md:via-45% md:to-transparent md:to-70%" />
      </div>

      {/* --- Copy --- */}
      <div className="container-page relative pb-28 md:pb-0">
        <div className="max-w-2xl">
          <p data-fade-first className="eyebrow flex items-center gap-3 text-white/85">
            <span className="h-px w-8 bg-white/50" />
            {home.heroEyebrow}
          </p>

          <h1
            data-headline
            className="display-lockup mt-6 max-w-[13ch] text-white"
            style={{ fontSize: "clamp(2.5rem, 1.1rem + 4.4vw, 4.75rem)" }}
          >
            {home.heroHeadline}
          </h1>

          <p
            data-fade-late
            className="mt-6 max-w-[34ch] text-lg leading-relaxed text-white/90 md:text-xl"
          >
            {home.heroSubhead}
          </p>

          <div data-fade-late className="mt-9 flex flex-wrap gap-3">
            <Button href={home.primaryCta.href} variant="ink" size="lg">
              {home.primaryCta.label}
            </Button>
            <Button href={home.secondaryCta.href} variant="outlineLight" size="lg">
              {home.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(ref.current!.querySelector("[data-dot]"), {
        y: 16,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.in",
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute bottom-10 right-8 hidden flex-col items-center gap-3 lg:flex"
    >
      <span className="eyebrow text-[10px] text-white/60">Scroll</span>
      <span className="relative flex h-10 w-5 justify-center rounded-full border border-white/35 pt-2">
        <span data-dot className="size-1 rounded-full bg-white" />
      </span>
    </div>
  );
}
