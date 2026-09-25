"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface AboutStudioSectionProps {
  kicker?: string;
  title?: string;
  descriptions?: string[];
  highlights?: string[];
  stats?: StatItem[];
  badge1Number?: string;
  badge1Label?: string;
  badge2Number?: string;
  badge2Label?: string;
}

const defaultStats: StatItem[] = [
  { value: 180, suffix: "+", label: "Projects Completed" },
  { value: 96, suffix: "%", label: "Client Retention" },
  { value: 24, suffix: "", label: "Global Awards" },
  { value: 12, suffix: "+", label: "Years of Craft" },
];

const defaultHighlights = [
  "Collaborative, senior-led delivery",
  "Clean, maintainable engineering",
  "Uncompromising attention to detail",
];

const defaultDescriptions = [
  "At our design studio, we're passionate about transforming raw ideas into reality. Every project starts with curiosity and ends with something people genuinely love to use.",
  "From first sketch to final deploy, we grow together with our clients — pairing clean, thoughtful engineering with visual direction that refuses to blend in.",
];

function AnimatedCounter({ value, suffix, label }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frameId = 0;
    const startTime = performance.now();
    const duration = 1800; // ms

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
        <span>{count}</span>
        {suffix && (
          <span className="text-purple-400 ml-0.5">{suffix}</span>
        )}
      </div>
      <span className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function AboutStudioSection({
  kicker = "ABOUT THE STUDIO",
  title = "Where imagination meets engineering.",
  descriptions = defaultDescriptions,
  highlights = defaultHighlights,
  stats = defaultStats,
  badge1Number = "12+",
  badge1Label = "YEARS OF CRAFT",
  badge2Number = "40k+",
  badge2Label = "creators shipped",
}: AboutStudioSectionProps) {
  // 3D Card Interactive Tilt & Spotlight
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for card rotation
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);

    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32 bg-[#06080e]/60">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 size-[550px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-10 size-[450px] rounded-full bg-indigo-900/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ===================== LEFT: 3D INTERACTIVE CARD ===================== */}
          <div className="lg:col-span-5 relative perspective-[1200px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="group relative aspect-[4/5] sm:aspect-[1/1.1] w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#131024]/90 via-[#0a0c16]/95 to-[#080912] p-8 shadow-2xl backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(116,55,255,0.3)] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
            >
              {/* Dynamic Cursor Spotlight */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.22), transparent 75%)`,
                  }}
                />
              )}

              {/* Nested 3D Cosmic Layers */}
              <div className="relative flex items-center justify-center w-full h-full pointer-events-none select-none">
                {/* Outer Tilted Layer */}
                <div
                  className="absolute w-[80%] h-[80%] rounded-3xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-md transform -rotate-6 transition-transform duration-700 group-hover:-rotate-8 group-hover:scale-105"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(20px) rotate(-6deg)" }}
                />

                {/* Middle Counter-Tilted Layer */}
                <div
                  className="absolute w-[66%] h-[66%] rounded-2xl border border-indigo-400/25 bg-[#17132e]/70 backdrop-blur-xl transform rotate-3 shadow-2xl transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105"
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(40px) rotate(4deg)" }}
                />

                {/* Innermost Glowing Orb Core */}
                <div
                  className="relative z-10 flex items-center justify-center"
                  style={{ transform: "translateZ(70px)" }}
                >
                  {/* Diffused Nebula Glow */}
                  <div className="absolute size-28 sm:size-36 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-fuchsia-400 blur-2xl opacity-75 animate-pulse" />

                  {/* Core Violet Orb with Glassmorphism */}
                  <div className="relative size-16 sm:size-20 rounded-full bg-gradient-to-b from-purple-400 via-purple-600 to-indigo-700 p-0.5 shadow-[0_0_50px_rgba(168,85,247,0.9)]">
                    <div className="size-full rounded-full bg-[#1b1035]/60 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <div className="size-4 rounded-full bg-white shadow-[0_0_12px_#fff]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top-Right Floating Badge: 12+ YEARS OF CRAFT */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 rounded-2xl border border-white/15 bg-black/60 px-5 py-4 backdrop-blur-xl shadow-2xl"
                style={{ transform: "translateZ(90px)" }}
              >
                <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-baseline">
                  {badge1Number.replace("+", "")}
                  <span className="text-purple-400 ml-0.5">+</span>
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                  {badge1Label}
                </p>
              </motion.div>

              {/* Bottom-Left Pill Badge: 40k+ creators shipped */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-20 flex items-center gap-3 rounded-full border border-white/15 bg-black/75 px-4 py-2.5 backdrop-blur-xl shadow-2xl"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="flex -space-x-2">
                  <div className="size-6 rounded-full border-2 border-black bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                    ✦
                  </div>
                  <div className="size-6 rounded-full border-2 border-black bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                    ★
                  </div>
                  <div className="size-6 rounded-full border-2 border-black bg-white flex items-center justify-center text-[9px] font-bold text-black shadow-sm">
                    ●
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-200">
                  <span className="font-bold text-white mr-1">{badge2Number}</span>
                  <span className="text-slate-300">{badge2Label}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ===================== RIGHT: CONTENT & TYPOGRAPHY ===================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline / Kicker */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-6 bg-purple-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 font-mono">
                {kicker}
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.15]">
              {title}
            </h2>

            {/* Descriptions */}
            <div className="mt-6 space-y-4 text-slate-300/80 text-base sm:text-lg leading-relaxed">
              {descriptions.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>

            {/* Bullet Feature List */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3.5 pt-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-sm font-medium text-slate-200 ${
                    idx === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 shadow-sm shadow-purple-500/20">
                    <CheckCircle2 className="size-3.5" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid 2x2 */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-12">
              {stats.map((stat, idx) => (
                <AnimatedCounter
                  key={stat.label || idx}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
