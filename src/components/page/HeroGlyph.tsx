"use client";

import { useRef } from "react";

import { LineIcon, type LineIconName } from "@/components/ui/LineIcons";
import { gsap, useGSAP, whenAnimatable } from "@/lib/gsap";

type Props = {
  name: LineIconName;
  side?: "right" | "left";
  /** "load" for heroes; "scroll" draws the mark when the section is reached. */
  reveal?: "load" | "scroll";
  className?: string;
};

/**
 * The oversized line mark behind a sub-page hero.
 *
 * Runs the full height of the hero and is deliberately cropped by the section,
 * so it reads as a fragment of something much larger rather than an icon that
 * happens to be big. Held at low opacity: present enough to register, faint
 * enough that nothing competes with the headline.
 *
 * Desktop only. On a phone the hero is a single narrow column and the mark
 * would sit directly under the copy with nowhere to go.
 */
export default function HeroGlyph({
  name,
  side = "right",
  reveal = "load",
  className = "",
}: Props) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      whenAnimatable(() => {
        const paths = scope.current?.querySelectorAll<SVGPathElement>(
          "path, circle, rect, line, polyline",
        );
        if (!paths?.length) return;

        // DrawSVG animates the stroke dash, so each shape draws itself in as a
        // continuous line. Sequencing them end to end reads as one unbroken
        // stroke travelling through the whole mark.
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          ...(reveal === "scroll"
            ? {
                scrollTrigger: {
                  trigger: scope.current!.parentElement ?? scope.current,
                  start: "top 75%",
                  once: true,
                },
              }
            : {}),
        });

        tl.fromTo(
          paths,
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            duration: 1.5,
            stagger: 0.45,
          },
        ).from(scope.current, { opacity: 0, duration: 0.8 }, 0);

        return () => {
          tl.kill();
          gsap.set(paths, { clearProps: "strokeDasharray,strokeDashoffset" });
        };
      }),
    { scope, dependencies: [reveal] },
  );

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className={[
        "pointer-events-none absolute -inset-y-[12%] hidden select-none md:block",
        side === "right" ? "right-[-6%] lg:right-[-4%]" : "left-[-10%]",
        "text-white opacity-[0.14] lg:opacity-[0.17]",
        className,
      ].join(" ")}
    >
      {/* 0.22 on the 24-unit grid lands around a 9px stroke once the mark is
          scaled to hero height: a drawn line rather than a heavy slab. */}
      <LineIcon name={name} className="h-full w-auto" strokeWidth={0.22} />
    </div>
  );
}
