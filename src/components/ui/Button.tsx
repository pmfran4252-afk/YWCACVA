"use client";

import SafeLink from "./SafeLink";
import { scrollToHash } from "@/lib/scroll";
import type { ReactNode } from "react";

type Variant = "primary" | "ink" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-persimmon text-white hover:bg-persimmon-600 shadow-[0_10px_30px_-12px_rgba(250,70,22,0.75)]",
  ink: "bg-ink text-white hover:bg-ink-800",
  outline:
    "border border-ink-200 bg-transparent text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white",
  outlineLight:
    "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink-900",
  ghost: "bg-transparent text-ink-900 hover:bg-ink-050",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 gap-2 pl-4 pr-2 text-[13px]",
  md: "h-12 gap-2.5 pl-6 pr-2.5 text-[15px]",
  lg: "h-14 gap-3 pl-7 pr-3 text-base",
};

const DOT: Record<Size, string> = {
  sm: "size-6",
  md: "size-7",
  lg: "size-8",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Hides the trailing arrow badge for text-only buttons. */
  bare?: boolean;
};

/**
 * The house button: pill, label left, arrow badge right. On hover the badge
 * fills and the arrow travels, a small, consistent piece of feedback that
 * appears on every CTA across the site.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className: extraClassName = "",
  bare = false,
}: Props) {
  const external = href.startsWith("http") || href.startsWith("tel:");
  const isHash = href.startsWith("#");

  const className = `group/btn inline-flex shrink-0 items-center justify-center rounded-full font-semibold transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out-quart)] active:scale-[0.98] ${VARIANTS[variant]} ${bare ? SIZES[size].replace(/pr-\S+/, "pr-6") : SIZES[size]} ${extraClassName}`;

  const inner = (
    <>
      <span>{children}</span>
      {!bare && (
        <span
          className={`relative grid place-items-center overflow-hidden rounded-full bg-white/20 transition-colors duration-300 group-hover/btn:bg-white/90 ${DOT[size]}`}
        >
          <ArrowIcon className="size-3.5 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
          <ArrowIcon className="absolute size-3.5 -translate-x-4 translate-y-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 group-hover/btn:text-ink-900" />
        </span>
      )}
    </>
  );

  // In-page anchors are scrolled by hand: ScrollSmoother transforms the page
  // content, so a native anchor jump lands in the wrong place.
  if (isHash) {
    return (
      <button type="button" onClick={() => scrollToHash(href)} className={className}>
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <SafeLink href={href} className={className}>
      {inner}
    </SafeLink>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5.5M12 4v6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
