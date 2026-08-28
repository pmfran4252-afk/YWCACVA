import SafeLink from "@/components/ui/SafeLink";

import Logo from "@/components/ui/Logo";
import Reveal from "@/components/motion/Reveal";
import type { SiteSettings } from "@/content/types";

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Learn", href: "/learn" },
  { label: "Support Groups", href: "/support-groups" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Shop", href: "/shop" },
  { label: "News & Stories", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const PROGRAM_LINKS = [
  { label: "Domestic Violence Prevention", href: "/programs/domestic-violence-prevention" },
  { label: "Sexual Assault Response", href: "/programs/sexual-assault-response" },
  { label: "Court Advocacy", href: "/programs/court-advocacy" },
  { label: "Housing", href: "/programs/housing" },
  { label: "Visitation", href: "/programs/visitation" },
  { label: "Church Street Bridal", href: "/programs/church-bridal" },
];

const digits = (n: string) => n.replace(/[^\d]/g, "");

/** Each platform's own brand colour. Instagram has no single hex, so its
 *  official gradient is reproduced rather than flattened to one swatch. */
const SOCIAL_BRAND: Record<
  string,
  { className: string; style?: React.CSSProperties }
> = {
  Facebook: { className: "text-white", style: { backgroundColor: "#1877F2" } },
  Instagram: {
    className: "text-white",
    style: {
      background:
        "radial-gradient(circle at 30% 107%, #FDF497 0%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
    },
  },
  LinkedIn: { className: "text-white", style: { backgroundColor: "#0A66C2" } },
  X: { className: "text-white", style: { backgroundColor: "#000000" } },
  YouTube: { className: "text-white", style: { backgroundColor: "#FF0000" } },
  default: { className: "border border-white/15 text-white" },
};



export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-900 text-white">
      {/* Oversized wordmark, clipped at the baseline, the brand as architecture */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-b border-white/10 select-none"
      >
        <span className="block translate-y-[16%] text-center font-display text-[24vw] font-black leading-[0.75] tracking-[-0.06em] text-white/[0.055]">
          ywca
        </span>
      </div>

      <div className="container-page py-16 md:py-20">
        <Reveal stagger className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo tone="white" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-300">
              {settings.tagline} Serving Lynchburg and seven surrounding counties
              since {settings.foundedYear}.
            </p>

            <address className="mt-7 space-y-1.5 text-[15px] not-italic text-ink-300">
              <p>{settings.address.street}</p>
              <p>
                {settings.address.city}, {settings.address.state} {settings.address.zip}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${digits(settings.phone)}`}
                  className="transition-colors hover:text-persimmon"
                >
                  {settings.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors hover:text-persimmon"
                >
                  {settings.email}
                </a>
              </p>
            </address>

            <ul className="mt-7 flex gap-2.5">
              {settings.socials.map((s) => {
                const brand = SOCIAL_BRAND[s.platform] ?? SOCIAL_BRAND.default;
                return (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      style={brand.style}
                      className={`grid size-11 place-items-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 ${brand.className}`}
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Link columns */}
          <FooterColumn title="Quick Links" links={QUICK_LINKS} className="lg:col-span-2" />
          <FooterColumn title="Programs" links={PROGRAM_LINKS} className="lg:col-span-3" />

          {/* Crisis support, deliberately the most visually weighted block */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-persimmon/35 bg-persimmon/10 p-6">
              <h2 className="eyebrow flex items-center gap-2 text-persimmon">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-persimmon opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-persimmon" />
                </span>
                Crisis Support
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-300">
                If you are in danger, call 911. Our advocates answer every hour of
                every day.
              </p>

              <ul className="mt-5 space-y-2.5">
                {settings.hotlines.map((h) => (
                  <li key={h.number}>
                    <a
                      href={`tel:${digits(h.number)}`}
                      className="block rounded-xl bg-persimmon px-4 py-3 transition-colors hover:bg-persimmon-600"
                    >
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">
                        {h.label}
                      </span>
                      <span className="mt-0.5 block font-display text-lg font-black tabular-nums">
                        {h.number}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <SafeLink
                href="/get-help-now"
                className="mt-4 block text-center text-[13px] font-semibold text-white underline-offset-4 hover:underline"
              >
                See all ways to get help
              </SafeLink>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.organizationName}. All rights reserved. Founded{" "}
            {settings.foundedYear}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <SafeLink href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/terms" className="transition-colors hover:text-white">
                Terms of Use
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/accessibility" className="transition-colors hover:text-white">
                Accessibility
              </SafeLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Clears the fixed mobile safety dock */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-persimmon">{title}</h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <SafeLink
              href={l.href}
              className="group/f inline-flex text-[15px] text-ink-300 transition-colors hover:text-white"
            >
              <span className="bg-gradient-to-r from-persimmon to-persimmon bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-400 ease-[var(--ease-out-quart)] group-hover/f:bg-[length:100%_1px]">
                {l.label}
              </span>
            </SafeLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "X") {
    return (
      <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor" aria-hidden="true">
        <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.63-6.05L5.92 21H2.9l7.06-8.07L2.6 3h6.05l4.18 5.53L17.53 3Zm-1.06 16.2h1.67L7.6 4.72H5.81L16.47 19.2Z" />
      </svg>
    );
  }

  if (platform === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    );
  }

  const p =
    platform === "Facebook"
      ? "M13.5 8.5V7c0-.7.3-1 1-1H16V3.5h-2.2c-2.2 0-3.3 1.3-3.3 3.3v1.7H8.5V11h2v9.5h3V11h2.2l.3-2.5h-2.5Z"
      : platform === "Instagram"
        ? "M12 7.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm0 1.7A2.8 2.8 0 0 0 5.2 8v8A2.8 2.8 0 0 0 8 18.8h8a2.8 2.8 0 0 0 2.8-2.8V8A2.8 2.8 0 0 0 16 5.2H8Z"
        : "M7.2 20.5H4V9.3h3.2v11.2ZM5.6 7.9a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM20.5 20.5h-3.2v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6H10V9.3h3v1.5h.1a3.4 3.4 0 0 1 3-1.7c3.3 0 3.9 2.1 3.9 4.9v6.5Z";

  return (
    <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor" aria-hidden="true">
      <path d={p} />
    </svg>
  );
}
