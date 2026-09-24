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
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description: "Default page title shown in search engine results and browser tabs.",
    },
    {
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      description: "Brief summary of the site for search engines.",
    },
    {
      name: "keywords",
      title: "Keywords (SEO)",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords associated with the site for SEO.",
    },
    {
      name: "ogImage",
      title: "OpenGraph / Social Share Image",
      type: "image",
      description: "Image shown when links are shared on social media (1200x630 recommended).",
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
    {
      name: "cardNavItems",
      title: "Header Navigation Cards",
      description: "Custom drop-down cards and links shown in the top navigation bar.",
      type: "array",
      of: [
        {
          type: "object",
          name: "cardNavItem",
          fields: [
            { name: "label", title: "Card Title", type: "string" },
            { name: "bgColor", title: "Background Color (Hex)", type: "string", description: "e.g. #1B1722" },
            { name: "textColor", title: "Text Color (Hex)", type: "string", description: "e.g. #ffffff" },
            {
              name: "links",
              title: "Sub Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Link Label", type: "string" },
                    { name: "href", title: "Link URL / Route", type: "string" },
                    { name: "ariaLabel", title: "Aria Label", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "aboutKicker",
      title: "About Section - Kicker",
      type: "string",
      description: "Small tag above About title, e.g. 'About the studio'.",
    },
    {
      name: "aboutTitle",
      title: "About Section - Title",
      type: "string",
      description: "Main title for About section, e.g. 'Where imagination meets engineering.'",
    },
    {
      name: "aboutDescription",
      title: "About Section - Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Paragraphs describing your studio in the About section.",
    },
    {
      name: "aboutBadge1Number",
      title: "About Section - Floating Badge 1 Number",
      type: "string",
      description: "e.g. '12+'",
    },
    {
      name: "aboutBadge1Label",
      title: "About Section - Floating Badge 1 Label",
      type: "string",
      description: "e.g. 'Years of craft'",
    },
    {
      name: "aboutBadge2Number",
      title: "About Section - Floating Badge 2 Number",
      type: "string",
      description: "e.g. '40k+'",
    },
    {
      name: "aboutBadge2Label",
      title: "About Section - Floating Badge 2 Label",
      type: "string",
      description: "e.g. 'creators shipped'",
    },
    {
      name: "ctaTagline",
      title: "CTA Banner - Tagline",
      type: "string",
      description: "e.g. 'Let\'s build something'",
    },
    {
      name: "ctaHeading",
      title: "CTA Banner - Heading",
      type: "string",
      description: "e.g. 'Have an idea worth building?'",
    },
    {
      name: "ctaDescription",
      title: "CTA Banner - Description",
      type: "text",
      rows: 3,
      description: "e.g. 'Tell us where you want to go. We\'ll bring the strategy, the craft and the code.'",
    },
    {
      name: "ctaBookingNotice",
      title: "CTA Banner - Booking Notice",
      type: "string",
      description: "e.g. 'Currently booking Q3 projects'",
    },
    {
      name: "ctaSecondaryLabel",
      title: "CTA Banner - Secondary Button Label",
      type: "string",
      description: "e.g. 'See the work'",
    },
    {
      name: "ctaSecondaryUrl",
      title: "CTA Banner - Secondary Button Link",
      type: "string",
      description: "e.g. '#work' or '/portfolio'",
    },
    {
      name: "contactFeatures",
      title: "Contact Section - Highlighted Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points shown under the contact form header (e.g. 'Personalized assistance', 'Timely response').",
    },
    {
      name: "copyrightText",
      title: "Footer Copyright Notice",
      type: "string",
      description: "e.g. 'All rights reserved.'",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
    },
  },
});
