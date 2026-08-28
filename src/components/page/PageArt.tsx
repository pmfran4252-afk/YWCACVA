import Image from "next/image";

export type ArtName =
  | "visitation"
  | "domestic-violence"
  | "strength"
  | "listening"
  | "studying"
  | "reaching-out"
  | "community"
  | "counseling"
  | "doorway"
  | "community-meal"
  | "church-street-bridal"
  | "lynchburg";

type Props = {
  name: ArtName;
  /** Tone of the surface behind the art, not of the art itself. */
  tone?: "dark" | "light";
  side?: "right" | "left" | "center";
  /** Slightly stronger where the art is the point rather than texture. */
  emphasis?: "subtle" | "normal";
  className?: string;
};

/**
 * Faded background illustration.
 *
 * The drawings are black ink on transparency, so on a dark surface they are
 * inverted to white and screened; on a light surface they are used as-is.
 * Black ink on paper reads much heavier than white ink on ink, so the light
 * variant is held to roughly half the opacity of the dark one.
 *
 * Every variant fades further on small screens. These sit directly behind body
 * copy, and a drawing that reads nicely on a desktop column is busy enough to
 * cost legibility once the text spans the full width of a phone.
 */
export default function PageArt({
  name,
  tone = "dark",
  side = "right",
  emphasis = "normal",
  className = "",
}: Props) {
  const dark = tone === "dark";

  /* Two asset variants rather than a CSS invert(): filtering a transparent
     PNG leaves a faint white rectangle where alpha is zero, because the
     compositor inverts (0,0,0,0) to (255,255,255,0). The "-light" files carry
     the inversion already, so no filter and no blend mode are needed. */
  const src = `/img/drawings/${name}${dark ? "-light" : ""}.png`;

  const opacity = dark
    ? emphasis === "subtle"
      ? "opacity-[0.08] sm:opacity-[0.13] lg:opacity-[0.17]"
      : "opacity-[0.11] sm:opacity-[0.17] lg:opacity-[0.22]"
    : emphasis === "subtle"
      ? "opacity-[0.04] sm:opacity-[0.055] lg:opacity-[0.075]"
      : "opacity-[0.055] sm:opacity-[0.08] lg:opacity-[0.11]";

  const anchor =
    side === "left"
      ? "left-0 justify-start"
      : side === "center"
        ? "inset-x-0 justify-center"
        : "right-0 justify-end";

  const objectPos =
    side === "left"
      ? "object-left"
      : side === "center"
        ? "object-center"
        : "object-right";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${anchor} w-full select-none sm:w-[70%] lg:w-[52%] ${className}`}
    >
      <div className={`relative size-full ${opacity}`}>
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 52vw"
          className={`${objectPos} object-contain`}
        />
      </div>
    </div>
  );
}
