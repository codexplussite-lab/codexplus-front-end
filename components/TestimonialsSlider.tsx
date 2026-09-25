import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getTestimonials, type TestimonialRow } from "@/lib/data";
import { urlForImage } from "@/lib/sanity";

function resolveImageUrl(t: TestimonialRow): string | null {
  if (t.imageUrl) return t.imageUrl;
  if (t.clientImage) {
    try {
      return urlForImage(t.clientImage).width(200).height(200).fit("crop").url();
    } catch {
      return null;
    }
  }
  return null;
}

export function TestimonialCard({
  name,
  role,
  date,
  review,
  quote,
  rating = 4.9,
  imageUrl,
  clientImage,
  initials,
  accent = "#06b6d4",
}: TestimonialRow) {
  const resolvedImage = resolveImageUrl({ name, imageUrl, clientImage } as TestimonialRow);
  const displayReview = review || quote || "";
  const displayRole = role || date || "Client Partner";
  const displayRating = typeof rating === "number" ? rating.toFixed(1) : (rating || "4.9");
  const avatarInitials = initials || (name ? name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "CL");

  return (
    <figure className="group relative flex w-[350px] shrink-0 flex-col justify-between rounded-2xl border border-white/5 bg-[#101426]/75 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-[#13172e] hover:shadow-[0_10px_30px_-10px_rgba(116,55,255,0.25)] md:w-[420px] md:p-7">
      {/* Top Header: Avatar + Name/Role + Dark Pill Rating Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          {/* Avatar with cyan/purple glowing ring matching theme */}
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-transform duration-300 group-hover:scale-105 group-hover:ring-purple-500/80">
            {resolvedImage ? (
              <Image
                src={resolvedImage}
                alt={name || "Client Avatar"}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div
                className="grid size-full place-items-center text-sm font-bold text-white shadow-inner"
                style={{ background: accent || "#06b6d4" }}
              >
                {avatarInitials}
              </div>
            )}
          </div>

          {/* Name & Role */}
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-purple-200">
              {name}
            </h3>
            <p className="truncate text-xs font-medium text-cyan-400">
              {displayRole}
            </p>
          </div>
        </div>

        {/* Rating Pill Badge (Dark cyan/purple theme) */}
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-1 text-xs font-medium text-cyan-300 shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-950/60 group-hover:text-purple-200">
          <Star className="size-3 fill-cyan-400 text-cyan-400 group-hover:fill-purple-400 group-hover:text-purple-400" />
          <span>{displayRating}</span>
        </div>
      </div>

      {/* Review Quote Body */}
      <blockquote className="mt-5 text-sm leading-relaxed text-slate-300/90">
        &ldquo;{displayReview}&rdquo;
      </blockquote>
    </figure>
  );
}

interface TestimonialsSliderProps {
  testimonials?: TestimonialRow[];
  heading?: string;
  subheading?: string;
}

export default async function TestimonialsSlider({
  testimonials: initialTestimonials,
  heading = "Client Testimonial",
  subheading = "Trusted by ambitious founders, teams, and industry leaders worldwide.",
}: TestimonialsSliderProps = {}) {
  const testimonials = initialTestimonials || (await getTestimonials());

  // Split into 2 rows for bidirectional marquee
  const half = Math.ceil(testimonials.length / 2);
  const row1Items = testimonials.length > 0 ? testimonials.slice(0, half) : testimonials;
  const row2Items = testimonials.length > 0 ? testimonials.slice(half) : testimonials;

  // Duplicate items 4x to guarantee seamless infinite loop without gaps
  const row1Repeated = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const row2Repeated = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  return (
    <section className="relative overflow-hidden bg-[#070913] py-24 md:py-32 text-white">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-96 rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 size-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 text-center md:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl md:mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-sans">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-3 text-sm md:text-base text-slate-400">
                {subheading}
              </p>
            )}
          </div>
        </Reveal>
      </div>

      {/* Infinite Marquee Slider Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#070913] via-[#070913]/80 to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#070913] via-[#070913]/80 to-transparent md:w-48" />

        <div className="space-y-6 md:space-y-8">
          {/* Row 1: Infinite Scroll Left */}
          <div className="marquee-row group flex w-full overflow-hidden select-none">
            <div className="animate-marquee marquee-track flex w-max gap-6 pr-6 [animation-duration:48s] group-hover:[animation-play-state:paused]">
              {row1Repeated.map((t, idx) => (
                <TestimonialCard
                  key={`row1-${t.id || t._id || idx}-${idx}`}
                  {...t}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Infinite Scroll Right */}
          <div className="marquee-row group flex w-full overflow-hidden select-none">
            <div className="animate-marquee-reverse marquee-track flex w-max gap-6 pr-6 [animation-duration:52s] group-hover:[animation-play-state:paused]">
              {row2Repeated.map((t, idx) => (
                <TestimonialCard
                  key={`row2-${t.id || t._id || idx}-${idx}`}
                  {...t}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
