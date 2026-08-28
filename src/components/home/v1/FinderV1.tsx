"use client";

import SafeLink from "@/components/ui/SafeLink";
import { useState } from "react";

import Reveal from "@/components/motion/Reveal";
import type { HomePage, Pathway } from "@/content/types";

const URGENCY_STYLE: Record<Pathway["urgency"], string> = {
  immediate: "bg-persimmon text-white",
  support: "bg-ink text-white",
  info: "bg-cyan-brand text-ink-900",
  help: "bg-gold text-ink-900",
};

const URGENCY_LABEL: Record<Pathway["urgency"], string> = {
  immediate: "Urgent",
  support: "Support",
  info: "Information",
  help: "Give help",
};

/**
 * The support finder, written in the visitor's own words rather than in
 * program names, someone in crisis should not have to know what "SARP"
 * means to find the right door.
 */
export default function FinderV1({
  home,
  pathways,
}: {
  home: HomePage;
  pathways: Pathway[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-bone py-20 md:py-28" aria-labelledby="finder-heading">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-persimmon">Start here</p>
          <h2
            id="finder-heading"
            className="mt-4 font-display font-black text-ink-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {home.finderHeadline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            {home.finderBody}
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((p, i) => (
            <SafeLink
              key={p.label}
              href={p.destination.href}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl border border-ink-200/70 bg-paper p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
            >
              {/* Accent wash that grows from the bottom on hover */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-1 origin-bottom transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:h-full ${URGENCY_STYLE[p.urgency].split(" ")[0]}`}
              />

              <span className="relative">
                <span
                  className={`eyebrow inline-flex rounded-full px-2.5 py-1 text-[10px] transition-colors duration-300 ${URGENCY_STYLE[p.urgency]} group-hover:bg-white/20 group-hover:text-white`}
                >
                  {URGENCY_LABEL[p.urgency]}
                </span>

                <span className="mt-4 block font-display text-xl font-bold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-white">
                  {p.label}
                </span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink-500 transition-colors duration-300 group-hover:text-white/85">
                  {p.description}
                </span>
              </span>

              <span className="relative mt-6 flex items-center gap-2 text-[14px] font-semibold text-persimmon transition-colors duration-300 group-hover:text-white">
                {p.destination.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={`size-3.5 transition-transform duration-400 ease-[var(--ease-out-expo)] ${active === i ? "translate-x-1" : ""}`}
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </SafeLink>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <p className="text-[15px] text-ink-500">
            Not sure where to start?{" "}
            <SafeLink
              href="/contact/general"
              className="font-semibold text-ink-900 underline decoration-persimmon decoration-2 underline-offset-4 transition-colors hover:text-persimmon"
            >
              Talk to someone
            </SafeLink>{" "}
            and we will help you find the right program.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
