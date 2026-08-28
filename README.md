# YWCA Central Virginia

Next.js 16 (App Router) + Sanity + GSAP. Mobile-first, built around the
approved content workbook and the YWCA brand book.

The site is built on **Concept 3, "The Path"**: the support router leads the
home page, because much of this site's traffic arrives needing something
specific rather than browsing. The two unselected concepts are kept at `/v1`
and `/v2` for reference, listed at `/concepts`.

## Getting started

```bash
npm install
npm run dev
```

| Route                        | What it is                                    |
| ---------------------------- | --------------------------------------------- |
| `/`                          | Home                                          |
| `/get-help-now`              | Crisis page, the highest-priority route      |
| `/about` + 3 subpages        | About, Mission & History, Leadership, Board   |
| `/learn` + `/learn/[slug]`   | Nine educational articles                     |
| `/programs` + `/[slug]`      | Six program pages                           |
| `/support-groups`            | Group directory and how to join               |
| `/get-involved` + 2 subpages | Get Involved, Donate, Volunteer               |
| `/news` + `/news/[slug]`     | News, events, impact stories                  |
| `/contact` + 2 subpages      | Contact, General Contact, Locations           |
| `/shop` + `/shop/[slug]`     | Merchandise, cart, and Stripe checkout        |
| `/concepts`, `/v1`, `/v2`    | Unselected concepts, kept for reference       |
| `/studio`                    | Sanity Studio                                 |

## Content

The site ships with a complete, typed content seed (`src/content/seed.ts`)
taken from the approved workbook, so it renders correctly before a Sanity
project exists. Every query in `src/lib/content.ts` tries Sanity first and
falls back to the seed, including on a transport or permission error. For a
site people reach in a crisis, a slightly stale hotline number rendering beats
a 500 on the page they came for.

To connect the CMS:

```bash
npx sanity@latest init --env      # writes NEXT_PUBLIC_SANITY_* to .env.local
```

Restart the dev server. `/studio` becomes the real Studio and all content
switches over. Schemas live in `src/sanity/schemaTypes` and cover every page
in the workbook: programs, pathways, impact stats, stories, news, people,
timeline, learn articles, support groups and FAQs, plus two singletons
(Site Settings, Home Page).

### ⚠ Verify before launch

The workbook flags these as unconfirmed, and the seed marks them too:

- every hotline and phone number, *"verify every number and instruction"*
- the street address, *"confirm public location details"*
- the Givebutter donation URL, *"insert final Givebutter link"*
- **every definition and safety instruction in `/learn`**, written in standard
  trauma-informed language so there is something concrete to edit, but the
  workbook requires program-lead sign-off before any of it is published. See
  the header of `src/content/pages.ts`.

## Payments

Two separate flows, both hosted by the provider so no card details ever reach
this site or its server.

**Donations: Givebutter.** The widget on `/get-involved/donate` is Givebutter's
own custom element. A visible fallback link renders until the widget reports
itself loaded, because donations have to work even when a third-party script is
blocked by an extension or a corporate network.

**Shop: Stripe Checkout.** `/api/checkout` builds a Checkout Session and
redirects to Stripe's hosted page. The request carries only slug, variant and
quantity: **every price is looked up server-side** from `src/content/shop.ts`,
so a tampered request cannot buy a $25 shirt for a dollar. Without
`STRIPE_SECRET_KEY` the shop still browses and the cart still works; checkout
returns a clear "not connected yet" message.

The cart lives in `localStorage` and is read through `useSyncExternalStore`,
which keeps the server snapshot empty (no hydration mismatch) and lets any
component read it without prop drilling.

## Illustration and iconography

Three distinct layers, deliberately kept apart:

- **Hero glyphs**: an oversized line mark behind each sub-page hero, cropped
  by the section and drawn in with GSAP DrawSVG so it appears to be traced by a
  single line. Desktop only; a phone hero is one narrow column with nowhere to
  put it.
- **Body figures**: the hand-drawn illustrations, anchored to the bottom edge
  of a section, revealed on scroll, and given a slow parallax drift only where
  the section is tall enough to absorb it. **Each of the ten drawings is used on
  exactly one page.**
- **Line icons**: the working icon set that sits next to labels, on a 24px
  grid with a 1.6 stroke and `currentColor`.

Note on the artwork itself: the drawings ship in two variants per file, the
original and a pre-inverted `-light` version for dark surfaces. A CSS
`invert()` filter would be simpler but leaves a visible haze across the
transparent area, because inverting `(0,0,0,0)` yields `(255,255,255,0)`.
Regenerate the light set with `node scripts/invert-art.mjs`.

