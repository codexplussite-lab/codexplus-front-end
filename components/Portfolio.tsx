"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import MediaAsset from "@/components/MediaAsset";
import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

const categories = ["All", "Web Design", "E-Commerce", "Product Design", "Brand Identity", "Web App", "Mobile App"];

export default function Portfolio({
  heading = true,
  carousel = false,
}: {
  heading?: boolean;
  carousel?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

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

  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.querySelector<HTMLElement>("[data-slide]");
    if (!first) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const onTrackScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepWidth();
    if (!step) return;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex((prev) =>
      Math.min(Math.max(index, 0), filtered.length - 1) === prev
        ? prev
        : Math.min(Math.max(index, 0), filtered.length - 1),
    );
  }, [filtered.length, stepWidth]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const step = stepWidth();
      if (!step) return;
      track.scrollTo({
        left: index * step,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce, stepWidth],
  );

  const next = useCallback(
    () => goTo(Math.min(activeIndex + 1, filtered.length - 1)),
    [activeIndex, filtered.length, goTo],
  );

  const prev = useCallback(
    () => goTo(Math.max(activeIndex - 1, 0)),
    [activeIndex, goTo],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: 0, behavior: "auto" });
    setActiveIndex(0);
  }, [category, filtered.length]);

  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft > max) track.scrollLeft = max;
      setActiveIndex((prev) => Math.min(prev, filtered.length - 1));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [filtered.length]);

  const renderCard = (project: Project) => {
    const bg = project.backgroundMedia;
    const bgImage = bg?.image || project.coverImage || (project as any).image;
    const bgVideo = bg?.videoUrl || bg?.videoFileUrl || project.videoUrl || project.videoFileUrl;

    return (
      <motion.button
        key={project.id}
        type="button"
        layout={!carousel}
        onClick={() => setActive(project)}
        initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group relative h-full w-full overflow-hidden rounded-3xl border border-line text-left focus-visible:outline-accent",
          project.tall && !carousel && "lg:row-span-2"
        )}
        aria-label={`View project: ${project.title}`}
      >
        <div className="absolute inset-0">
          {bgImage || bgVideo ? (
            <MediaAsset
              image={bgImage}
              video={bgVideo}
              alt={bg?.imageAlt || project.title}
              className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <AbstractVisual
              palette={project.palette}
              variant={project.variant}
              className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
          )}
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/95 via-[#0b0f19]/40 to-transparent"
        />

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
    );
  };

  const slideWidthClass =
    "h-[420px] w-[85%] shrink-0 snap-center sm:w-[55%] md:w-[42%] lg:w-[34%] xl:w-[28%]";

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

        {carousel ? (
          <div className="mt-14">
            {!loading && filtered.length > 0 && (
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.2em] text-faint">
                  <span className="font-display text-sm text-ink">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  {" / "}
                  {String(filtered.length).padStart(2, "0")}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={activeIndex === 0}
                    aria-label="Previous projects"
                    className="grid size-11 place-items-center rounded-full border border-line bg-elevated text-ink transition-all duration-300 hover:border-accent/60 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={activeIndex >= filtered.length - 1}
                    aria-label="Next projects"
                    className="grid size-11 place-items-center rounded-full border border-line bg-elevated text-ink transition-all duration-300 hover:border-accent/60 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex gap-5 overflow-hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(slideWidthClass, "animate-pulse rounded-3xl border border-line bg-elevated")}
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="col-span-full py-20 text-center text-sm text-muted">
                No projects found in this category yet.
              </p>
            ) : (
              <>
                <motion.div
                  key={category}
                  ref={trackRef}
                  onScroll={onTrackScroll}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2"
                >
                  {filtered.map((project) => (
                    <div key={project.id} data-slide className={slideWidthClass}>
                      {renderCard(project)}
                    </div>
                  ))}
                </motion.div>

                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  {filtered.map((project, i) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}: ${project.title}`}
                      aria-current={i === activeIndex}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === activeIndex
                          ? "w-7 bg-accent-gradient"
                          : "w-2 bg-ink/20 hover:bg-ink/40"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
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
                {filtered.map((project) => renderCard(project))}
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}