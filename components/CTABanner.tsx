import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";
import { brand } from "@/data/content";
import { getSiteSettings } from "@/lib/data";

export default async function CTABanner() {
  const settings = await getSiteSettings();
  const email = settings.email ?? brand.email;

  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem]">
            <AnimatedBackground />
            <div className="glass-dark rounded-[2rem] px-7 py-16 text-center md:px-12 md:py-24">
              <div className="relative">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white">
                  Let&apos;s build something
                </p>
                <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-white md:text-7xl">
                  Have an idea worth <span className="text-accent">building?</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-white/70 md:text-lg">
                  Tell us where you want to go. We&apos;ll bring the strategy, the craft
                  and the code. Response within 24 hours.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={`mailto:${email}`}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-accent-gradient px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_44px_rgba(116,55,255,0.5)]"
                  >
                    <Mail className="size-4" />
                    {email}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur transition-colors duration-300 hover:border-white/40 hover:bg-white/15"
                  >
                    <MapPin className="size-4 text-accent" />
                    See the work
                  </a>
                </div>

                <p className="mt-8 text-xs text-white/50">
                  Currently booking Q3 {new Date().getFullYear()} projects
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
