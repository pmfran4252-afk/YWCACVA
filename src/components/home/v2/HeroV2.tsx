"use client";

import Image from "next/image";
import { useRef } from "react";

import Button from "@/components/ui/Button";
import { SplitText, gsap, useGSAP, whenAnimatable } from "@/lib/gsap";
import type { HomePage, SiteSettings } from "@/content/types";

const digits = (n: string) => n.replace(/[^\d]/g, "");

/**
 * CONCEPT 2 hero, asymmetric split, in the spirit of the redesign brief:
 * quiet warm ground on the left, a full-bleed window on the right. The
 * photograph carries the metaphor so the type does not have to shout.
 */
export default function HeroV2({
  home,
  settings,
}: {
  home: HomePage;
  settings: SiteSettings;
}) {
  const scope = useRef<HTMLElement>(null);
  const primaryLine = settings.hotlines.find((h) => h.isPrimary) ?? settings.hotlines[0];

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
              duration: 1.3,
              stagger: 0.1,
              delay: 0.15,
              ease: "power4.out",
            });
          },
        });

        gsap.from(root.querySelectorAll("[data-stagger]"), {
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.55,
          ease: "power3.out",
        });

        // The frame unveils from the right rather than fading in.
        gsap.from(root.querySelector("[data-media]"), {
          clipPath: "inset(0% 0% 0% 100%)",
          duration: 1.5,
          ease: "power4.inOut",
        });

        gsap.from(root.querySelector("[data-media] img"), {
          scale: 1.18,
          duration: 2.4,
          ease: "power3.out",
        });
      }),
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative bg-bone pt-24 md:pt-12"
      aria-label="Introduction"
    >
      <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:items-center">
        {/* --- Copy --- */}
        <div className="order-2 px-5 py-14 md:px-10 lg:order-1 lg:col-span-6 lg:py-24 lg:pl-16 lg:pr-14 xl:col-span-5 xl:pl-24">
          <p data-stagger className="eyebrow flex items-center gap-3 text-persimmon">
            <span className="h-px w-8 bg-persimmon/40" />
            {home.heroEyebrow}
          </p>

          <h1
            data-headline
            className="mt-7 font-display font-black leading-[0.94] tracking-[-0.035em] text-ink-900"
            style={{ fontSize: "clamp(2.4rem, 1rem + 4.2vw, 4.25rem)" }}
          >
            {home.heroHeadline}
          </h1>

          <p
            data-stagger
            className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink-600 md:text-xl"
          >
            {home.heroSubhead} For more than a century, YWCA Central Virginia has
            stood beside women and families across this region.
          </p>

          <div data-stagger className="mt-10 flex flex-wrap gap-3">
            <Button href={home.primaryCta.href} variant="primary" size="lg">
              {home.primaryCta.label}
            </Button>
            <Button href={home.secondaryCta.href} variant="outline" size="lg">
              {home.secondaryCta.label}
            </Button>
          </div>

          {/* Crisis line kept in the first screen, not just the chrome */}
          {primaryLine && (
            <a
              data-stagger
              href={`tel:${digits(primaryLine.number)}`}
              className="group mt-10 inline-flex items-center gap-4 border-t border-ink-200 pt-6 text-left"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-400 group-hover:bg-persimmon">
                <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                  <path
                    d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-[13px] text-ink-500">
                  {primaryLine.label} · {primaryLine.note ?? "24/7"}
                </span>
                <span className="block font-display text-xl font-black tabular-nums text-ink-900 transition-colors duration-300 group-hover:text-persimmon">
                  {primaryLine.number}
                </span>
              </span>
            </a>
          )}
        </div>

        {/* --- Media --- */}
        <div
          data-media
          className="order-1 relative h-[52svh] overflow-hidden lg:order-2 lg:col-span-6 lg:h-[100svh] xl:col-span-7"
        >
          <Image
            src="/img/window.jpg"
            alt="Two women talking beside a window at YWCA Central Virginia"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[62%_center]"
          />
        </div>
      </div>
    </section>
  );
}
