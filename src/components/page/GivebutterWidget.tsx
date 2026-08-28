"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/* Givebutter's embed is a custom element. Casting the tag name is simpler and
   safer than augmenting the JSX namespace, which React 19 has moved anyway. */
const GivebutterElement = "givebutter-widget" as unknown as React.FC<{
  id: string;
}>;

/**
 * Givebutter donation widget.
 *
 * Givebutter hosts the entire payment flow, so no card details ever touch this
 * site. The widget is a custom element, hydrated by Givebutter's loader.
 *
 * The loader takes only `acct`. The `p=squarespace` / `p=wordpress` you see in
 * Givebutter's copy-paste snippets is a platform tag they append per help
 * article, not part of the documented API, so it is omitted here.
 *
 * Givebutter suggests loading the library on every page for cross-page
 * attribution. It is deliberately loaded only on this page instead: a
 * fundraising tracker has no business running on Get Help Now or the Learn
 * pages, and the attribution is not worth putting a third-party script in
 * front of someone in crisis.
 *
 * A visible fallback link renders underneath until the widget reports itself
 * loaded. Donations are the one thing on this page that has to work even if a
 * third-party script is blocked by an extension, a corporate network, or a
 * flaky connection.
 */
/** Givebutter account ID. Override per environment if it ever changes. */
const GIVEBUTTER_ACCOUNT =
  process.env.NEXT_PUBLIC_GIVEBUTTER_ACCOUNT ?? "lVfl7SiUpSqmhIvs";

export default function GivebutterWidget({
  widgetId,
  fallbackUrl,
  account = GIVEBUTTER_ACCOUNT,
}: {
  widgetId: string;
  fallbackUrl: string;
  account?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // The custom element upgrades once the loader runs; poll briefly rather
    // than trusting the script's own onLoad, which fires before definition.
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (window.customElements?.get("givebutter-widget")) {
        setLoaded(true);
        window.clearInterval(timer);
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <Script
        src={`https://widgets.givebutter.com/latest.umd.cjs?acct=${account}`}
        strategy="afterInteractive"
      />

      {/* No border, background or padding here: Givebutter's widget renders
          its own card, and wrapping it produced a second outer stroke with
          dead space beside the form. */}
      <GivebutterElement id={widgetId} />

      {!loaded && (
        <p className="mt-5 text-[15px] leading-relaxed text-ink-600">
          If the donation form does not appear,{" "}
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink-900 underline decoration-persimmon decoration-2 underline-offset-4 transition-colors hover:text-persimmon"
          >
            give directly on Givebutter
          </a>
          , or call {" "}
          <a
            href="tel:4345281041"
            className="font-semibold text-ink-900 underline decoration-persimmon decoration-2 underline-offset-4 transition-colors hover:text-persimmon"
          >
            (434) 528-1041
          </a>
          .
        </p>
      )}
    </div>
  );
}
