/**
 * Art direction: which hero mark and which hand-drawn figure belong to which
 * page.
 *
 * Two separate layers, deliberately:
 *
 *  - HERO GLYPH  an oversized line mark, cropped by the hero and drawn in on
 *    load. Icons repeat across distant pages, which is normal for an icon
 *    language and helps the sections feel related.
 *
 *  - BODY FIGURE  a hand-drawn illustration standing on the section baseline.
 *    Every program and Learn page carries one. The drawings currently repeat
 *    across pages, which is a deliberate interim state: the layout is being
 *    settled first and fresh artwork will replace the duplicates page by page.
 *    When that happens, only the values below need to change.
 *
 * One deliberate placement: `domestic-violence` (a woman with a bruised face
 * and a raised hand) appears only on the Domestic Violence Prevention page,
 * where a visitor has navigated to that service on purpose, and only at
 * watermark opacity. The content workbook asks for no graphic imagery in the
 * Learn section, and the brand book asks for images that "communicate positive
 * emotion" elsewhere.
 */

import type { ArtName } from "@/components/page/PageArt";
import type { LineIconName } from "@/components/ui/LineIcons";

type Pairing = { glyph?: LineIconName; figure?: ArtName; icon?: LineIconName };

export const PROGRAM_MEDIA: Record<string, Pairing> = {
  "domestic-violence-prevention": { glyph: "phone", icon: "shield", figure: "domestic-violence" },
  "sexual-assault-response": { glyph: "heart", icon: "heart", figure: "listening" },
  "court-advocacy": { glyph: "scales", icon: "scales", figure: "strength" },
  housing: { glyph: "home", icon: "home", figure: "doorway" },
  visitation: { glyph: "users", icon: "users", figure: "visitation" },
  "church-bridal": { glyph: "dress", icon: "dress", figure: "church-street-bridal" },
};

/** Note the absence of `domestic-violence` here, see the note above. */
export const LEARN_MEDIA: Record<string, Pairing> = {
  "what-is-abuse": { glyph: "lock", icon: "alert", figure: "reaching-out" },
  "what-is-sexual-assault": { glyph: "shield", icon: "shield", figure: "listening" },
  "what-is-rape": { glyph: "heart", icon: "heart", figure: "counseling" },
  "warning-signs": { glyph: "alert", icon: "alert", figure: "strength" },
  "safety-planning": { glyph: "route", icon: "route", figure: "studying" },
  "how-to-help": { glyph: "handshake", icon: "handshake", figure: "reaching-out" },
  "how-to-talk-to-child": { glyph: "chat", icon: "users", figure: "visitation" },
  "myths-and-facts": { glyph: "book", icon: "book", figure: "studying" },
  "healthy-relationships": { glyph: "spark", icon: "spark", figure: "community-meal" },
};

export const programMedia = (slug: string): Pairing => PROGRAM_MEDIA[slug] ?? {};
export const learnMedia = (slug: string): Pairing => LEARN_MEDIA[slug] ?? {};

/**
 * Illustrated portraits for Stories of Hope, keyed by the story's `portrait`
 * slot rather than by name, so a story can be re-attributed in the CMS without
 * silently repointing at someone else's drawing.
 *
 * These are graphite illustrations, never photographs of the people quoted.
 * The quotes are composites and the names are changed, so a real likeness here
 * would put a survivor at risk. Anything added to this map has to stay drawn.
 */
export const STORY_PORTRAITS: Record<string, string> = {
  one: "/portraits/danielle.webp",
  two: "/portraits/renee.webp",
  three: "/portraits/marisol.webp",
  four: "/portraits/keisha.webp",
  five: "/portraits/anne.webp",
};
