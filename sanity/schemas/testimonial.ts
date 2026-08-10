import { defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "initials",
      title: "Initials",
      type: "string",
      description: "Avatar initials, e.g. \"EV\".",
    },
    {
      name: "accent",
      title: "Accent",
      type: "string",
      description: "Hex color used for the avatar.",
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
});
