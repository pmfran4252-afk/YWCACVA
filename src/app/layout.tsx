import type { Metadata, Viewport } from "next";
import { Figtree, Source_Sans_3 } from "next/font/google";

import SafetyDock from "@/components/safety/SafetyDock";
import HydrationMark from "@/components/safety/HydrationMark";
import BackToTop from "@/components/chrome/BackToTop";
import { CartProvider } from "@/components/shop/CartProvider";
import CartDrawer from "@/components/shop/CartDrawer";
import CartButton from "@/components/shop/CartButton";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

/* Brand book specifies Avenir Next LT Pro Heavy for display and Source Sans
   Pro for text. Source Sans 3 is that exact family; Figtree is the closest
   freely-licensable stand-in for Avenir Next. */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ywcacva.org"),
  title: {
    default: "YWCA Central Virginia: Eliminating racism, empowering women",
    template: "%s | YWCA Central Virginia",
  },
  description:
    "YWCA Central Virginia provides 24/7 crisis support, emergency shelter, sexual assault response, court advocacy, and affordable housing across Lynchburg and seven surrounding counties. Serving the community since 1912.",
  openGraph: {
    type: "website",
    siteName: "YWCA Central Virginia",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
  // Outbound clicks should not tell the destination which YWCA page someone
  // was reading, a referrer header is a small but real leak for a survivor
  // moving between this site and another resource.
  referrer: "no-referrer",
};

export const viewport: Viewport = {
  themeColor: "#FA4616",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* Runs before first paint. Content is visible by default in CSS and only
   hidden once this class is present, so a JS failure, a slow bundle, or a
   reduced-motion preference can never leave the page blank. */
const MOTION_BOOTSTRAP = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion-ready")}}catch(e){}`;

/**
 * Closes the pre-hydration gap in history containment.
 *
 * Until React hydrates, every <Link> is just an <a>, so a click during that
 * window is a plain browser navigation, which PUSHES a history entry and
 * leaves a page behind for the Back button to find after Quick Exit. This
 * capture-phase listener runs before paint and replaces instead, then steps
 * aside once the app marks itself hydrated.
 *
 * Deliberately skips modified clicks, new-tab targets, downloads, hash links
 * and anything cross-origin, so normal browsing behavior is untouched.
 */
const EARLY_NAV_GUARD = `
try{
  document.addEventListener("click",function(e){
    if(window.__ywcaHydrated) return;
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
    var a=e.target&&e.target.closest?e.target.closest("a"):null;
    if(!a||!a.href) return;
    if(a.target&&a.target!=="_self") return;
    if(a.hasAttribute("download")) return;
    var u;try{u=new URL(a.href)}catch(err){return}
    if(u.origin!==location.origin) return;
    if(u.pathname===location.pathname&&u.hash) return;
    e.preventDefault();
    location.replace(a.href);
  },true);
}catch(e){}`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      // The pre-paint script below adds a class to <html>, which React would
      // otherwise report as a hydration mismatch on every load.
      suppressHydrationWarning
      className={`${figtree.variable} ${sourceSans.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
        <script dangerouslySetInnerHTML={{ __html: EARLY_NAV_GUARD }} />
      </head>
      <body className="bg-paper">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Tells the early-nav guard above to stand down. */}
        <HydrationMark />

        {/* Fixed, and outside the smooth-scroll transform. */}
        <SafetyDock
          hotlines={settings.hotlines}
          quickEscapeUrl={settings.quickEscapeUrl}
        />

        <CartProvider>
          {children}

          {/* All fixed, so they live outside the smooth-scroll transform. */}
          <CartButton />
          <CartDrawer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