## Design system

From `YWCA_BRAND_BOOK.pdf`, encoded as tokens in `src/app/globals.css`.

| Token          | Value     | Source                             |
| -------------- | --------- | ---------------------------------- |
| Persimmon      | `#FA4616` | Pantone 172 C, primary brand color |
| Black / White  | `#000` / `#FFF` | Primary palette              |
| Cool Gray 5    | `#BDBDBD` | Secondary                          |
| Chart accents  | `#F1D152` `#31807D` `#344D5C` `#A63C36` | Brand book p.36 |
| Mahogany       | `#501607` | Approved secondary                 |
| Cyan           | `#16CAFA` | Approved secondary                 |

The brand book specifies **Avenir Next LT Pro Heavy** for display and
**Source Sans Pro** for text. Source Sans 3 is that family exactly. Avenir
Next is not freely licensable for web, so display type uses **Figtree**, the
closest geometric-humanist match. Swap in a licensed Avenir Next by changing
`--font-display` in `globals.css`.

## Safety behavior

### Quick Exit and the Back button

Present on every page: a Quick Exit button, plus double-Escape as a keyboard
route out.

Making Back genuinely unable to return to the site takes more than
`location.replace()`. That call overwrites only the entry it runs from, so a
visitor who browsed Home → Learn → Warning Signs would still have two site
pages sitting in the back stack. Three mechanisms work together instead
(all in `src/lib/safety.ts`):

1. **History containment**, every internal link navigates with `replace`
   rather than `push`, via `SafeLink`. However many pages someone views, the
   visit occupies a single history entry.
2. **Replace on exit**, Quick Exit overwrites that single entry, so the back
   stack holds only whatever preceded the site.
3. **Back/forward-cache trap**, if a browser still restores the page, a
   `pageshow` handler detects it and exits again.

**The trade-off is deliberate:** the browser Back button no longer moves
backwards *within* the site, it leaves. Set `HISTORY_CONTAINMENT` to `false`
in `src/lib/safety.ts` to restore normal Back behavior and give up the
guarantee.

**What none of this can do:** erase the browser's own history database,
address-bar autocomplete, or saved form data. No website can reach those. The
Get Help Now page says so plainly rather than implying the visit is untraceable.

Verify it with `npm run check:safety` (against a production build, see below).

### Everything else

- **Crisis line**, a tap-to-call dock inside thumb reach on mobile, a slim
  bar on desktop.
- **No survivor photographs, no precise locations.** Stories carry a first
  name and a broad locality. Map pins are deliberately imprecise, and shelter
  addresses are never published.
- **Referrer policy** is set to `no-referrer` so outbound clicks do not leak
  which YWCA page someone was reading.

## Motion

GSAP throughout: ScrollSmoother, ScrollTrigger pinning, SplitText headlines,
Observer-driven carousels, scroll-linked counters.

Two rules the codebase enforces:

1. **Nothing is hidden by an animation that might not run.** `whenAnimatable()`
   in `src/lib/gsap.ts` defers setup until the document is actually visible,
   because browsers throttle rAF in background tabs and a frozen `from` tween
   would leave hero copy and crisis details invisible.
2. **`prefers-reduced-motion` disables all of it**, including smooth scroll
   and pinning, and content stays visible.

Pinned sections are gated behind `gsap.matchMedia()` on both width and height , 
a pinned stack on a short screen traps the visitor.

## Scripts

```bash
npm run dev              # dev server
npm run build            # production build
npm run lint             # eslint
npm run typecheck        # tsc --noEmit
npm run check:overflow   # fails on horizontal overflow at 390px
npm run check:safety     # verifies the Quick Exit / Back-button guarantee
```

`check:safety` must run against a **production** server:

```bash
npm run build && npx next start -p 3000
npm run check:safety
```

`next dev` compiles routes on demand and can fall back to a full browser
navigation, which pushes a history entry and makes the containment check fail
even though the shipped build is correct.

Screenshot helpers (need the dev server running with
`NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL=1`):

```bash
npm run shot   -- ./out http://localhost:3000/v1          # full page
npm run frames -- ./out http://localhost:3000/v2 0 900 4  # viewport frames
```

Full-page capture misrepresents pinned sections, a pinned element is
`position: fixed` and renders once at the top of a tall capture. Use `frames`
to see what a pinned section actually does.
