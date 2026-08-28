import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";

import { BRAND_ICON_OPTIONS } from "./objects";

/**
 * The second hero on the home page, whatever YWCA is running this month.
 *
 * A singleton rather than a collection: there is only ever one current
 * campaign, and editors should be swapping its contents rather than
 * accumulating a list they have to remember to unpublish.
 */
export const monthlySpotlight = defineType({
  name: "monthlySpotlight",
  title: "Monthly Spotlight",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "active",
      title: "Show on the home page",
      type: "boolean",
      description: "Turn off between campaigns and the section disappears.",
      initialValue: true,
    }),
    defineField({
      name: "monthLabel",
      type: "string",
      description: 'Small label above the eyebrow, e.g. "This month at YWCA".',
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      description: 'e.g. "October: Domestic Violence Awareness Month".',
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 4 }),
    defineField({
      name: "accent",
      type: "string",
      options: {
        list: [
          { title: "Mahogany", value: "mahogany" },
          { title: "Persimmon", value: "persimmon" },
          { title: "Ink", value: "ink" },
          { title: "Teal", value: "teal" },
          { title: "Cyan", value: "cyan" },
          { title: "Gold", value: "gold" },
        ],
      },
      initialValue: "mahogany",
    }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: BRAND_ICON_OPTIONS },
    }),
    defineField({ name: "primaryCta", type: "cta" }),
    defineField({ name: "secondaryCta", type: "cta" }),
    defineField({
      name: "stats",
      type: "array",
      description: "Up to three supporting figures.",
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string" }),
            defineField({ name: "label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
  },
});
