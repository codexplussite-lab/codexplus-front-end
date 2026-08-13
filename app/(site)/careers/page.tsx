import { getJobs } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const revalidate = 60;

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <main className="bg-slate-950">
      <Navbar />
      
      <PageHero
        pageTagline="Careers"
        titlePrefix="Join the"
        glowingWord="Team."
        description="We are always looking for talented individuals to join our independent creative studio. Help us build products and brands that move the world."
        primaryCtaText="View Openings"
        primaryCtaLink="#openings"
      />

      <div id="openings" className="relative z-10 mx-auto max-w-5xl px-5 md:px-8 py-24">

        <div className="flex flex-col gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div 
                key={job.id} 
                className="gradient-border glass-dark rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(116,55,255,0.15)]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {job.department && (
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-white/80">
                        {job.department}
                      </span>
                    )}
                    {job.location && (
                      <span className="text-xs text-white/50">{job.location}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-display text-white font-medium mb-4">
                    {job.title}
                  </h2>
                  {job.requirements && (
                    <div className="prose prose-invert prose-sm max-w-2xl text-white/70 line-clamp-3">
                      <PortableText value={job.requirements} />
                    </div>
                  )}
                </div>
                
                {job.applyUrl && (
                  <a 
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0b0f19] mt-4 md:mt-0"
                  >
                    Apply Now
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="glass-dark rounded-3xl p-12 text-center">
              <p className="text-white/70 text-lg">
                Don't see your role? Send us an open application at <a href="mailto:hello@codexplus.studio" className="text-accent hover:text-white transition-colors">hello@codexplus.studio</a>
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
