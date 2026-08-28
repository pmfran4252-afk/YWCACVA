"use client";

import { useEffect, useState } from "react";

import { ScrollTrigger } from "@/lib/gsap";

type Tone = "dark" | "light";

/** Relative luminance, per WCAG. Below ~0.4 reads as a dark surface. */
function luminance(rgb: string): number | null {
  const m = rgb.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;

  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
  const [r, g, b] = parts;
  const alpha = parts.length > 3 ? parts[3] : 1;

  // A see-through background tells us nothing about what is painted behind it.
  if (!Number.isFinite(r) || alpha < 0.5) return null;

  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/** Walks up until it finds an element that actually paints a background. */
const THROTTLE_MS = 80;

function toneOf(el: Element): Tone {
  let node: Element | null = el;
  while (node) {
    const lum = luminance(getComputedStyle(node).backgroundColor);
    if (lum !== null) return lum < 0.4 ? "dark" : "light";
    node = node.parentElement;
  }
  return "light";
}

/**
 * Reports the surface currently under the header, and whether the page has
 * been scrolled off the top.
 *
 * Both come from one throttled read on a passive scroll listener rather than
 * from ScrollTrigger ranges. A `start: 80, end: "max"` trigger proved
 * unreliable here: the page contains pinned sections, so "max" is measured
 * before pinning has changed the document height, and the header could end up
 * outside its own active range partway down the page and silently lose its
 * background. Reading the scroll position directly has no such failure mode,
 * and works whether or not ScrollSmoother is running.
 */
export function useSurfaceTone(probeY: number, fallback: Tone) {
  const [tone, setTone] = useState<Tone>(fallback);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const cache = new WeakMap<Element, Tone>();
    let sections: Element[] = [];
    let last = 0;
    let timer = 0;

    const collect = () => {
      sections = Array.from(
        document.querySelectorAll("main > section, main > div > section, footer"),
      );
    };

    const measure = () => {
      setScrolled(window.scrollY > 80);

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          let t = cache.get(el);
          if (!t) {
            t = toneOf(el);
            cache.set(el, t);
          }
          const next = t;
          setTone((prev) => (prev === next ? prev : next));
          return;
        }
      }
    };

    /* Throttle with a trailing call.
       Two failure modes this avoids. A requestAnimationFrame lock wedges
       permanently if a frame is never delivered, which browsers do whenever
       the tab is backgrounded. And a leading-only throttle silently drops the
       LAST event of a burst, so when scrolling stops the header keeps whatever
       state it had 80ms earlier: white type left sitting on a light section.
       The trailing timeout guarantees the final position is always measured. */
    const schedule = () => {
      const now = performance.now();
      const remaining = THROTTLE_MS - (now - last);

      if (remaining <= 0) {
        if (timer) {
          window.clearTimeout(timer);
          timer = 0;
        }
        last = now;
        measure();
        return;
      }

      if (!timer) {
        timer = window.setTimeout(() => {
          timer = 0;
          last = performance.now();
          measure();
        }, remaining);
      }
    };

    collect();
    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const onRefresh = () => {
      collect();
      last = 0;
      schedule();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, [probeY, fallback]);

  return { tone, scrolled };
}
