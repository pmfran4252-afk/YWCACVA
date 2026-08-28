"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import Reveal from "@/components/motion/Reveal";
import PortraitPlaceholder from "@/components/home/shared/PortraitPlaceholder";
import { STORY_PORTRAITS } from "@/content/media";
import { Observer, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { Story } from "@/content/types";

/**
 * Story carousel driven by GSAP Observer, so drag, wheel and touch all move
 * the deck. Buttons and arrow keys stay available, a drag-only carousel is
 * unusable with a keyboard or a screen reader.
 */
export default function StoriesCarousel({
  headline,
  stories,
}: {
  headline: string;
  stories: Story[];
}) {
  const scope = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const go = (dir: number) =>
    setIndex((i) => Math.min(stories.length - 1, Math.max(0, i + dir)));

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const track = scope.current!.querySelector<HTMLElement>("[data-track]")!;
      gsap.to(track, {
        xPercent: -index * 100,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { dependencies: [index], scope },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const observer = Observer.create({
        target: scope.current!.querySelector("[data-viewport]"),
        type: "touch,pointer",
        // lockAxis lets Observer decide the gesture's axis on first movement,
        // so a vertical swipe still scrolls the page instead of being eaten
        // by the carousel.
        lockAxis: true,
        tolerance: 40,
        dragMinimum: 12,
        onLeft: () => go(1),
        onRight: () => go(-1),
      });

      return () => observer.kill();
    },
    { scope },
  );

  const current = stories[index];

  return (
    <section
      ref={scope}
      className="bg-bone py-20 md:py-28"
      aria-labelledby="stories-v3"
      aria-roledescription="carousel"
    >
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-persimmon">In their words</p>
            <h2
              id="stories-v3"
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {headline}
            </h2>
            <p className="mt-4 max-w-[52ch] text-ink-600">
              Names and details are changed to protect privacy. Portraits are
              illustrations, not the people quoted.
            </p>
          </div>

          <div className="flex gap-2">
            <CarouselButton
              label="Previous story"
              disabled={index === 0}
              onClick={() => go(-1)}
              flip
            />
            <CarouselButton
              label="Next story"
              disabled={index === stories.length - 1}
              onClick={() => go(1)}
            />
          </div>
        </Reveal>

        <div
          data-viewport
          className="mt-12 overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          tabIndex={0}
          role="group"
          aria-label={`Story ${index + 1} of ${stories.length}`}
        >
          <div data-track className="flex">
            {stories.map((s, i) => (
              <article
                key={s.attribution}
                aria-hidden={i !== index}
                className={`w-full shrink-0 pr-4 transition-opacity duration-500 md:pr-8 ${
                  i === index ? "opacity-100" : "opacity-35"
                }`}
              >
                <div className="grid gap-8 rounded-3xl bg-paper p-8 shadow-[var(--shadow-card)] md:grid-cols-12 md:items-center md:gap-12 md:p-14">
                  <div className="md:col-span-8">
                    <svg viewBox="0 0 24 24" className="size-9 text-persimmon" fill="currentColor" aria-hidden="true">
                      <path d="M9.5 5C6.5 6.7 5 9.4 5 13v6h6v-6H8.2c.1-2.3 1-3.9 2.8-4.8L9.5 5Zm9 0c-3 1.7-4.5 4.4-4.5 8v6h6v-6h-2.8c.1-2.3 1-3.9 2.8-4.8L18.5 5Z" />
                    </svg>

                    <blockquote className="mt-7">
                      <p className="max-w-[30ch] font-display text-2xl font-black leading-[1.12] tracking-[-0.02em] text-ink-900 md:max-w-[26ch] md:text-4xl">
                        {s.quote}
                      </p>
                      <footer className="mt-8 flex items-center gap-3 text-[15px]">
                        <span className="grid size-10 place-items-center rounded-full bg-persimmon-100 font-display font-black text-persimmon">
                          {s.attribution.charAt(0)}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink-900">
                            {s.attribution}
                          </span>
                          {s.locality && (
                            <span className="block text-[13px] text-ink-500">
                              {s.locality}
                            </span>
                          )}
                        </span>
                      </footer>
                    </blockquote>
                  </div>

                  {s.portrait && (
                    <div className="md:col-span-4">
                      {STORY_PORTRAITS[s.portrait] ? (
                        <Image
                          src={STORY_PORTRAITS[s.portrait]}
                          alt={`Illustrated portrait standing in for ${s.attribution}, who is not pictured`}
                          width={800}
                          height={1000}
                          sizes="(min-width: 768px) 15rem, 11rem"
                          // Keyed to ink-on-transparent by
                          // scripts/key-portraits.mjs, so it sits on the card
                          // with no paper edge and no blend mode.
                          className="mx-auto w-44 md:w-full md:max-w-[15rem]"
                        />
                      ) : (
                        <PortraitPlaceholder
                          variant={s.portrait}
                          className="mx-auto w-44 md:w-full md:max-w-[15rem]"
                        />
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-2">
          {stories.map((s, i) => (
            <button
              key={s.attribution}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to story ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                i === index ? "w-10 bg-persimmon" : "w-1.5 bg-ink-200 hover:bg-ink-300"
              }`}
            />
          ))}
          <span className="ml-3 font-display text-[13px] font-bold tabular-nums text-ink-400">
            {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
          </span>
        </div>

        <p className="sr-only" aria-live="polite">
          {current?.attribution}: {current?.quote}
        </p>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  disabled,
  flip,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-ink-200 text-ink-900 transition-all duration-400 ease-[var(--ease-out-expo)] enabled:hover:border-persimmon enabled:hover:bg-persimmon enabled:hover:text-white disabled:opacity-30"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className={`size-4 ${flip ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
