"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eye, Github } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import MediaAsset from "@/components/MediaAsset";
import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Web Design",
  "E-Commerce",
  "Product Design",
  "Brand Identity",
  "Web App",
  "Mobile App",
];

const projectSlug = (project: Project) =>
  project.title.toLowerCase().replace(/\s+/g, "-");

export default function WorkSection() {
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

  const renderCard = (project: Project, index: number) => {
    const bg = project.backgroundMedia;
    const bgImage = bg?.image || project.coverImage || (project as any).image;
    const bgVideo =
      bg?.videoUrl || bg?.videoFileUrl || project.videoUrl || project.videoFileUrl;

    return (
      <motion.article
        key={
          project.id ||
          (project as any)._id ||
          (project as any).slug ||
          index
        }
        layout
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_rgba(116,55,255,0.3)]"
      >
        <Link
          href={`/portfolio/${projectSlug(project)}`}
          aria-label={`View project: ${project.title}`}
          className="block"
        >
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
            {bgImage || bgVideo ? (
              <MediaAsset
                image={bgImage}
                video={bgVideo}
                alt={bg?.imageAlt || project.title}
                className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
            ) : (
              <AbstractVisual
                palette={project.palette}
                variant={project.variant}
                className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
            )}
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur">
              {project.category}
            </span>
          </div>

          <div className="p-6">
            <h3 className="font-display text-[1.35rem] font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {(project.services ?? []).slice(0, 3).map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="rounded-full border border-line bg-elevated/70 px-3 py-1 text-[11px] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>
        </Link>

        <div className="mt-auto flex gap-3 px-6 pb-6">
          <button
            type="button"
            data-hover
            onClick={() => setActive(project)}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-[#0b0f19] transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(238,241,251,0.2)]"
          >
            <Eye className="size-4" />
            Preview
          </button>
          <a
            href={project.repoUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-ink transition-all duration-300 hover:border-accent/50 hover:text-accent"
          >
            <Github className="size-4" />
            Github repo
          </a>
        </div>
      </motion.article>
    );
  };

  return (
    <section id="work" className="relative border-y border-line bg-panel/50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Centered heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-8 bg-accent" />
              My portfolio
              <span className="inline-block h-px w-8 bg-accent" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-5xl font-medium tracking-tight md:text-7xl">
              Work<span className="text-outline-accent">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
              Check my commercial and non commercial projects — from marketing
              sites to full-stack platforms.
            </p>
          </Reveal>
        </div>

        {/* Filter pills */}
        <Reveal delay={0.22}>
          <div className="scrollbar-hide mt-12 flex gap-2 overflow-x-auto pb-2 md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2 text-[13px] font-medium transition-all duration-300",
                  category === cat
                    ? "border-ink bg-ink text-[#0b0f19]"
                    : "border-line bg-elevated text-muted hover:border-ink/30 hover:text-ink"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project grid */}
        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl border border-line bg-elevated"
                  style={{ aspectRatio: "16 / 10" }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted">
              No projects found in this category yet.
            </p>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => renderCard(project, index))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}