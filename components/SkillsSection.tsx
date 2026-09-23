"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { 
  Code2, 
  Layers, 
  Palette, 
  Cpu, 
  Globe, 
  Zap, 
  Sparkles, 
  Database,
  Terminal,
  Workflow
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: Code2,
    skills: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS", "Three.js / WebGL", "Framer Motion", "GSAP"]
  },
  {
    title: "Backend & CMS",
    icon: Database,
    skills: ["Node.js", "Sanity CMS", "REST / GraphQL", "PostgreSQL", "Next API Routes", "Server Components"]
  },
  {
    title: "UI/UX & Product Design",
    icon: Palette,
    skills: ["Figma", "Design Systems", "Wireframing", "Interactive Prototypes", "Micro-interactions", "User Research"]
  },
  {
    title: "Performance & Workflow",
    icon: Zap,
    skills: ["Vercel", "Git / GitHub", "SEO Optimization", "Web Vitals", "CI/CD", "Responsive Architecture"]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 md:py-32 border-t border-line/60 bg-panel/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Skills & Stack"
          title="Engineered with precision & modern technology."
          description="A curated tech stack focused on high performance, seamless user experience, and scalable code standards."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={idx * 0.1}>
                <div className="group relative h-full rounded-2xl border border-line bg-panel/70 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-panel hover:shadow-xl hover:shadow-accent/5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-lg border border-line-soft bg-elevated/80 px-3 py-1.5 text-xs font-medium text-muted transition-colors group-hover:border-line group-hover:text-ink"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
