"use client";

import SafeLink from "@/components/ui/SafeLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Logo from "@/components/ui/Logo";
import { gsap, useGSAP } from "@/lib/gsap";
import { navigation } from "@/lib/content";
import { useSurfaceTone } from "./useSurfaceTone";
import type { NavItem } from "@/content/types";

export type HeaderTone = "light" | "dark" | "overlay";

type Props = {
  tone?: HeaderTone;
  donateUrl: string;
};

export default function Header({ tone = "light", donateUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Close everything on navigation. Adjusting state during render (rather
  // than in an effect) avoids a frame where the menu is still open on the
  // new route. https://react.dev/learn/you-might-not-need-an-effect
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setOpenMenu(null);
  }

  // Lock body scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Once scrolled, the bar inverts against whatever it is sitting on: a white
     bar with black type over dark sections, a black bar with white type over
     light ones. Both the surface reading and the scrolled flag come from one
     throttled scroll read, so they can never disagree with each other. */
  const { tone: surface, scrolled } = useSurfaceTone(
    72,
    tone === "light" ? "light" : "dark",
  );
  const inverted = surface === "dark"; // dark surface -> light bar

  // At the very top the bar is transparent, so type follows the hero instead.
  const isDark = !scrolled && (tone === "dark" || tone === "overlay");

  return (
    <header
      ref={headerRef}
      className={[
        "fixed inset-x-0 z-90 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out-quart)]",
        "top-0 md:top-12",
        // At the very top the bar carries no background at all, so the hero
        // reads as one uninterrupted field. It only gains a surface once the
        // page is scrolled and the bar starts overlapping content.
        scrolled
          ? inverted
            ? "bg-paper/95 shadow-[0_1px_0_rgb(0_0_0/0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-paper/85"
            : "bg-ink-900/95 shadow-[0_1px_0_rgb(255_255_255/0.10)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink-900/85"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6 md:h-24">
        <Logo tone={scrolled ? (inverted ? "persimmon" : "white") : isDark ? "white" : "persimmon"} />

        {/* ---------- Desktop nav ---------- */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation
              .filter((item) => item.href !== "/shop")
              .map((item) => (
              <DesktopNavItem
                key={item.href}
                item={item}
                dark={scrolled ? !inverted : isDark}
                isOpen={openMenu === item.href}
                onOpen={() => setOpenMenu(item.href)}
                onClose={() => setOpenMenu(null)}
                active={pathname.startsWith(item.href)}
                />
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop shop entry: an icon rather than another word, kept next
              to Donate so the two "give something" actions sit together. */}
          <SafeLink
            href="/shop"
            aria-label="Shop"
            className={`hidden size-11 place-items-center rounded-full transition-colors lg:grid ${
              (scrolled ? !inverted : isDark)
                ? "text-white hover:bg-white/10"
                : "text-ink-900 hover:bg-ink-050"
            } ${pathname.startsWith("/shop") ? "text-persimmon" : ""}`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
              <path
                d="M6 8h12l-1 11.2a1.8 1.8 0 0 1-1.8 1.6H8.8A1.8 1.8 0 0 1 7 19.2L6 8Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M9.2 8V6.4a2.8 2.8 0 0 1 5.6 0V8"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </SafeLink>

          <SafeLink
            href={donateUrl}
            className="hidden h-12 items-center rounded-full bg-persimmon px-7 text-[16.5px] font-bold text-white transition-all duration-300 hover:bg-persimmon-600 hover:shadow-[0_10px_28px_-10px_rgba(250,70,22,0.8)] sm:inline-flex"
          >
            Donate
          </SafeLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid size-12 place-items-center rounded-full transition-colors lg:hidden ${
              (scrolled ? !inverted : isDark)
                ? "text-white hover:bg-white/10"
                : "text-ink-900 hover:bg-ink-050"
            }`}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <MobileMenu open={open} donateUrl={donateUrl} onClose={() => setOpen(false)} />
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopNavItem({
  item,
  dark,
  isOpen,
  onOpen,
  onClose,
  active,
}: {
  item: NavItem;
  dark: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  active: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panel.current) return;
      gsap.to(panel.current, {
        autoAlpha: isOpen ? 1 : 0,
        y: isOpen ? 0 : -8,
        duration: 0.32,
        ease: "power3.out",
      });
    },
    { dependencies: [isOpen] },
  );

  return (
    <li className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <SafeLink
        href={item.href}
        onFocus={onOpen}
        className={`relative flex h-11 items-center rounded-full px-4 text-[16.5px] font-bold transition-colors ${
          dark ? "text-white/85 hover:text-white" : "text-ink-700 hover:text-ink-900"
        }`}
      >
        {item.label}
        <span
          className={`absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-persimmon transition-transform duration-400 ease-[var(--ease-out-expo)] ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </SafeLink>

      {item.children && (
        <div
          ref={panel}
          className="invisible absolute left-0 top-full w-80 pt-3 opacity-0"
          onMouseLeave={onClose}
        >
          <div className="overflow-hidden rounded-2xl border border-ink-100 bg-paper p-2 shadow-[var(--shadow-lift)]">
            {item.children.map((child) => (
              <SafeLink
                key={child.href}
                href={child.href}
                className="group/link block rounded-xl px-4 py-3 transition-colors hover:bg-persimmon-050"
              >
                <span className="block text-[15px] font-semibold text-ink-900 transition-colors group-hover/link:text-persimmon">
                  {child.label}
                </span>
                {child.description && (
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink-500">
                    {child.description}
                  </span>
                )}
              </SafeLink>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

/* -------------------------------------------------------------------------- */

function MobileMenu({
  open,
  donateUrl,
  onClose,
}: {
  open: boolean;
  donateUrl: string;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (open) {
        gsap.set(el, { visibility: "visible" });
        gsap
          .timeline()
          .to(el, { autoAlpha: 1, duration: 0.25, ease: "power2.out" })
          .from(el.querySelectorAll("[data-menu-item]"), {
            y: 22,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.045,
            ease: "power3.out",
          }, "-=0.1");
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => gsap.set(el, { visibility: "hidden" }),
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div
      id="mobile-menu"
      ref={root}
      hidden={!open}
      className="invisible fixed inset-x-0 top-0 bottom-0 z-90 overflow-y-auto bg-paper opacity-0 lg:hidden"
    >
      {/* The panel covers the bar, so the hamburger's X goes with it. The menu
          carries its own close control. */}
      <div className="container-page flex h-20 items-center justify-between">
        <Logo tone="persimmon" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-12 place-items-center rounded-full text-ink-900 transition-colors hover:bg-ink-050"
        >
          <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page py-6 pb-40">
        <ul className="divide-y divide-ink-100">
          {navigation.map((item) => (
            <li key={item.href} data-menu-item className="py-1">
              <SafeLink
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between py-3.5 font-display text-xl font-bold text-ink-900"
              >
                {item.label}
                <ChevronIcon />
              </SafeLink>
              {item.children && (
                <ul className="pb-3 pl-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <SafeLink
                        href={child.href}
                        onClick={onClose}
                        className="block py-2 text-[15px] text-ink-600"
                      >
                        {child.label}
                      </SafeLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <SafeLink
          href={donateUrl}
          onClick={onClose}
          data-menu-item
          className="mt-8 flex h-14 items-center justify-center rounded-full bg-persimmon font-bold text-white"
        >
          Donate
        </SafeLink>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <path
        d={open ? "M6 6l12 12" : "M3.5 8h17"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <path
        d={open ? "M18 6L6 18" : "M3.5 16h17"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-ink-300" fill="none" aria-hidden="true">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
