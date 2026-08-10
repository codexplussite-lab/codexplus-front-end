import { defineType } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Subscriber",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "email",
    },
  },
});
