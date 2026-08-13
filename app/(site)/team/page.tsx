import type { Metadata } from "next";
import { ArrowUpRight, Mail, Users } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getOwner, getSiteSettings, getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team — The People Behind CodeXplus",
  description:
    "Meet the founder and the people behind CodeXplus — the designers, engineers and strategists building brands and products that move the world.",
};

function sized(url: string, w: number, h: number) {
  return `${url}?w=${w}&h=${h}&fit=crop&auto=format`;
}

function Initials({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`grid place-items-center bg-accent-gradient font-display font-semibold text-white ${className ?? ""}`}
    >
      {initials || "CX"}
    </div>
  );
}

export default async function TeamPage() {
  const owner = await getOwner();
  const team = await getTeam();
  const settings = await getSiteSettings();
  const email = settings.email ?? "hello@codexplus.studio";

  return (
    <main>
      <Navbar />

      <PageHero
        pageTagline="The team"
        titlePrefix="The people behind"
        glowingWord="the pixels."
        description="Designers, engineers and strategists working from one accountable bench. Meet the founder and the crew shipping every CodeXplus engagement."
        primaryCtaText="Meet the Crew"
        primaryCtaLink="#founder"
      />

      <section id="founder" className="relative border-y border-line bg-panel/50 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="glass-dark overflow-hidden rounded-[2rem]">
              <div className="grid gap-10 p-7 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:p-12">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10">
                  {owner.image ? (
                    <img
                      src={sized(owner.image, 800, 1000)}
                      alt={owner.imageAlt || owner.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Initials name={owner.name} className="h-full w-full text-7xl" />
                  )}
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/45 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
                    {owner.role}
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
                    <span className="inline-block h-px w-8 bg-accent" />
                    Founder
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] tracking-tight text-white md:text-6xl">
                    {owner.name}
                  </h2>

                  {owner.bio && (
                    <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/75 md:text-lg">
                      {owner.bio}
                    </p>
                  )}

                  {owner.description && owner.description.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {owner.description.map((para) => (
                        <p
                          key={para.slice(0, 32)}
                          className="max-w-xl text-[15px] leading-relaxed text-white/60"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  <a
                    href={`mailto:${email}`}
                    className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-xl bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_44px_rgba(116,55,255,0.5)]"
                  >
                    <Mail className="size-4" />
                    Get in touch
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-24 md:mt-32">
            <SectionHeading
              kicker="The crew"
              title={
                <>
                  Built by <span className="text-gradient">craft.</span>
                </>
              }
              className="mb-12 md:mb-16"
            />
          </div>

          {team.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {team.map((member, i) => (
                <Reveal key={member.id} delay={(i % 4) * 0.08} className="h-full">
                  <article
                    data-hover
                    className="glass-dark group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {member.photo ? (
                        <img
                          src={sized(member.photo, 600, 750)}
                          alt={member.photoAlt || member.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <Initials name={member.name} className="h-full w-full text-6xl" />
                      )}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute bottom-4 left-5 right-5">
                        <span className="block font-display text-lg font-medium leading-tight text-white">
                          {member.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] uppercase tracking-[0.18em] text-accent">
                          {member.role}
                        </span>
                      </span>
                    </div>
                    {member.bio && (
                      <p className="px-5 py-5 text-sm leading-relaxed text-white/60">
                        {member.bio}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted">
              Team members are being added. Check back soon.
            </p>
          )}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
