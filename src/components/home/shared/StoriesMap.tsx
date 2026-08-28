"use client";

import Image from "next/image";
import { useState } from "react";

import Reveal from "@/components/motion/Reveal";
import type { Story } from "@/content/types";

/**
 * Bounds of /img/map-cva.jpg, derived by solving a linear fit against four
 * known towns on the tile (Lynchburg, Forest, Amherst, Rustburg). Replace the
 * image and these four numbers change with it.
 */
const MAP = { north: 37.6215, south: 37.0916, west: -79.5261, east: -78.8454 };

const clamp = (n: number, lo = 6, hi = 94) => Math.min(hi, Math.max(lo, n));

function project(lat: number, lng: number) {
  return {
    left: clamp(((lng - MAP.west) / (MAP.east - MAP.west)) * 100),
    top: clamp(((MAP.north - lat) / (MAP.north - MAP.south)) * 100),
  };
}

/**
 * Stories of Hope, placed across the service area.
 *
 * Deliberately no survivor photographs and no precise locations, pins carry
 * an initial and a broad locality only. The map should communicate reach; it
 * must never help someone locate a person.
 */
export default function StoriesMap({
  headline,
  stories,
}: {
  headline: string;
  stories: Story[];
}) {
  const [active, setActive] = useState(0);
  const pinned = stories.filter((s) => s.coordinates);
  const current = pinned[active];

  return (
    <section className="relative overflow-hidden bg-bone" aria-labelledby="stories-heading">
      <div className="relative">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[2/1]">
          <Image
            src="/img/map-cva.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-bone/35 to-bone/90" />

          {pinned.map((s, i) => {
            const { left, top } = project(s.coordinates!.lat, s.coordinates!.lng);
            const isActive = i === active;
            return (
              <button
                key={s.attribution}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-label={`Read ${s.attribution}'s story from ${s.locality}`}
                aria-pressed={isActive}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={`relative grid place-items-center rounded-full font-display font-black transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    isActive
                      ? "size-14 bg-persimmon text-white shadow-[0_10px_30px_-8px_rgba(250,70,22,0.8)]"
                      : "size-11 bg-paper text-ink-700 shadow-[var(--shadow-card)] group-hover:size-12"
                  }`}
                >
                  {!isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-persimmon/25 [animation-duration:3s]" />
                  )}
                  <span className="relative text-base">{s.attribution.charAt(0)}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrim so the heading never fights the road labels underneath */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-bone via-bone/85 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-0 pt-16 md:pt-20">
          <Reveal className="container-page text-center">
            <p className="eyebrow text-persimmon">Across Central Virginia</p>
            <h2
              id="stories-heading"
              className="mt-3 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {headline}
            </h2>
            <p className="mt-3 text-ink-600">
              Real women. Real stories. Details changed to protect privacy.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-page relative -mt-8 pb-20 md:-mt-20 md:pb-28">
        <div className="mx-auto max-w-3xl rounded-3xl bg-paper p-8 shadow-[var(--shadow-lift)] md:p-12">
          <blockquote>
            <svg viewBox="0 0 24 24" className="size-8 text-persimmon" fill="currentColor" aria-hidden="true">
              <path d="M9.5 5C6.5 6.7 5 9.4 5 13v6h6v-6H8.2c.1-2.3 1-3.9 2.8-4.8L9.5 5Zm9 0c-3 1.7-4.5 4.4-4.5 8v6h6v-6h-2.8c.1-2.3 1-3.9 2.8-4.8L18.5 5Z" />
            </svg>

            <p
              key={active}
              className="mt-5 font-display text-xl font-bold leading-snug text-ink-900 md:text-2xl"
            >
              {current?.quote}
            </p>

            <footer className="mt-6 flex items-center gap-3 text-[15px]">
              <span className="grid size-9 place-items-center rounded-full bg-persimmon-100 font-display font-black text-persimmon">
                {current?.attribution.charAt(0)}
              </span>
              <span>
                <span className="font-semibold text-ink-900">{current?.attribution}</span>
                {current?.locality && <span className="text-ink-500"> · {current.locality}</span>}
              </span>
            </footer>
          </blockquote>

          <div className="mt-8 flex items-center gap-2 border-t border-ink-100 pt-6">
            {pinned.map((s, i) => (
              <button
                key={s.attribution}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Story ${i + 1} of ${pinned.length}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                  i === active ? "w-8 bg-persimmon" : "w-1.5 bg-ink-200 hover:bg-ink-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
