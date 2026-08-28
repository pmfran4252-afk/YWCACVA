"use client";

import { useRef, useState } from "react";

import Button from "@/components/ui/Button";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export type AccordionItem = {
  title: string;
  body: string | string[];
  /** Optional jump out of the panel, either in-page ("#id") or to a route. */
  cta?: { label: string; href: string };
};

/**
 * Disclosure list. Built on real <button>/<section> semantics with
 * aria-expanded rather than <details>, so the open/close can be animated
 * without fighting the browser's own toggle.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((item, i) => (
        <AccordionRow
          key={item.title}
          item={item}
          index={i}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </ul>
  );
}

function AccordionRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
        return;
      }

      gsap.to(el, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.45,
        ease: "power3.inOut",
      });
    },
    { dependencies: [isOpen] },
  );

  const body = Array.isArray(item.body) ? item.body : [item.body];

  return (
    <li>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`acc-panel-${index}`}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg font-bold text-ink-900 transition-colors duration-300 group-hover:text-persimmon md:text-xl">
            {item.title}
          </span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ease-[var(--ease-out-expo)] ${
              isOpen
                ? "rotate-45 border-persimmon bg-persimmon text-white"
                : "border-ink-200 text-ink-900 group-hover:border-persimmon"
            }`}
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={`acc-panel-${index}`}
        ref={panel}
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className="max-w-[68ch] pb-7 text-lg leading-[1.7] text-ink-600">
          <div className="space-y-4">
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {item.cta && (
            <div className="mt-7">
              <Button href={item.cta.href} variant="outline" size="sm">
                {item.cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
