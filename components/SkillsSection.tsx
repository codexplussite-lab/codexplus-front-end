"use client";

import { useEffect, useState } from "react";
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
import { skillCategories as defaultSkillCategories, type SkillCategory } from "@/data/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Database,
  Palette,
  Zap,
  Globe,
  Cpu,
  Terminal,
  Sparkles,
  Workflow,
  Layers,
};

export default function SkillsSection({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title?: string;
  description?: string;
}) {
  const [categories, setCategories] = useState<SkillCategory[]>(defaultSkillCategories);
  const [sectionKicker, setSectionKicker] = useState(kicker || "Skills & Stack");
  const [sectionTitle, setSectionTitle] = useState(title || "Engineered with precision & modern technology.");
  const [sectionDescription, setSectionDescription] = useState(
    description || "A curated tech stack focused on high performance, seamless user experience, and scalable code standards."
  );

  useEffect(() => {
    let active = true;
    fetch("/api/skills")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: SkillCategory[]) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});

    if (!kicker || !title) {
      fetch("/api/home")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!active || !data) return;
          if (data.skillsKicker) setSectionKicker(data.skillsKicker);
          if (data.skillsTitle) setSectionTitle(data.skillsTitle);
          if (data.skillsDescription) setSectionDescription(data.skillsDescription);
        })
        .catch(() => {});
    }

    return () => {
      active = false;
    };
  }, [kicker, title]);

  return (
    <section id="skills" className="relative py-20 md:py-32 border-t border-line/60 bg-panel/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={sectionKicker}
          title={sectionTitle}
          description={sectionDescription}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Code2;
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
