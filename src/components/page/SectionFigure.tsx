"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { ArtName } from "./PageArt";

/** How much scrolling the pinned growth consumes, in pixels. Long enough to
 *  read as a deliberate beat, short enough not to feel like a stuck page. */
const PIN_DISTANCE = 460;

type Props = {
  name: ArtName;
  tone?: "dark" | "light";
  side?: "right" | "left";
  /**
   * Where the figure sits vertically. Standing figures read best on the
   * section baseline; a wide scene such as a skyline reads better centred.
   */
  align?: "bottom" | "center";
  /**
   * Feathers the edge that faces the copy, so a wide scene does not run up
   * hard against the text column.
   */
  fadeInnerEdge?: boolean;
  className?: string;
};

/**
 * A hand-drawn figure sitting behind a section's content.
 *
 * Two nested elements on purpose: the outer one owns layout (flex alignment,
 * which side it hugs) and the inner one is the only thing GSAP touches. Sharing
 * a single element would mean an animated `transform` wiping out a centring
 * `translate`, and the figure would jump out of position the moment it animated.
 *
 * Scroll behaviour:
 *  - Desktop: the section pins and the drawing grows from a quarter size and
 *    nothing to full size and full opacity, scrubbed against the pinned scroll,
 *    so it is never half-formed as it leaves the screen. The pin lasts exactly
 *    as long as the growth and then releases.
 *  - Below desktop: the quieter rise-and-fade it has always had, since there
 *    the figure sits behind full-width body copy rather than beside it.
 *  - Parallax: only where the section is tall enough to absorb the travel.
 */
export default function SectionFigure({
  name,
  tone = "light",
  side = "right",
  align = "bottom",
  fadeInnerEdge = false,
  className = "",
}: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";
  const src = `/img/drawings/${name}${dark ? "-light" : ""}.webp`;
  const centered = align === "center";

  useGSAP(
    () => {
      const el = scope.current;
      const section = el?.closest("section");
      if (!el || !section) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        /* The pin starts where the drawing has just finished arriving on
           screen: the section's foot for a standing figure, its middle for a
           wide centred scene. Anchoring to the section rather than the figure
           box matters on long Learn articles, where the box spans the whole
           article but the drawing sits at its foot. */
        const grow = gsap.fromTo(
          el,
          { opacity: 0, scale: 0.25 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: centered ? "center center" : "bottom bottom",
              end: `+=${PIN_DISTANCE}`,
              pin: section,
              anticipatePin: 1,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        return () => {
          grow.scrollTrigger?.kill();
          grow.kill();
        };
      });

      mm.add("(max-width: 1023.98px)", () => {
        const reveal = gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          },
        );

        /* Parallax only below desktop, and only where there is room. On
           desktop the pin owns the section's scroll, and a second scrubbed
           tween on the same element just fights it. */
        let drift: gsap.core.Tween | null = null;

        if (section.offsetHeight > window.innerHeight * 1.25) {
          drift = gsap.to(el, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        return () => {
          reveal.scrollTrigger?.kill();
          reveal.kill();
          drift?.scrollTrigger?.kill();
          drift?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-y-0 flex select-none",
        centered ? "items-center" : "items-end",
        side === "right" ? "right-0 justify-end" : "left-0 justify-start",
        centered
          ? "w-[86%] sm:w-[62%] lg:w-[54%]"
          : "w-[78%] sm:w-[52%] lg:w-[42%]",
        className,
      ].join(" ")}
    >
      <div
        ref={scope}
        data-section-figure
        style={{
          // Grows out of the corner it is anchored to, so shrinking it never
          // makes it drift away from where it belongs.
          transformOrigin: `${side} ${centered ? "center" : "bottom"}`,
          ...(fadeInnerEdge
            ? {
                // Fades toward the copy, so the drawing dissolves instead of
                // stopping at a hard vertical edge beside the text.
                maskImage: `linear-gradient(to ${side === "right" ? "right" : "left"}, transparent 0%, black 38%, black 100%)`,
                WebkitMaskImage: `linear-gradient(to ${side === "right" ? "right" : "left"}, transparent 0%, black 38%, black 100%)`,
              }
            : null),
        }}
        className={[
          "relative w-full",
          centered ? "h-[58%] sm:h-[70%] lg:h-[76%]" : "h-[62%] sm:h-[78%] lg:h-[88%]",
          // Fades hardest on phones, where the figure sits directly behind
          // full-width body copy.
          dark
            ? "opacity-[0.13] sm:opacity-[0.20] lg:opacity-[0.26]"
            : "opacity-[0.07] sm:opacity-[0.10] lg:opacity-[0.14]",
        ].join(" ")}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 54vw"
          className={`object-contain ${
            centered
              ? side === "right"
                ? "object-right"
                : "object-left"
              : side === "right"
                ? "object-right-bottom"
                : "object-left-bottom"
          }`}
        />
      </div>
    </div>
  );
}
