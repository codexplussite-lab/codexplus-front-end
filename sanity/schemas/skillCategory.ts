import { defineType } from "sanity";

export default defineType({
  name: "skillCategory",
  title: "Tech Stack & Skills Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
      description: "e.g. 'Frontend Engineering', 'Backend & CMS', 'UI/UX & Product Design'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Name of the icon to display: Code2, Database, Palette, Zap, Globe, Cpu, Terminal, Sparkles, Workflow, Layers",
      initialValue: "Code2",
    },
    {
      name: "skills",
      title: "Skills & Technologies",
      type: "array",
      of: [{ type: "string" }],
      description: "List of technologies/skills in this category (e.g. 'React.js', 'Next.js 15', 'TypeScript')",
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
    },
  },
});
