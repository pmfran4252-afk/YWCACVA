import type { ReactNode } from "react";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import SectionFigure from "./SectionFigure";
import type { ArtName } from "./PageArt";

type Tone = "paper" | "bone" | "ink";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink-900",
  bone: "bg-bone text-ink-900",
  ink: "bg-ink-900 text-white",
};

const EYEBROW: Record<Tone, string> = {
  paper: "text-persimmon",
  bone: "text-persimmon",
  ink: "text-persimmon",
};

const LEAD: Record<Tone, string> = {
  paper: "text-ink-600",
  bone: "text-ink-600",
  ink: "text-ink-300",
};

export default function Section({
  eyebrow,
  title,
  lead,
  tone = "paper",
  id,
  children,
  narrow = false,
  figure,
  figureSide = "right",
  figureAlign = "bottom",
  figureFade = false,
  figureMobile = "background",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: Tone;
  id?: string;
  children?: ReactNode;
  narrow?: boolean;
  figure?: ArtName;
  figureSide?: "left" | "right";
  figureAlign?: "bottom" | "center";
  figureFade?: boolean;
  /**
   * "below" drops the figure out of the background on small screens and
   * renders it in the flow underneath the content instead. A wide scene sitting
   * behind full-width body copy on a phone costs legibility and gains nothing.
   */
  figureMobile?: "background" | "below";
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative overflow-hidden py-16 md:py-24 ${TONE[tone]}`}
    >
      {figure && (
        <SectionFigure
          name={figure}
          tone={tone === "ink" ? "dark" : "light"}
          side={figureSide}
          align={figureAlign}
          fadeInnerEdge={figureFade}
          className={figureMobile === "below" ? "hidden md:flex" : undefined}
        />
      )}

      <div className="container-page relative">
        {(eyebrow || title || lead) && (
          <Reveal className={narrow ? "max-w-3xl" : "max-w-4xl"}>
            {eyebrow && <p className={`eyebrow ${EYEBROW[tone]}`}>{eyebrow}</p>}
            {title && (
              <h2
                id={headingId}
                className="mt-4 font-display font-black"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {title}
              </h2>
            )}
            {lead && (
              <p className={`mt-5 max-w-[62ch] text-lg leading-relaxed ${LEAD[tone]}`}>
                {lead}
              </p>
            )}
          </Reveal>
        )}

        {children && <div className={eyebrow || title ? "mt-12" : ""}>{children}</div>}

        {figure && figureMobile === "below" && (
          <Reveal className="mt-14 md:hidden">
            <div className="relative aspect-[16/9] w-full opacity-80">
              <Image
                src={`/img/drawings/${figure}${tone === "ink" ? "-light" : ""}.png`}
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
