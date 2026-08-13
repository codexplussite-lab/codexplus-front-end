import { defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
    },
    {
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    },
    {
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
    },
  ],
});
