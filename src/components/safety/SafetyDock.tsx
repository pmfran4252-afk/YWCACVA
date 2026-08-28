"use client";

import { useQuickEscape } from "./useQuickEscape";
import type { Hotline } from "@/content/types";

type Props = {
  hotlines: Hotline[];
  quickEscapeUrl: string;
};

const digits = (n: string) => n.replace(/[^\d]/g, "");

/**
 * Crisis contact and Quick Exit, present on every page.
 *
 * Mobile-first: on small screens this is a fixed bottom dock, inside thumb
 * reach and above the home indicator. On desktop it becomes a slim top bar so
 * it never covers content. It renders outside the ScrollSmoother content
 * wrapper, a transformed ancestor would break `position: fixed`.
 */
export default function SafetyDock({ hotlines, quickEscapeUrl }: Props) {
  const escape = useQuickEscape(quickEscapeUrl);
  const primary = hotlines.find((h) => h.isPrimary) ?? hotlines[0];

  if (!primary) return null;

  return (
    <>
      {/* ---------- Desktop: slim top bar ---------- */}
      <div className="fixed inset-x-0 top-0 z-100 hidden h-12 items-center bg-ink text-white md:flex">
        <div className="container-page flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 text-[15px]">
            {hotlines.map((h) => (
              <a
                key={h.number}
                href={`tel:${digits(h.number)}`}
                className="group flex items-center gap-2 transition-colors hover:text-persimmon"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-persimmon opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-persimmon" />
                </span>
                <span className="text-ink-300 group-hover:text-white">{h.label}</span>
                <span className="font-semibold tabular-nums">{h.number}</span>
                {h.note && <span className="text-ink-400">{h.note}</span>}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={escape}
            className="group/exit flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-[15px] font-bold transition hover:bg-persimmon"
          >
            <ExitIcon />
            Quick Exit
            <kbd className="rounded bg-black/30 px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-ink-300 transition-colors group-hover/exit:text-white/80">
              ESC ESC
            </kbd>
          </button>
        </div>
      </div>

      {/* ---------- Mobile: fixed bottom dock ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-100 md:hidden">
        <div className="flex items-stretch gap-px bg-ink pb-[env(safe-area-inset-bottom)] text-white">
          {/* min-w-0 on the flex child, or the phone line's intrinsic width
              becomes the dock's floor and the whole bar overflows a narrow
              phone. The Exit button never shrinks. */}
          <a
            href={`tel:${digits(primary.number)}`}
            className="flex min-w-0 flex-1 items-center justify-center gap-3 py-4 active:bg-persimmon-700"
          >
            <PhoneIcon />
            <span className="min-w-0 text-left leading-tight">
              <span className="block text-[15px] font-bold">Call for help</span>
              <span className="block truncate text-[12.5px] text-ink-300">
                {primary.number} · {primary.note ?? "24/7"}
              </span>
            </span>
          </a>

          <button
            type="button"
            onClick={escape}
            className="flex shrink-0 items-center justify-center gap-2 bg-persimmon px-5 font-bold active:bg-persimmon-700"
          >
            <ExitIcon className="size-6 shrink-0" />
            <span className="text-[15px]">Exit</span>
          </button>
        </div>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExitIcon({ className = "size-4.5 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l4-4-4-4M14 12H3"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
