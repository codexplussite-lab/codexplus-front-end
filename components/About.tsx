"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { stats } from "@/data/content";

const fallbackHighlights = [
  "Collaborative, senior-led delivery",
  "Clean, maintainable engineering",
  "Uncompromising attention to detail",
];

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="border-l border-line pl-5">
      <p className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
        {display}
        <span className="text-accent-deep">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

export default function About() {
  const [highlights, setHighlights] = useState(fallbackHighlights);
  const [statsData, setStatsData] = useState(stats);

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then((data: { stats?: typeof stats; highlights?: string[] }) => {
        if (!active) return;
        if (Array.isArray(data.highlights) && data.highlights.length > 0) {
          setHighlights(data.highlights);
        }
        if (Array.isArray(data.stats) && data.stats.length > 0) {
          setStatsData(data.stats);
        }
      })
      .catch(() => {
        /* fall back to static content */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="relative">
            <Reveal>
              <div className="gradient-border relative overflow-hidden rounded-3xl border border-line">
                <div className="aspect-[4/5] md:aspect-[5/6]">
                  <AbstractVisual
                    palette={["#0b0f19", "#7437ff", "#9a66ff"]}
                    variant="prism"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="absolute -right-4 top-8 rounded-2xl border border-line bg-base/85 p-5 backdrop-blur-md md:-right-10 md:p-6">
                <p className="font-display text-4xl font-medium text-gradient md:text-5xl">
                  12+
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                  Years of craft
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-full border border-line bg-base/85 px-5 py-3 backdrop-blur-md">
                <span className="flex -space-x-2">
                  {["#7437ff", "#9a66ff", "#e3e6f2"].map((c) => (
                    <span
                      key={c}
                      className="grid size-7 place-items-center rounded-full border-2 border-base text-[10px] font-bold text-ink"
                      style={{ background: c }}
                    >
                      +
                    </span>
                  ))}
                </span>
                <span className="text-sm text-muted">
                  <span className="font-semibold text-ink">40k+</span> creators shipped
                </span>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              kicker="About the studio"
              title={
                <>
                  Where imagination
                  <br />
                  meets <span className="text-gradient">engineering.</span>
                </>
              }
            />

            <Reveal delay={0.1}>
              <div className="space-y-5 text-[1rem] leading-relaxed text-muted md:text-lg">
                <p>
                  At our design studio, we&apos;re passionate about transforming raw
                  ideas into reality. Every project starts with curiosity and ends with
                  something people genuinely love to use.
                </p>
                <p>
                  From first sketch to final deploy, we grow together with our clients —
                  pairing clean, thoughtful engineering with visual direction that
                  refuses to blend in.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (                  <li key={item} className="flex items-center gap-3 text-sm text-ink/85">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15">
                      <Check className="size-3.5 text-accent-deep" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
                {statsData.map((stat) => (
                  <Counter key={stat.label} {...stat} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
