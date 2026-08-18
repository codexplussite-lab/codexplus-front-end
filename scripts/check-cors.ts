import { config } from "dotenv";

config();
config({ path: ".env.local", override: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Add it to .env.local — see .env.local.example",
  );
}
if (!dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_DATASET is missing. Add it to .env.local — see .env.local.example",
  );
}
if (!token) {
  throw new Error(
    "SANITY_API_TOKEN is missing. Add it to .env.local — see .env.local.example",
  );
}

const expectedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

interface CorsOrigin {
  origin: string;
  allowCredentials: boolean;
  deleted?: boolean;
}

async function main() {
  const res = await fetch(
    `https://api.sanity.io/v1/projects/${projectId}/cors`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to list CORS origins for project "${projectId}" (${res.status} ${res.statusText}). ` +
        "SANITY_API_TOKEN must be a project token with admin access.",
    );
  }

  const origins = (await res.json()) as CorsOrigin[];
  const allowed = new Set(
    origins
      .filter((entry) => !entry.deleted)
      .map((entry) => entry.origin.replace(/\/$/, "")),
  );

  const missing = expectedOrigins.filter((origin) => !allowed.has(origin));

  if (missing.length > 0) {
    console.error(
      `CORS check FAILED for project "${projectId}" (dataset "${dataset}"):`,
    );
    for (const origin of missing) {
      console.error(`  - ${origin} is NOT allowlisted`);
    }
    console.error(
      "Fix: manage.sanity.io -> API -> CORS origins -> Add origin, then re-run `npm run check:cors`.",
    );
    process.exit(1);
  }

  console.log(
    `CORS OK: all expected origins are allowlisted for project "${projectId}" (dataset "${dataset}"):`,
  );
  for (const origin of expectedOrigins) {
    console.log(`  - ${origin}`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
