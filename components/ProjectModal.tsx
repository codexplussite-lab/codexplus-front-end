"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import MediaAsset from "@/components/MediaAsset";
import type { Project } from "@/data/content";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const bg = project.backgroundMedia;
  const mediaVideo =
    bg?.videoUrl || bg?.videoFileUrl || project.videoUrl || project.videoFileUrl;
  const mediaImage = bg?.image || project.coverImage || (project as any).image;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-panel sm:rounded-3xl"
        initial={{ y: reduce ? 0 : 60, opacity: 0, scale: reduce ? 1 : 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: reduce ? 0 : 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-elevated">
          {mediaImage || mediaVideo ? (
            <MediaAsset
              image={mediaImage}
              video={mediaVideo}
              alt={project.title}
              controls
            />
          ) : (
            <AbstractVisual palette={project.palette} variant={project.variant} />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/85 via-transparent to-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:bg-accent hover:text-white"
          >
            <X className="size-5" />
          </button>
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur">
            {project.category} · {project.year}
          </span>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">
            {project.client}
          </p>
          <h3 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Disciplines", value: (project.services ?? []).join(" · ") },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-line bg-elevated p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-faint">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-ink">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {(project.description ?? []).map((para) => (
              <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex flex-wrap gap-2">
              {(project.services ?? []).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_30px_rgba(116,55,255,0.45)]"
            >
              Start something similar
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}