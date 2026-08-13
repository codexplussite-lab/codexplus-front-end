"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface RotatingGradientSectionProps {
  children?: ReactNode;
  className?: string;
  orbColor1?: string;
  orbColor2?: string;
  orbColor3?: string;
}

export default function RotatingGradientSection({
  children,
  className = "",
  orbColor1 = "bg-purple-600/30",
  orbColor2 = "bg-indigo-600/30",
  orbColor3 = "bg-fuchsia-600/30",
}: RotatingGradientSectionProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-slate-950 py-24 md:py-32 ${className}`}
    >
      {/* 
        Background Layer: 
        We use an absolute container that holds the glowing orbs.
        The container itself is blur-heavy, meaning the orbs blend smoothly together.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden mix-blend-screen">
        {/*
          The rotating container. We use Framer Motion for a buttery smooth,
          hardware-accelerated infinite rotation without relying on complex CSS keyframes.
        */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="relative w-[150%] max-w-[1200px] aspect-square opacity-70 blur-[120px]"
        >
          {/* Orb 1: Top Right */}
          <div
            className={`absolute top-[10%] right-[10%] w-[50%] h-[50%] rounded-full ${orbColor1}`}
          />
          {/* Orb 2: Bottom Left */}
          <div
            className={`absolute bottom-[10%] left-[10%] w-[60%] h-[60%] rounded-full ${orbColor2}`}
          />
          {/* Orb 3: Center offset */}
          <div
            className={`absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full ${orbColor3}`}
          />
        </motion.div>
      </div>

      {/* 
        Content Layer: 
        z-10 ensures it stays above the gradient background.
      */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {children || (
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              Immersive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Gradients</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              A performant, hardware-accelerated animated gradient background 
              that won't cause scrollbars or compromise text readability.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
