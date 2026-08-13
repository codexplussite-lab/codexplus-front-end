import React from "react";
import Link from "next/link";

interface PageHeroProps {
  pageTagline: string;
  titlePrefix: React.ReactNode;
  glowingWord: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
}

export default function PageHero({
  pageTagline,
  titlePrefix,
  glowingWord,
  description,
  primaryCtaText,
  primaryCtaLink,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 w-full flex flex-col justify-center items-center px-4 overflow-hidden bg-slate-950 text-white">
      {/* Ambient Background & Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="container mx-auto max-w-5xl z-10 flex flex-col items-center text-center">
        {/* 1. Category / Tagline Badge */}
        <div className="flex items-center gap-2 mb-3 text-purple-400">
          <span className="w-10 h-[2px] bg-purple-500 rounded-full" />
          <span className="text-xs md:text-sm font-mono tracking-widest uppercase">{pageTagline}</span>
        </div>

        {/* 2. Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
          {titlePrefix} <span className="text-purple-400 [text-shadow:_0_0_20px_rgba(168,85,247,0.5)]">{glowingWord}</span>
        </h1>

        {/* 3. Subtext Paragraph */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          {description}
        </p>

        {/* 4. Action / CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            href={primaryCtaLink}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-purple-900/30"
          >
            {primaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
