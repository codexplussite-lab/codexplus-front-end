import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Layout, ArrowUpRight } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Portfolio — Selected Work by CodeXplus",
  description:
    "Browse CodeXplus selected work — web design, e-commerce, product design, brand identity and web apps shipped by one accountable team.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        pageTagline="Selected work"
        titlePrefix="Work that"
        glowingWord="ships."
        description="A slice of the brands, storefronts and products we've built — filter by discipline and open any tile for the full story."
        primaryCtaText="Explore Projects"
        primaryCtaLink="#portfolio"
      />

      <div id="portfolio" className="relative border-y border-line bg-panel/50">
        <Portfolio heading={false} />
      </div>

      <CTABanner />
      <Footer />
    </main>
  );
}
