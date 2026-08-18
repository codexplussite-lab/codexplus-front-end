import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error(
    'Missing required environment variable "NEXT_PUBLIC_SANITY_PROJECT_ID". ' +
      "Copy .env.local.example to .env.local and set it.",
  );
}
if (!dataset) {
  throw new Error(
    'Missing required environment variable "NEXT_PUBLIC_SANITY_DATASET". ' +
      "Copy .env.local.example to .env.local and set it.",
  );
}

export default defineCliConfig({
  api: { projectId, dataset },
});
