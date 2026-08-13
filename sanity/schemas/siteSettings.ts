import { defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Site Logo",
      type: "image",
      description: "Upload the site logo.",
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
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Upload a square favicon (512x512 or larger recommended).",
      options: {
        hotspot: true,
      },
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    },
    {
      name: "phoneIntl",
      title: "Phone Numbers (International)",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "locations",
      title: "Locations",
      type: "array",
      of: [
        {
          type: "object",
          name: "location",
          fields: [
            { name: "city", title: "City", type: "string" },
            { name: "country", title: "Country", type: "string" },
            { name: "region", title: "Region", type: "string" },
            { name: "address", title: "Address", type: "text", rows: 2 },
            { name: "phone", title: "Phone", type: "string" },
            {
              name: "contactType",
              title: "Contact Type",
              type: "string",
              options: {
                list: [
                  { title: "Phone", value: "phone" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              initialValue: "phone",
            },
          ],
          preview: {
            select: {
              title: "city",
              subtitle: "region",
            },
          },
        },
      ],
    },
    {
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    },
    {
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "url" },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    },
    {
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            { name: "value", title: "Value", type: "number" },
            { name: "suffix", title: "Suffix", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    },
    {
      name: "clients",
      title: "Clients (logo marquee)",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "highlights",
      title: "Highlights (About section)",
      type: "array",
      description: "Short bullet points shown in the About section.",
      of: [{ type: "string" }],
    },
    {
      name: "usefulLinks",
      title: "Useful Links (footer)",
      type: "array",
      of: [
        {
          type: "object",
          name: "usefulLink",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
    },
  },
});
