"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import IridescentWaves from "@/components/IridescentWaves";
import { brand } from "@/data/content";

const SLIDE_DURATION = 5200;

const fallbackSlides = [
  {
    id: "fashion",
    tag: "E-Commerce · 2026",
    title: "Vanta Commerce",
    note: "Headless fashion storefront — 190ms load, +38% conversion.",
    palette: ["#0b0f19", "#7437ff", "#1e2537"] as [string, string, string],
    variant: "grid" as const,
  },
  {
    id: "interiors",
    tag: "Web Design · 2026",
    title: "Maison Noor",
    note: "A gallery-like flagship for a sculptural interior studio.",
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"] as [string, string, string],
    variant: "prism" as const,
  },
  {
    id: "analytics",
    tag: "SaaS · 2025",
    title: "Pulse Analytics",
    note: "Real-time dashboards calm enough to live in all day.",
    palette: ["#0b0f19", "#7437ff", "#9a66ff"] as [string, string, string],
    variant: "blobs" as const,
  },
  {
    id: "health",
    tag: "Mobile App · 2023",
    title: "Aurora Health",
    note: "A sleep & recovery companion designed around gentleness.",
    palette: ["#0b0f19", "#9a66ff", "#7437ff"] as [string, string, string],
    variant: "rings" as const,
  },
];

type HeroSlide = (typeof fallbackSlides)[number];

type ProjectRow = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  palette: string[];
  variant: string;
};

function toSlide(p: ProjectRow): HeroSlide {
  return {
    id: p.id,
    tag: [p.category, p.year].filter(Boolean).join(" · ") || "Selected work",
    title: p.title,
    note: p.summary,
    palette: [...(p.palette ?? []), "#0b0f19", "#7437ff"].slice(0, 3) as [
      string,
      string,
      string,
    ],
    variant: p.variant as HeroSlide["variant"],
  };
}

export default function Hero({ heroTitle, heroSubtitle }: { heroTitle?: string; heroSubtitle?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState<HeroSlide[]>(fallbackSlides);
  const [studioName, setStudioName] = useState(brand.name);
  const [locations, setLocations] = useState(brand.locations);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = slides[index % slides.length];

  useEffect(() => {
    let active = true;
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data: ProjectRow[]) => {
        if (!active) return;
        const mapped = (data ?? []).map(toSlide);
        if (mapped.length > 0) setSlides(mapped);
      })
      .catch(() => {
        /* fall back to static slides */
      });

    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then((data: { siteName?: string; locations?: typeof brand.locations }) => {
        if (!active) return;
        if (data.siteName) setStudioName(data.siteName);
        if (Array.isArray(data.locations) && data.locations.length > 0) {
          setLocations(data.locations);
        }
      })
      .catch(() => {
        /* fall back to static content */
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section id="home" className="relative overflow-hidden bg-[#0b0f19] pt-28 md:pt-36">
      <IridescentWaves />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs tracking-wide text-white/80 backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Available for new projects — {new Date().getFullYear()}
        </motion.div>

        <h1 className="text-white font-display text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.94] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {heroTitle}
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-[1rem] leading-relaxed text-white/70 md:text-lg"
          >
            {heroSubtitle || (
              <>
                {studioName} is an independent creative studio. We combine imagination,
                full-stack craft and digital design expertise to build products, brands
                and websites that people remember.
              </>
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_44px_rgba(116,55,255,0.5)]"
            >
              View Works
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors duration-300 hover:border-white/40"
            >
              Our Story
              <Sparkles className="size-4 text-accent" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mt-14 max-w-7xl px-5 md:mt-20 md:px-8"
      >
        <div
          className="iridescent-border relative overflow-hidden rounded-3xl shadow-2xl shadow-black/40"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-hover
        >
          <div className="relative z-10 grid min-h-[420px] bg-[#0b0f19]/60 backdrop-blur-xl md:min-h-[480px] md:grid-cols-[1.1fr_1fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                className="flex flex-col justify-between p-7 md:p-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    {slide.tag}
                  </span>
                  <span className="font-display text-6xl font-medium text-outline-white md:text-7xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-10">
                  <h3 className="text-white font-display text-3xl font-medium tracking-tight md:text-5xl">
                    {slide.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70 md:text-[1rem]">
                    {slide.note}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    {slides.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="group/btn relative h-1.5 overflow-hidden rounded-full bg-white/15 transition-all duration-300"
                        style={{ width: i === index ? 44 : 14 }}
                      >
                        {i === index && (
                          <motion.span
                            key={`progress-${index}`}
                            className="absolute inset-y-0 left-0 rounded-full bg-accent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                            style={{ originX: 0 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative min-h-[240px] overflow-hidden md:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AbstractVisual palette={slide.palette} variant={slide.variant} />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 right-4 flex gap-2">
                {([
                  { dir: -1 as const, icon: ArrowLeft, label: "Previous" },
                  { dir: 1 as const, icon: ArrowRight, label: "Next" },
                ]).map(({ dir, icon: Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => go(dir)}
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-all duration-300 hover:bg-accent hover:text-white"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-8 md:px-8">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-white"
        >
          Scroll
          <ArrowDown className="size-4 text-accent animate-bounce" />
        </a>
        <div className="hidden items-center gap-3 text-xs text-white/50 sm:flex">
          {locations.map((l) => (
            <span key={l.city}>{l.city}</span>
          ))}
          <span className="text-accent">●</span>
        </div>
      </div>
    </section>
  );
}
