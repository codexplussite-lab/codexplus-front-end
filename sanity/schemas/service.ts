import { defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "index",
      title: "Index",
      type: "string",
      description: "Display index shown next to the title, e.g. \"01\".",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Palette", value: "palette" },
          { title: "Code", value: "code" },
          { title: "Megaphone", value: "megaphone" },
          { title: "Lightbulb", value: "lightbulb" },
        ],
        layout: "radio",
      },
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "index",
    },
  },
});
