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
      name: "image",
      title: "Image",
      type: "image",
      description: "Visual asset shown on the service card.",
      options: {
        hotspot: true,
      },
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "External video URL (e.g. Vimeo, YouTube or a hosted .mp4). Renders in the service media player and overrides the image when set.",
    },
    {
      name: "videoFile",
      title: "Video File",
      type: "file",
      description:
        "Upload a video file (MP4 / WebM). Renders in the service media player and overrides the image when set.",
      options: {
        accept: "video/*",
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
