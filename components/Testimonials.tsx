import { Quote, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getTestimonials, type TestimonialRow } from "@/lib/data";

function TestimonialCard({
  quote,
  name,
  role,
  initials,
  accent,
}: TestimonialRow) {
  return (
    <figure
      data-hover
      className="gradient-border relative flex w-[320px] shrink-0 flex-col gap-6 rounded-3xl border border-line bg-panel p-6 transition-all duration-500 hover:-translate-y-1 md:w-[400px] md:p-7"
    >
      <div className="flex items-center justify-between">
        <Quote className="size-6 text-accent-deep" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-accent text-accent" />
          ))}
        </div>
      </div>

      <blockquote className="text-[15px] leading-relaxed text-ink/90">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-4 border-t border-line pt-5">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
          style={{ background: accent }}
        >
          {initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">{name}</span>
          <span className="block text-xs text-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  const first = [...testimonials, ...testimonials];
  const second = [...testimonials].reverse();

  return (
    <section className="border-y border-line bg-panel/50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Customer voices"
          title={
            <>
              Trusted by teams
              <br />
              <span className="text-gradient">worldwide.</span>
            </>
          }
          align="center"
        />
      </div>

      <Reveal>
        <div className="marquee-row marquee-mask space-y-5 overflow-hidden">
          <div className="animate-marquee marquee-track flex w-max gap-5 pr-5">
            {first.map((t, i) => (
              <TestimonialCard key={`${t.name}-a-${i}`} {...t} />
            ))}
          </div>
          <div className="animate-marquee-reverse marquee-track flex w-max gap-5 pr-5">
            {second.map((t, i) => (
              <TestimonialCard key={`${t.name}-b-${i}`} {...t} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
