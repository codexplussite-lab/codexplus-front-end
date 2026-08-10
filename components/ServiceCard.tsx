import { ArrowUpRight, Check, Code2, Lightbulb, Megaphone, Palette } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Service } from "@/data/content";

const icons = {
  palette: Palette,
  code: Code2,
  megaphone: Megaphone,
  lightbulb: Lightbulb,
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];

  return (
    <Reveal delay={(index % 2) * 0.1} className="h-full">
      <article
        data-hover
        className="gradient-border group relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-7 transition-all duration-500 hover:-translate-y-2 md:p-9"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(116,55,255,0.2), transparent 70%)" }}
        />
        <div className="flex items-start justify-between">
          <span className="grid size-13 place-items-center rounded-2xl border border-line bg-elevated text-ink transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-white">
            <Icon className="size-6" strokeWidth={1.5} />
          </span>
          <span className="font-display text-5xl font-medium text-outline transition-colors duration-500 group-hover:text-accent/30">
            {service.index}
          </span>
        </div>

        <h3 className="mt-8 font-display text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-[1.7rem]">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
          {service.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-sm text-ink/85">
              <Check className="size-4 shrink-0 text-accent-deep" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <Link
            href="/#contact"
            className="text-xs font-medium uppercase tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-accent"
          >
            Start a project
          </Link>
          <span className="grid size-9 place-items-center rounded-full border border-line text-faint transition-all duration-500 group-hover:translate-x-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </article>
    </Reveal>
  );
}
