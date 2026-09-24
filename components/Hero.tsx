"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import MoltenMetal from "@/components/MoltenMetal";
import { brand } from "@/data/content";

export default function Hero({
  heroTitle,
  heroSubtitle,
  ctaLabel,
  ctaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  scrollLabel,
}: {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  scrollLabel?: string;
}) {
  const [studioName, setStudioName] = useState(brand.name);
  const [homeData, setHomeData] = useState({
    heroTitle: heroTitle,
    heroSubtitle: heroSubtitle,
    ctaLabel: ctaLabel || "View Selected Work",
    ctaUrl: ctaUrl || "#portfolio",
    secondaryCtaLabel: secondaryCtaLabel || "Get In Touch",
    secondaryCtaUrl: secondaryCtaUrl || "#contact",
    scrollLabel: scrollLabel || "Scroll Down",
  });

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then((data: { siteName?: string }) => {
        if (!active) return;
        if (data.siteName) setStudioName(data.siteName);
      })
      .catch(() => {});

    if (!heroTitle) {
      fetch("/api/home")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!active || !data) return;
          setHomeData((prev) => ({
            heroTitle: data.heroTitle || prev.heroTitle,
            heroSubtitle: data.heroSubtitle || prev.heroSubtitle,
            ctaLabel: data.ctaLabel || prev.ctaLabel,
            ctaUrl: data.ctaUrl || prev.ctaUrl,
            secondaryCtaLabel: data.secondaryCtaLabel || prev.secondaryCtaLabel,
            secondaryCtaUrl: data.secondaryCtaUrl || prev.secondaryCtaUrl,
            scrollLabel: data.scrollLabel || prev.scrollLabel,
          }));
        })
        .catch(() => {});
    }

    return () => {
      active = false;
    };
  }, [heroTitle]);

  const activeTitle = heroTitle || homeData.heroTitle;
  const activeSubtitle = heroSubtitle || homeData.heroSubtitle;
  const activeCtaLabel = ctaLabel || homeData.ctaLabel;
  const activeCtaUrl = ctaUrl || homeData.ctaUrl;
  const activeSecLabel = secondaryCtaLabel || homeData.secondaryCtaLabel;
  const activeSecUrl = secondaryCtaUrl || homeData.secondaryCtaUrl;
  const activeScroll = scrollLabel || homeData.scrollLabel;

  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0b0f19] pt-24 pb-8">
      {/* Molten Metal WebGL Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <MoltenMetal
          color1="#7437ff"
          color2="#9a66ff"
          color3="#ffffff"
          speed={0.35}
          scale={3.5}
          detail={4}
          glow={1.8}
          coreSize={0.12}
          swirl={1.2}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.2}
          colorMode="molten"
          grain={true}
          grainIntensity={0.06}
          mouseInteraction={true}
          mouseStrength={0.35}
          opacity={0.85}
        />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center text-center px-5 md:px-8 max-w-5xl mx-auto">
        {/* Main Animated Headline */}
        <h1 className="text-white font-display text-[clamp(2.8rem,7.5vw,7rem)] font-bold leading-[1.0] tracking-[-0.03em] max-w-4xl mx-auto">
          <span className="block overflow-hidden">
            <motion.span
              className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {activeTitle || (
                <>
                  Crafting Digital <span className="bg-gradient-to-r from-accent via-purple-300 to-indigo-300 bg-clip-text text-transparent">Excellence</span>
                </>
              )}
            </motion.span>
          </span>
        </h1>

        {/* Centered Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/80 md:text-xl font-light mx-auto"
        >
          {activeSubtitle || (
            <>
              {studioName} is a high-end digital agency & engineering studio. We build conversion-driven web products, modern brand identities, and immersive digital experiences.
            </>
          )}
        </motion.p>

        {/* Centered Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={activeCtaUrl}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-accent/25 transition-all duration-300 hover:bg-accent-deep hover:shadow-accent/40 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              {activeCtaLabel}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>

          <a
            href={activeSecUrl}
            className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/40 px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95"
          >
            {activeSecLabel}
            <Sparkles className="size-4 text-accent animate-pulse" />
          </a>
        </motion.div>
      </div>

      {/* Centered Scroll Down Arrow */}
      <div className="relative z-10 flex justify-center w-full pb-4">
        <a
          href="#about"
          className="group inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-white"
        >
          {activeScroll}
          <ArrowDown className="size-4 text-accent animate-bounce" />
        </a>
      </div>
    </section>
  );
}
