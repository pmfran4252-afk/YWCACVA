import { HeartIcon } from "@sanity/icons/Heart";
import { defineArrayMember, defineField, defineType } from "sanity";

import { BRAND_ICON_OPTIONS } from "./objects";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "impact", title: "Impact" },
    { name: "access", title: "Access & Eligibility" },
    { name: "presentation", title: "Presentation" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortName",
      type: "string",
      group: "content",
      description: "Compact label for cards and nav, e.g. “SARP”.",
    }),
    defineField({
      name: "category",
      type: "string",
      group: "content",
      options: {
        list: [
          "Survivor Services",
          "Advocacy Services",
          "Housing Services",
          "Family Services",
          "Support Services",
          "Community / Fundraising",
        ],
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences. Used on cards and the programs directory.",
      validation: (r) => r.required().max(320),
    }),
    defineField({ name: "body", type: "richText", group: "content" }),
    defineField({
      name: "whatWeDo",
      title: "What We Do",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "servesWho",
      title: "Who It Serves",
      type: "string",
      group: "access",
    }),
    defineField({
      name: "impactHighlights",
      title: "Impact Highlights",
      type: "array",
      group: "impact",
      description: "Use verified numbers only.",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. 4,282" }),
            defineField({ name: "label", type: "string", description: "e.g. nights of shelter provided" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "eligibility",
      type: "array",
      group: "access",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "howToAccess",
      title: "How to Access Services",
      type: "richText",
      group: "access",
    }),
    defineField({ name: "image", type: "figure", group: "presentation" }),
    defineField({
      name: "accent",
      title: "Card accent",
      type: "string",
      group: "presentation",
      description: "Drives the color block behind this program on the homepage grid.",
      options: {
        list: [
          { title: "Persimmon", value: "persimmon" },
          { title: "Ink (black)", value: "ink" },
          { title: "Cyan", value: "cyan" },
          { title: "Gold", value: "gold" },
          { title: "Teal", value: "teal" },
          { title: "Mahogany", value: "mahogany" },
        ],
      },
      initialValue: "persimmon",
    }),
    defineField({
      name: "icon",
      title: "Card icon",
      type: "string",
      group: "presentation",
      description: "Watermark mark shown behind this program's card.",
      options: { list: BRAND_ICON_OPTIONS },
    }),
    defineField({
      name: "featuredOnHome",
      type: "boolean",
      group: "presentation",
      initialValue: true,
    }),
    defineField({
      name: "order",
      type: "number",
      group: "presentation",
      description: "Lower numbers appear first.",
    }),
    defineField({
      name: "primaryCta",
      type: "cta",
      group: "presentation",
    }),
  ],
  orderings: [
    { name: "manual", title: "Display order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
