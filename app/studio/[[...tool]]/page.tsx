"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Suppress harmless React 19 / Sanity UI DOM prop warnings in dev mode
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("disableTransition") ||
        args[0].includes("React does not recognize the"))
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export const dynamic = "force-static";

export default function StudioPage() {
  return (
    <div id="studio-root">
      <NextStudio config={config} />
    </div>
  );
}
