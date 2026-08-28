import type { ReactNode } from "react";

/**
 * Body-copy container. Measure is capped near 68 characters, which is where
 * long-form reading comfort sits, most of this site's text is being read by
 * someone under stress, so line length matters more than usual.
 */
export default function Prose({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={[
        "max-w-[68ch] text-lg leading-[1.75]",
        dark ? "text-ink-300" : "text-ink-700",
        "[&>*+*]:mt-6",
        "[&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-[1.6rem] [&_h2]:font-black [&_h2]:leading-tight",
        dark ? "[&_h2]:text-white" : "[&_h2]:text-ink-900",
        "[&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-[1.25rem] [&_h3]:font-bold",
        dark ? "[&_h3]:text-white" : "[&_h3]:text-ink-900",
        "[&_ul]:space-y-3 [&_ul]:pl-0 [&_ol]:space-y-3",
        "[&_li]:relative [&_li]:list-none [&_li]:pl-7",
        "[&_ul>li]:before:absolute [&_ul>li]:before:left-1 [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-persimmon",
        "[&_strong]:font-semibold",
        dark ? "[&_strong]:text-white" : "[&_strong]:text-ink-900",
        "[&_a]:font-semibold [&_a]:underline [&_a]:decoration-persimmon [&_a]:decoration-2 [&_a]:underline-offset-4",
        dark ? "[&_a]:text-white" : "[&_a]:text-ink-900",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
