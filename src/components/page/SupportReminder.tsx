import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import type { SiteSettings } from "@/content/types";

const digits = (n: string) => n.replace(/[^\d]/g, "");

/**
 * "Help is available" reminder. The content plan marks this Critical and asks
 * for it throughout the Learn section, someone reading about warning signs
 * may recognize their own situation partway down the page, and should not
 * have to scroll back to the top to find a number.
 */
export default function SupportReminder({
  settings,
  tone = "bone",
}: {
  settings: SiteSettings;
  tone?: "bone" | "paper";
}) {
  const primary = settings.hotlines.find((h) => h.isPrimary) ?? settings.hotlines[0];

  return (
    <section className={tone === "bone" ? "bg-bone" : "bg-paper"}>
      <div className="container-page py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-7 rounded-3xl bg-ink-900 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="eyebrow flex items-center gap-2.5 text-persimmon">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-persimmon opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-persimmon" />
                </span>
                Support is available
              </p>
              <h2 className="mt-4 max-w-[28ch] font-display text-2xl font-black leading-tight md:text-[1.75rem]">
                You can call to ask a question. Nothing has to happen because
                you called.
              </h2>
              <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-ink-300">
                Advocates answer every hour of every day. If you are in
                immediate danger, call 911.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              {primary && (
                <a
                  href={`tel:${digits(primary.number)}`}
                  className="group flex items-center gap-4 rounded-2xl bg-persimmon px-6 py-4 transition-colors duration-300 hover:bg-persimmon-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" aria-hidden="true">
                    <path
                      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-left">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80">
                      {primary.label}
                    </span>
                    <span className="block font-display text-xl font-black tabular-nums">
                      {primary.number}
                    </span>
                  </span>
                </a>
              )}
              <SafeLink
                href="/get-help-now"
                className="rounded-2xl border border-white/20 px-6 py-3.5 text-center text-[15px] font-semibold transition-colors hover:border-persimmon hover:bg-persimmon"
              >
                All the ways to get help
              </SafeLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
