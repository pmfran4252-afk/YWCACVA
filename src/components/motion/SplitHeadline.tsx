"use client";

import { useRef, type CSSProperties, type ElementType } from "react";

import { SplitText, gsap, useGSAP, whenAnimatable } from "@/lib/gsap";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  /** "load" fires immediately (hero); "scroll" waits for the viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  style?: CSSProperties;
};

/**
 * Line-by-line headline reveal using GSAP SplitText.
 *
 * SplitText rewrites the DOM into per-line wrappers, which would strand a
 * screen reader mid-sentence, so the original string stays in an `aria-label`
 * and the split markup is hidden from the accessibility tree.
 */
export default function SplitHeadline({
  children,
  as: Tag = "h2",
  className,
  trigger = "scroll",
  delay = 0,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      whenAnimatable(() => {
        const el = ref.current;
        if (!el) return;

      /* Created synchronously so useGSAP's context owns and reverts it.
         `autoSplit` re-measures once webfonts load, splitting against the
         fallback face produces wrong line breaks, and kills the previous
         onSplit animation before each re-split. */
        /* autoSplit re-runs onSplit on every resize. On a phone, resize fires
           whenever the URL bar collapses, so replaying the reveal there would
           make headlines jump around mid-scroll. The entrance plays once; every
           later split just lands the lines in their final position. */
        let played = false;

        const split = SplitText.create(el, {
          type: "lines",
          linesClass: "split-line",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            if (played) {
              gsap.set(self.lines, { yPercent: 0, opacity: 1 });
              return;
            }
            played = true;

            return gsap.from(self.lines, {
              yPercent: 115,
              opacity: 0,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.085,
              delay,
              ...(trigger === "scroll"
                ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } }
                : {}),
            });
          },
        });

        return () => split.revert();
      }),
    { dependencies: [children, trigger, delay] },
  );

  return (
    <Tag ref={ref} className={className} style={style} aria-label={children}>
      <span aria-hidden="true">{children}</span>
    </Tag>
  );
}
