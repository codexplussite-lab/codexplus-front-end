import type { Metadata } from "next";
import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioHero from "@/components/PortfolioHero";
import WorkSection from "@/components/WorkSection";

export const metadata: Metadata = {
  title: "Portfolio — Arman Naqvi · Frontend & Full-Stack Developer",
  description:
    "Selected work by Arman Naqvi — web design, e-commerce, product design, brand identity and full-stack platforms, crafted end to end.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />
      <PortfolioHero />
      <WorkSection />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}