import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import { LineIcon, type LineIconName } from "@/components/ui/LineIcons";

export type LinkCard = {
  title: string;
  description?: string;
  href: string;
  meta?: string;
  icon?: LineIconName;
};

export default function LinkCards({
  cards,
  columns = 3,
  tone = "light",
}: {
  cards: LinkCard[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark";
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const dark = tone === "dark";

  return (
    <Reveal stagger staggerAmount={0.06} className={`grid gap-4 ${cols}`}>
      {cards.map((c) => (
        <SafeLink
          key={c.href + c.title}
          href={c.href}
          className={`group flex flex-col justify-between rounded-2xl border p-7 transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${
            dark
              ? "border-white/12 bg-white/[0.03] hover:border-persimmon hover:bg-white/[0.06]"
              : "border-ink-200/70 bg-paper hover:border-transparent hover:shadow-[var(--shadow-lift)]"
          }`}
        >
          <div>
            {c.icon && (
              <span
                className={`mb-5 flex size-12 items-center justify-center rounded-xl transition-colors duration-400 ${
                  dark
                    ? "bg-white/[0.07] text-persimmon group-hover:bg-persimmon group-hover:text-white"
                    : "bg-persimmon-050 text-persimmon group-hover:bg-persimmon group-hover:text-white"
                }`}
              >
                <LineIcon name={c.icon} className="size-6" />
              </span>
            )}
            {c.meta && (
              <span className="eyebrow text-persimmon">{c.meta}</span>
            )}
            <h3
              className={`font-display text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-persimmon ${c.meta ? "mt-3" : ""} ${dark ? "text-white" : "text-ink-900"}`}
            >
              {c.title}
            </h3>
            {c.description && (
              <p
                className={`mt-2.5 text-[15px] leading-relaxed ${dark ? "text-ink-400" : "text-ink-600"}`}
              >
                {c.description}
              </p>
            )}
          </div>

          <span
            className={`mt-7 grid size-10 place-items-center rounded-full border transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white ${
              dark ? "border-white/20 text-white" : "border-ink-200 text-ink-900"
            }`}
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </SafeLink>
      ))}
    </Reveal>
  );
}
