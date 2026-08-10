import { defineType } from "sanity";

export default defineType({
  name: "owner",
  title: "Owner",
  type: "document",
  fields: [
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
      description: "e.g. \"Founder & Creative Director\".",
    },
    {
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      description: "One or two sentences shown next to the profile image.",
    },
    {
      name: "description",
      title: "Detailed Description",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Longer story paragraphs for the team page.",
    },
    {
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
