"use client";

import { useRef } from "react";

import Button from "@/components/ui/Button";
import SplitHeadline from "@/components/motion/SplitHeadline";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { HomePage } from "@/content/types";

const TONE = {
  persimmon: { bg: "bg-persimmon", body: "text-white/90", primary: "ink" as const, secondary: "outlineLight" as const },
  mahogany: { bg: "bg-mahogany", body: "text-white/80", primary: "primary" as const, secondary: "outlineLight" as const },
  // ink-900, not ink: this band sits directly above the footer, and #000000
  // against the footer's #0b0b0c reads as a seam.
  ink: { bg: "bg-ink-900", body: "text-white/75", primary: "primary" as const, secondary: "outlineLight" as const },
};

export default function CtaBand({
  home,
  tone = "persimmon",
}: {
  home: HomePage;
  tone?: keyof typeof TONE;
}) {
  const scope = useRef<HTMLElement>(null);
  const t = TONE[tone];

  // Concentric rings drift apart as the band crosses the viewport.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(scope.current!.querySelectorAll("[data-ring]"), {
        scale: 1.14,
        opacity: 0.35,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={`relative overflow-hidden py-24 text-white md:py-32 ${t.bg}`}
      aria-label="Ways to support YWCA Central Virginia"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)]"
      >
        {[520, 760, 1020, 1300].map((size) => (
          <span
            key={size}
            data-ring
            style={{ width: size, height: size }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 opacity-70"
          />
        ))}
      </div>

      <div className="container-page relative text-center">
        <SplitHeadline
          as="h2"
          className="mx-auto max-w-[18ch] font-display font-black leading-[0.95]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {home.ctaHeadline}
        </SplitHeadline>

        <p className={`mx-auto mt-7 max-w-[60ch] text-lg leading-relaxed ${t.body}`}>
          {home.ctaBody}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/get-involved/donate" variant={t.primary} size="lg">
            Donate
          </Button>
          <Button href="/get-involved/volunteer" variant={t.secondary} size="lg">
            Volunteer
          </Button>
          <Button href="/programs" variant={t.secondary} size="lg">
            See programs
          </Button>
        </div>
      </div>
    </section>
  );
}
