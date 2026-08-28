import SafeLink from "./SafeLink";

type Props = {
  /** "mark" is the wordmark alone; "full" adds the Central Virginia lockup. */
  variant?: "full" | "mark";
  tone?: "persimmon" | "white" | "ink";
  className?: string;
};

const TONE = {
  persimmon: "text-persimmon",
  white: "text-white",
  ink: "text-ink",
} as const;

/**
 * Wordmark drawn as text rather than an image so it stays crisp at any size,
 * recolors per surface, and remains selectable and searchable. The heavy
 * geometric weight matches the official lockup.
 */
export default function Logo({
  variant = "full",
  tone = "persimmon",
  className = "",
}: Props) {
  return (
    <SafeLink
      href="/"
      aria-label="YWCA Central Virginia home"
      className={`group inline-flex flex-col leading-none ${TONE[tone]} ${className}`}
    >
      <span className="font-display text-[2rem] font-black lowercase tracking-[-0.055em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-px sm:text-[2.35rem]">
        ywca
      </span>
      {variant === "full" && (
        <span className="mt-[0.15em] font-display text-[0.74rem] font-medium tracking-[0.01em] sm:text-[0.84rem]">
          Central Virginia
        </span>
      )}
    </SafeLink>
  );
}
