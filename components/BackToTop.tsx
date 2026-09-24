"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <div className="absolute bottom-12 right-6 hidden items-center gap-3 md:flex">
      <span className="text-[12px] font-medium uppercase tracking-[0.25em] text-white [writing-mode:vertical-rl]">
        Back to top
      </span>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-accent-gradient hover:text-white"
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  );
}
