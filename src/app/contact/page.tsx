import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import ContactForm from "@/components/page/ContactForm";
import LinkCards from "@/components/page/LinkCards";
import Accordion from "@/components/page/Accordion";
import SupportReminder from "@/components/page/SupportReminder";
import Reveal from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/content";
import { faqs } from "@/content/pages";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send YWCA Central Virginia a message, or find our crisis hotlines, direct contact details, and location in downtown Lynchburg.",
};

const digits = (n: string) => n.replace(/[^\d]/g, "");

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Contact"
        title="Reaching the right person."
        lead="If you need help now, use a hotline. For anything else, send a message below and we will reply to whichever contact method you tell us is safe."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Get Help Now", href: "/get-help-now" }}
        glyph="mail"
      />

      {/* The form is the page. Making someone in distress pick a category
          before they can type anything was a step too many. */}
      <Section tone="paper" id="form">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <Reveal className="lg:col-span-5">
            <div className="rounded-3xl bg-bone p-8">
              <h2 className="eyebrow text-persimmon">Direct contact</h2>

              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-[14px] text-ink-500">Main office</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${digits(settings.phone)}`}
                      className="font-display text-xl font-black text-ink-900 transition-colors hover:text-persimmon"
                    >
                      {settings.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-[14px] text-ink-500">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-[17px] font-semibold text-ink-900 transition-colors hover:text-persimmon"
                    >
                      {settings.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-[14px] text-ink-500">Address</dt>
                  <dd className="mt-1 text-[17px] leading-relaxed text-ink-700">
                    {settings.address.street}
                    <br />
                    {settings.address.city}, {settings.address.state}{" "}
                    {settings.address.zip}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-ink-200 pt-6">
                <h3 className="eyebrow text-persimmon">Crisis lines</h3>
                <ul className="mt-4 space-y-3">
                  {settings.hotlines.map((h) => (
                    <li key={h.number}>
                      <a
                        href={`tel:${digits(h.number)}`}
                        className="block rounded-xl bg-persimmon px-5 py-3.5 text-white transition-colors hover:bg-persimmon-600"
                      >
                        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/85">
                          {h.label}
                        </span>
                        <span className="mt-0.5 block font-display text-lg font-black tabular-nums">
                          {h.number}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="Other ways to reach us"
        title="If a message is not the right fit"
        tone="bone"
        id="options"
      >
        <LinkCards
          columns={2}
          cards={[
            {
              title: "Get help now",
              description:
                "24/7 crisis hotlines, emergency options, and how to reach an advocate immediately.",
              href: "/get-help-now",
              meta: "Urgent",
              icon: "phone",
            },
            {
              title: "Locations",
              description:
                "Where to find us in downtown Lynchburg, with directions and hours.",
              href: "/contact/locations",
              icon: "pin",
            },
          ]}
        />
      </Section>

      <Section eyebrow="FAQ" title="Questions we are asked most" tone="paper" id="faq">
        <Reveal>
          <Accordion items={faqs.map((f) => ({ title: f.question, body: f.answer }))} />
        </Reveal>
      </Section>

      <SupportReminder settings={settings} tone="bone" />
    </SiteShell>
  );
}
