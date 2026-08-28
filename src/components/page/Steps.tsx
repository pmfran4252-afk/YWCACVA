import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import { LineIcon, type LineIconName } from "@/components/ui/LineIcons";

export type Step = {
  title: string;
  body: string;
  icon?: LineIconName;
  /** Where the step goes. Steps without one render as plain cards. */
  href?: string;
  linkLabel?: string;
};

/** Numbered process list, "what happens when you contact us". */
export default function Steps({ steps }: { steps: Step[] }) {
  return (
    <Reveal stagger staggerAmount={0.08}>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const inner = (
            <>
              <span className="flex items-center gap-3">
                <span className="font-display text-[13px] font-black tabular-nums text-persimmon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.icon && (
                  <span className="ml-auto text-ink-300 transition-colors duration-400 group-hover:text-persimmon">
                    <LineIcon name={s.icon} className="size-7" />
                  </span>
                )}
              </span>

              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-600">
                {s.body}
              </p>

              {s.href && (
                <span className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-persimmon">
                  {s.linkLabel ?? "Go"}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-3.5 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </>
          );

          const shell =
            "group relative flex flex-col rounded-2xl border border-ink-200/70 bg-paper p-7 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]";

          return (
            <li key={s.title} className="contents">
              {s.href ? (
                s.href.startsWith("tel:") ? (
                  <a
                    href={s.href}
                    className={`${shell} hover:-translate-y-1 hover:border-persimmon hover:shadow-[var(--shadow-card)]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <SafeLink
                    href={s.href}
                    className={`${shell} hover:-translate-y-1 hover:border-persimmon hover:shadow-[var(--shadow-card)]`}
                  >
                    {inner}
                  </SafeLink>
                )
              ) : (
                <div className={`${shell} hover:border-persimmon/50`}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
