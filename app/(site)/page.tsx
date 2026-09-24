import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import SkillsSection from "@/components/SkillsSection";
import Testimonials from "@/components/Testimonials";
import { getHome } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const homeData = await getHome();

  return (
    <main>
      <Navbar />
      <Hero
        heroTitle={homeData?.heroTitle}
        heroSubtitle={homeData?.heroSubtitle}
        ctaLabel={homeData?.ctaLabel}
        ctaUrl={homeData?.ctaUrl}
        secondaryCtaLabel={homeData?.secondaryCtaLabel}
        secondaryCtaUrl={homeData?.secondaryCtaUrl}
        scrollLabel={homeData?.scrollLabel}
      />
      <LogoMarquee />
      <About />
      <Services
        kicker={homeData?.servicesKicker}
        title={homeData?.servicesTitle}
        description={homeData?.servicesDescription}
      />
      <SkillsSection
        kicker={homeData?.skillsKicker}
        title={homeData?.skillsTitle}
        description={homeData?.skillsDescription}
      />
      <Portfolio carousel />
      <Testimonials />
      <Blog />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}
