import { defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date / Subtitle",
      type: "string",
      description: "e.g. 'Jan 20, 2027' or designation",
    },
    {
      name: "role",
      title: "Designation / Role (Optional Fallback)",
      type: "string",
    },
    {
      name: "review",
      title: "Review / Feedback",
      type: "text",
      rows: 4,
      description: "Client feedback or testimonial statement.",
    },
    {
      name: "quote",
      title: "Quote (Alternative)",
      type: "text",
      rows: 3,
      description: "Optional fallback for quote if review is empty.",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rating score, e.g. 4.9 or 5.0",
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 4.9,
    },
    {
      name: "clientImage",
      title: "Client Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "date",
      media: "clientImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Unnamed Testimonial",
        subtitle: subtitle || "Client",
        media,
      };
    },
  },
});
