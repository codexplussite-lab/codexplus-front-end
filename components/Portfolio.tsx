"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

const categories = ["All", "Web Design", "E-Commerce", "Product Design", "Brand Identity", "Web App", "Mobile App"];

function ProjectModal({
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
        <div className="relative aspect-[16/9] overflow-hidden">
          <AbstractVisual palette={project.palette} variant={project.variant} />
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
              { label: "Disciplines", value: project.services.join(" · ") },
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
            {project.description.map((para) => (
              <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
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

export default function Portfolio({
  heading = true,
}: {
  heading?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data: Project[]) => {
        if (!cancelled) setProjects(data as unknown as Project[]);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  const close = useCallback(() => setActive(null), []);

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={cn(
            "flex flex-col gap-8",
            heading ? "lg:flex-row lg:items-end lg:justify-between" : "lg:items-end"
          )}
        >
          {heading && (
            <SectionHeading
              kicker="Selected work"
              title={
                <>
                  Featured
                  <br />
                  <span className="text-outline-accent">projects.</span>
                </>
              }
              className="mb-0"
            />
          )}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
                    category === cat
                      ? "border-transparent bg-accent-gradient text-white"
                      : "border-line bg-elevated text-muted hover:border-ink/30 hover:text-ink"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-14 grid auto-rows-[300px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-line bg-elevated"
              />
            ))
          ) : filtered.length === 0 ? (
            <p className="col-span-full py-20 text-center text-sm text-muted">
              No projects found in this category yet.
            </p>
          ) : (
            <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                key={project.id}
                type="button"
                layout
                onClick={() => setActive(project)}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-line text-left focus-visible:outline-accent",
                  project.tall && "lg:row-span-2"
                )}
                aria-label={`View project: ${project.title}`}
              >
                <div className="absolute inset-0">
                  <AbstractVisual
                    palette={project.palette}
                    variant={project.variant}
                    className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>

                <span className="pointer-events-none absolute right-5 top-5 grid size-11 translate-y-2 place-items-center rounded-full bg-accent text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="size-5" />
                </span>

                <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/85 backdrop-blur">
                  {project.category}
                </span>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <span className="block font-display text-xs uppercase tracking-[0.2em] text-accent/90">
                    {project.client}
                  </span>
                  <span className="mt-1 block font-display text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-[1.6rem]">
                    {project.title}
                  </span>
                  <span className="mt-2 block max-w-sm text-sm text-white/55 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {project.summary}
                  </span>
                </span>
              </motion.button>
            ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
