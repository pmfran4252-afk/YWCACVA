import type { ReactNode } from "react";

import Header, { type HeaderTone } from "./Header";
import Footer from "./Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import type { SiteSettings } from "@/content/types";

type Props = {
  settings: SiteSettings;
  headerTone?: HeaderTone;
  children: ReactNode;
};

/**
 * Page frame. The header sits outside the ScrollSmoother content wrapper
 * because that wrapper is transformed, and a transformed ancestor breaks
 * `position: fixed` for everything inside it.
 */
export default function SiteShell({ settings, headerTone = "light", children }: Props) {
  return (
    <>
      <Header tone={headerTone} donateUrl={settings.donateUrl} />
      <SmoothScroll>
        <main id="main">{children}</main>
        <Footer settings={settings} />
      </SmoothScroll>
    </>
  );
}
