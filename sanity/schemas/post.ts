import { defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Design", "Engineering", "Motion", "Strategy", "Opinion"],
        layout: "dropdown",
      },
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      description: "Display date, e.g. \"Jun 18, 2026\".",
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. \"8 min read\".",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Display name of the author or team member.",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Featured hero image shown at the top of the article.",
      options: {
        hotspot: true,
      },
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "Optional external video URL (e.g. hosted .mp4). Renders as the hero background and overrides the cover image.",
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
    },
    {
      name: "accent",
      title: "Accent",
      type: "string",
      description: "Hex color used for the card accent.",
    },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: ["blobs", "rings", "grid"],
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
      subtitle: "category",
    },
  },
});
