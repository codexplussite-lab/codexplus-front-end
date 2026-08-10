import { defineType } from "sanity";

export default defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      rows: 4,
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
});
