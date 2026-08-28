import { HomeIcon } from "@sanity/icons/Home";
import { RocketIcon } from "@sanity/icons/Rocket";
import { TrendUpwardIcon } from "@sanity/icons/TrendUpward";
import { defineArrayMember, defineField, defineType } from "sanity";

/* The support finder on the homepage. Each pathway is a plain-language
   self-identification, routed to the right program. */
export const pathway = defineType({
  name: "pathway",
  title: "Support Pathway",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      description: 'Written in the visitor’s own voice, e.g. "I’m not safe at home."',
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "urgency",
      type: "string",
      options: {
        list: [
          { title: "Immediate danger", value: "immediate" },
          { title: "Needs support", value: "support" },
          { title: "Looking for information", value: "info" },
          { title: "Wants to help", value: "help" },
        ],
      },
      initialValue: "support",
    }),
    defineField({
      name: "destination",
      type: "cta",
      description: "Where this pathway sends the visitor.",
    }),
    defineField({
      name: "relatedPrograms",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "program" }] })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "label", subtitle: "urgency" } },
});

export const impactStat = defineType({
  name: "impactStat",
  title: "Impact Statistic",
  type: "document",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "value",
      type: "number",
      description: "Numeric value, used to animate the counter.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "prefix", type: "string", description: "e.g. $" }),
    defineField({ name: "suffix", type: "string", description: "e.g. + or %" }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      type: "string",
      description: "Line icon shown beside the figure.",
      options: {
        list: [
          "phone", "chat", "shield", "home", "scales", "users", "heart",
          "calendar", "clock", "pin", "book", "alert", "lock", "mail", "key",
          "handshake", "gift", "spark", "ear", "route", "dress",
        ],
      },
    }),
    defineField({
      name: "context",
      type: "string",
      description: "Timeframe or source, e.g. “in 2025”. Use verified numbers only.",
    }),
    defineField({ name: "relatedProgram", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "label", subtitle: "context" } },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      type: "string",
      group: "hero",
      description: "Small label above the headline.",
    }),
    defineField({
      name: "heroHeadline",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroSubhead", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", type: "figure", group: "hero" }),
    defineField({ name: "primaryCta", type: "cta", group: "hero" }),
    defineField({ name: "secondaryCta", type: "cta", group: "hero" }),

    defineField({ name: "missionHeadline", type: "string", group: "sections" }),
    defineField({ name: "missionBody", type: "text", rows: 5, group: "sections" }),

    defineField({ name: "finderHeadline", type: "string", group: "sections" }),
    defineField({ name: "finderBody", type: "text", rows: 3, group: "sections" }),

    defineField({ name: "programsHeadline", type: "string", group: "sections" }),
    defineField({ name: "impactHeadline", type: "string", group: "sections" }),
    defineField({ name: "storiesHeadline", type: "string", group: "sections" }),

    defineField({ name: "ctaHeadline", type: "string", group: "sections" }),
    defineField({ name: "ctaBody", type: "text", rows: 3, group: "sections" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
