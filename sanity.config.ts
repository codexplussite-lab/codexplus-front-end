import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { CogIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        `Copy .env.local.example to .env.local and set it, then restart the dev server.`,
    );
  }
  return value;
}

const projectId = requireEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);
const dataset = requireEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

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
