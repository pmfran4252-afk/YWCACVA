/**
 * Illustrated stand-in portraits for the Stories of Hope section.
 *
 * Deliberately faceless. A photograph, or even an illustrated face, beside a
 * survivor's words reads as that survivor's face, and these are stories from
 * real clients whose privacy is a hard constraint. Flat, featureless portraits
 * carry the human presence the section needs while making it obvious that no
 * individual is being depicted.
 *
 * Hair is drawn in two passes, behind and in front of the head, so the face
 * shape reads as a face rather than a silhouette blob.
 *
 * These are placeholders. Swap in approved photography or commissioned
 * illustration when it exists; the framing and sizing stay the same.
 */

export type PortraitKey = "one" | "two" | "three" | "four" | "five";

type Look = {
  bg: string;
  skin: string;
  hair: string;
  top: string;
  /** Drawn behind the head: overall hair mass and length. */
  back: string;
  /** Drawn over the head: crown, fringe, or parting. */
  front: string;
};

const LOOKS: Record<PortraitKey, Look> = {
  // Black woman, natural afro
  one: {
    bg: "#F7F4F0", skin: "#8A5A3B", hair: "#241A16", top: "#FA4616",
    back: "M100 26c-33 0-56 24-56 56s23 54 56 54 56-22 56-54-23-56-56-56Z",
    front: "M100 44c-22 0-35 13-37 30 6-11 19-18 37-18s31 7 37 18c-2-17-15-30-37-30Z",
  },
  // White woman, long straight hair
  two: {
    bg: "#EFE9E2", skin: "#E3B79A", hair: "#7A5535", top: "#31807D",
    back: "M100 28c-27 0-45 19-45 45v58c0 8-3 13-6 19h22V78c0-16 12-28 29-28s29 12 29 28v72h22c-3-6-6-11-6-19V73c0-26-18-45-45-45Z",
    front: "M100 44c-19 0-31 11-34 26 8-9 20-14 34-14s26 5 34 14c-3-15-15-26-34-26Z",
  },
  // Hispanic woman, wavy dark hair
  three: {
    bg: "#F7F4F0", skin: "#C08D64", hair: "#2B1D17", top: "#F1D152",
    back: "M100 28c-29 0-47 19-47 44 0 17 3 27-2 40-3 8 3 13 11 12 7-1 11-6 11-14V76c0-15 12-26 27-26s27 11 27 26v34c0 8 4 13 11 14 8 1 14-4 11-12-5-13-2-23-2-40 0-25-18-44-47-44Z",
    front: "M100 44c-18 0-30 10-34 24 9-8 21-12 34-12s25 4 34 12c-4-14-16-24-34-24Z",
  },
  // Black woman, locs gathered up
  four: {
    bg: "#EFE9E2", skin: "#6F4326", hair: "#1C1512", top: "#16CAFA",
    back: "M100 22c-29 0-49 18-49 45 0 11 2 18 0 26-2 9 4 14 13 14h72c9 0 15-5 13-14-2-8 0-15 0-26 0-27-20-45-49-45Z",
    front: "M100 12c-13 0-22 8-22 18 0 7 5 12 12 14-6-8-2-18 10-18s16 10 10 18c7-2 12-7 12-14 0-10-9-18-22-18Z",
  },
  // White woman, short bob
  five: {
    bg: "#F7F4F0", skin: "#EFC7AC", hair: "#3A2A1E", top: "#501607",
    back: "M100 28c-27 0-45 19-45 45 0 15 2 24-2 32-2 6 2 10 8 10h14V78c0-15 11-26 25-26s25 11 25 26v37h14c6 0 10-4 8-10-4-8-2-17-2-32 0-26-18-45-45-45Z",
    front: "M100 44c-18 0-29 10-33 24 8-8 20-13 33-13s25 5 33 13c-4-14-15-24-33-24Z",
  },
};

export default function PortraitPlaceholder({
  variant,
  className = "",
}: {
  variant: PortraitKey;
  className?: string;
}) {
  const look = LOOKS[variant] ?? LOOKS.one;

  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="img"
      aria-label="Illustrated portrait, used in place of a photograph"
    >
      <rect width="200" height="240" rx="24" fill={look.bg} />

      {/* Hair mass, behind everything */}
      <path d={look.back} fill={look.hair} />

      {/* Shoulders */}
      <path
        d="M100 152c-38 0-64 22-70 50-1 5 2 10 8 10h124c6 0 9-5 8-10-6-28-32-50-70-50Z"
        fill={look.top}
      />

      {/* Neck */}
      <rect x="87" y="122" width="26" height="36" rx="13" fill={look.skin} />

      {/* Face */}
      <ellipse cx="100" cy="88" rx="35" ry="41" fill={look.skin} />

      {/* Crown or fringe, over the face shape */}
      <path d={look.front} fill={look.hair} />
    </svg>
  );
}
