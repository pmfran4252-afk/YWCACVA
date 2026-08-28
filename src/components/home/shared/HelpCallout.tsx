import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import type { SiteSettings } from "@/content/types";

const digits = (n: string) => n.replace(/[^\d]/g, "");

/**
 * Get Help Now callout, flagged "Critical" priority in the content plan.
 * Survivor-centered and safety-aware: no assumptions about what the visitor
 * has decided, and the phone numbers are one tap away.
 */
export default function HelpCallout({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-paper pb-20 md:pb-28" aria-labelledby="help-heading">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-7 py-10 text-white md:px-14 md:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-persimmon/25 blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow flex items-center gap-2.5 text-persimmon">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-persimmon opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-persimmon" />
                  </span>
                  Answered 24 hours a day
                </p>

                <h2
                  id="help-heading"
                  className="mt-5 font-display font-black leading-[0.98]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  You don&rsquo;t have to have it figured out to call.
                </h2>

                <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-300">
                  You can call to ask a question, to talk through options, or
                  because you are not sure what to do next. Nothing has to happen
                  because you called. If you are in immediate danger, call 911.
                </p>
              </div>

              <div className="space-y-3">
                {settings.hotlines.map((h) => (
                  <a
                    key={h.number}
                    href={`tel:${digits(h.number)}`}
                    className="group flex items-center justify-between gap-5 rounded-2xl border border-white/12 bg-white/[0.04] p-5 transition-all duration-400 ease-[var(--ease-out-expo)] hover:border-persimmon hover:bg-persimmon md:p-6"
                  >
                    <span>
                      <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-400 transition-colors group-hover:text-white/80">
                        {h.label}
                      </span>
                      <span className="mt-1.5 block font-display text-2xl font-black tabular-nums md:text-3xl">
                        {h.number}
                      </span>
                      {h.note && (
                        <span className="mt-1 block text-[13px] text-ink-400 transition-colors group-hover:text-white/80">
                          {h.note}
                        </span>
                      )}
                    </span>

                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-persimmon transition-colors duration-400 group-hover:bg-white group-hover:text-ink-900">
                      <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                        <path
                          d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                ))}

                <SafeLink
                  href="/get-help-now"
                  className="flex items-center justify-between rounded-2xl px-5 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/5 md:px-6"
                >
                  All the ways to get help
                  <svg viewBox="0 0 16 16" fill="none" className="size-4 text-persimmon" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SafeLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
