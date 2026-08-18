import { defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
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
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Web Design",
          "E-Commerce",
          "Product Design",
          "Brand Identity",
          "Web App",
          "Mobile App",
        ],
        layout: "dropdown",
      },
    },
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "backgroundMedia",
      title: "Background Media",
      type: "mediaAsset",
      description:
        "Full-card background image or video shown on the portfolio grid. Video overrides image when both are set.",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "External video URL (e.g. Vimeo, YouTube or a hosted .mp4). Renders in the project media player and overrides the cover image when set.",
    },
    {
      name: "videoFile",
      title: "Video File",
      type: "file",
      description:
        "Upload a video file (MP4 / WebM). Renders in the project media player and overrides the cover image when set.",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "palette",
      title: "Palette",
      type: "array",
      description: "Three hex colors used by the project card.",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(3),
    },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: ["blobs", "rings", "grid", "waves", "prism", "orbits"],
        layout: "radio",
      },
    },
    {
      name: "tall",
      title: "Tall",
      type: "boolean",
      description: "Renders the card as a tall tile.",
      initialValue: false,
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
