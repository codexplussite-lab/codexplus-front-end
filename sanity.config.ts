import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { CogIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "vo41nmw5";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);

export default defineConfig({
  name: "default",
  title: "CodeXplus Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
