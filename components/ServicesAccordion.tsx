"use client";

import { ArrowUpRight, Check, Code2, Lightbulb, Megaphone, Palette } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/content";

const icons = {
  palette: Palette,
  code: Code2,
  megaphone: Megaphone,
  lightbulb: Lightbulb,
};

const cardGlows = [
  {
    accent: "#7437ff",
    wash: "radial-gradient(120% 90% at 0% 0%, rgba(116, 55, 255, 0.38), transparent 55%), linear-gradient(180deg, rgba(116, 55, 255, 0.14), transparent 65%)",
  },
  {
    accent: "#9a66ff",
    wash: "radial-gradient(120% 90% at 100% 0%, rgba(154, 102, 255, 0.34), transparent 55%), linear-gradient(180deg, rgba(154, 102, 255, 0.12), transparent 65%)",
  },
  {
    accent: "#4da3ff",
    wash: "radial-gradient(120% 90% at 100% 100%, rgba(77, 163, 255, 0.32), transparent 55%), linear-gradient(0deg, rgba(77, 163, 255, 0.12), transparent 65%)",
  },
  {
    accent: "#c084fc",
    wash: "radial-gradient(120% 90% at 0% 100%, rgba(192, 132, 252, 0.32), transparent 55%), linear-gradient(0deg, rgba(192, 132, 252, 0.12), transparent 65%)",
  },
];

type AccordionCardProps = {
  service: Service;
  index: number;
  active: boolean;
  onActivate: () => void;
};

function AccordionServiceCard({ service, index, active, onActivate }: AccordionCardProps) {
  const Icon = icons[service.icon];
  const glow = cardGlows[index % cardGlows.length];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={active}
      data-hover
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={cn(
        "group relative flex h-full min-h-[190px] w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl transition-all duration-500 ease-in-out md:min-h-0 md:p-8",
        active && "md:flex-[3] bg-panel",
        !active && "md:flex-1"
      )}
      style={active ? { borderColor: `${glow.accent}66` } : undefined}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{ background: glow.wash }}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-52 rounded-full blur-3xl transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{ background: `radial-gradient(circle, ${glow.accent}52, transparent 70%)` }}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-grid transition-opacity duration-500",
          active ? "opacity-30" : "opacity-0"
        )}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "font-display text-6xl font-medium leading-none transition-colors duration-500",
              !active && "text-outline"
            )}
            style={active ? { color: glow.accent } : undefined}
          >
            {service.index}
          </span>
          <span
            aria-hidden
            className={cn(
              "grid size-12 place-items-center rounded-2xl border border-line bg-elevated/80 text-ink transition-all duration-500",
              active && "text-white",
              !active && "opacity-0"
            )}
            style={active ? { background: glow.accent, borderColor: glow.accent } : undefined}
          >
            <Icon className="size-5" strokeWidth={1.5} />
          </span>
        </div>

        <div
          aria-hidden={!active}
          className={cn(
            "mt-auto max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 ease-in-out",
            active && "max-h-[400px] opacity-100"
          )}
        >
          <p className="text-sm leading-relaxed text-muted md:text-[15px]">
            {service.description}
          </p>

          <ul
            className={cn(
              "mt-5 space-y-2.5 transition-opacity duration-500",
              active ? "delay-100 opacity-100" : "opacity-0"
            )}
          >
            {(service.points ?? []).map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-ink/85">
                <span
                  className="grid size-5 shrink-0 place-items-center rounded-full"
                  style={{ background: `${glow.accent}26` }}
                >
                  <Check className="size-3" style={{ color: glow.accent }} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-7 flex items-center justify-between border-t border-line/70 pt-5 transition-opacity duration-500",
              active ? "delay-150 opacity-100" : "opacity-0"
            )}
          >
            <Link
              href="/#contact"
              className="text-[11px] font-medium uppercase tracking-[0.22em] text-faint transition-colors duration-300 hover:text-white"
            >
              Start a project
            </Link>
            <span
              className="grid size-8 place-items-center rounded-full border border-line text-ink transition-all duration-300"
              style={
                active
                  ? { background: glow.accent, borderColor: glow.accent, color: "#ffffff" }
                  : undefined
              }
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>

        <h3 className="mt-6 font-display text-xl font-medium leading-snug tracking-tight transition-colors duration-300 md:text-2xl">
          {service.title}
        </h3>
      </div>
    </div>
  );
}

export default function ServicesAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Reveal>
      <div className="flex flex-col gap-4 md:h-[520px] md:flex-row md:gap-5">
        {services.map((service, i) => (
          <AccordionServiceCard
            key={service.id}
            service={service}
            index={i}
            active={active === i}
            onActivate={() => setActive((prev) => (prev === i ? null : i))}
          />
        ))}
      </div>
    </Reveal>
  );
}
