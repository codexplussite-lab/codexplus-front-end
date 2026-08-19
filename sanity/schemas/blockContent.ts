import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional caption rendered under the image.",
        },
      ],
    }),
    defineArrayMember({
      title: "Code Block",
      name: "codeBlock",
      type: "object",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              "javascript",
              "typescript",
              "tsx",
              "jsx",
              "css",
              "html",
              "bash",
              "json",
              "sql",
              "graphql",
              "plaintext",
            ],
            layout: "dropdown",
          },
          initialValue: "typescript",
        },
        {
          name: "code",
          title: "Code",
          type: "text",
          rows: 12,
        },
      ],
      preview: {
        select: {
          language: "language",
          code: "code",
        },
        prepare({ language, code }) {
          return {
            title: `Code — ${language ?? "plaintext"}`,
            subtitle: code?.split("\n").slice(0, 2).join(" ").slice(0, 80),
          };
        },
      },
    }),
  ],
});
