/**
 * Browser-safety behavior for survivors.
 *
 * ---------------------------------------------------------------------------
 * HOW "DISABLE THE BACK BUTTON" IS ACTUALLY ACHIEVED
 * ---------------------------------------------------------------------------
 * A page cannot delete entries from session history. `location.replace()`
 * overwrites only the entry it is called from. So if a visitor browses
 *
 *     google.com → ywcacva.org → /learn → /learn/warning-signs → [Quick Exit]
 *
 * a plain replace() leaves `/learn` and `ywcacva.org` sitting in the back
 * stack, and one press of Back walks straight back into the site.
 *
 * The only way to stop that is to make sure the site never occupies more than
 * one history entry in the first place. Three things do that together:
 *
 *   1. HISTORY CONTAINMENT, every internal link navigates with `replace`
 *      instead of `push` (see SafeLink), so the whole visit collapses into a
 *      single entry no matter how many pages are viewed.
 *
 *   2. REPLACE ON EXIT, Quick Exit calls location.replace(), overwriting
 *      that single entry. The back stack now contains only whatever preceded
 *      the site, so Back leads to Google, or nowhere at all.
 *
 *   3. BACK-FORWARD TRAP, if a browser still restores the page from its
 *      back/forward cache, a pageshow handler detects the restore and exits
 *      again immediately.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS STILL CANNOT DO
 * ---------------------------------------------------------------------------
 * None of it erases the browser's own history database (chrome://history),
 * the address-bar autocomplete, or saved form data. No website can reach
 * those, only the person using the device can, from browser settings or by
 * browsing privately. That is why the site also carries a plainly worded
 * safety note rather than implying the visit leaves no trace.
 *
 * The cost of containment is that the browser Back button no longer moves
 * backwards *within* the site; it leaves. That trade is deliberate here.
 * Set HISTORY_CONTAINMENT to false to restore normal back behavior.
 */
export const HISTORY_CONTAINMENT = true;

/**
 * Set immediately before leaving. If the page is later restored from the
 * back/forward cache, this tells us to leave again. Deliberately bland, it
 * should mean nothing to anyone who stumbles across it.
 */
export const EXIT_FLAG = "nv";

/** Where Quick Exit sends the visitor. Overridden by Site Settings in Sanity. */
export const DEFAULT_EXIT_URL = "https://www.google.com/search?q=weather+forecast";

/**
 * Leave the site now. Exported on its own so the keyboard shortcut, the
 * button, and the back-forward trap all take exactly the same path out.
 */
export function exitNow(destination: string) {
  try {
    window.sessionStorage.setItem(EXIT_FLAG, "1");
  } catch {
    // Private mode or blocked storage, the replace below still works.
  }

  try {
    window.location.replace(destination);
    // If replace is slow or blocked, force a hard swap rather than leaving
    // the visitor sitting on the page they just tried to leave.
    window.setTimeout(() => {
      window.location.href = destination;
    }, 120);
  } catch {
    window.location.href = destination;
  }
}
