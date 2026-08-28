import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find YWCA Central Virginia in downtown Lynchburg, with directions, parking, and accessibility information.",
};

export default async function LocationsPage() {
  const settings = await getSiteSettings();
  const { street, city, state, zip } = settings.address;
  const query = encodeURIComponent(`${street}, ${city}, ${state} ${zip}`);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Locations"
        title="Find us in downtown Lynchburg."
        lead="Our main office and residence have been on Church Street for over a century."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        glyph="pin"
      />

      <Section tone="paper" id="main-office">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-2xl font-black text-ink-900">
              Main office &amp; residence
            </h2>

            <address className="mt-6 space-y-1 text-lg not-italic leading-relaxed text-ink-700">
              <p>{street}</p>
              <p>
                {city}, {state} {zip}
              </p>
            </address>

            <dl className="mt-8 space-y-5 border-t border-ink-200 pt-6">
              <div>
                <dt className="text-[14px] text-ink-500">Office hours</dt>
                <dd className="mt-1 text-[17px] text-ink-800">
                  Monday to Friday, business hours
                </dd>
              </div>
              <div>
                <dt className="text-[14px] text-ink-500">Crisis line</dt>
                <dd className="mt-1 text-[17px] text-ink-800">
                  Answered 24 hours a day, every day of the year
                </dd>
              </div>
            </dl>

            <p className="mt-8 max-w-[54ch] rounded-2xl bg-bone px-6 py-5 text-[15px] leading-relaxed text-ink-600">
              Shelter locations are confidential and are never published. If you
              need shelter, call the hotline and an advocate will arrange it
              with you directly.
            </p>

            <div className="mt-8">
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                variant="primary"
              >
                Get directions
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-ink-200">
              <iframe
                title={`Map showing ${street}, ${city}, ${state}`}
                src={`https://www.google.com/maps?q=${query}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-[26rem] w-full lg:h-[32rem]"
              />
            </div>
            <p className="mt-4 text-[14px] text-ink-500">
              Address and public location details are pending final confirmation
              by YWCA staff.
            </p>
          </Reveal>
        </div>
      </Section>
    </SiteShell>
  );
}
