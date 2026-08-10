import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-5 md:mb-20",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
          <span className="inline-block h-px w-8 bg-accent" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-xl text-[1rem] leading-relaxed text-muted md:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
