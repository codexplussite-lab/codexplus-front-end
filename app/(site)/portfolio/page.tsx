import type { Metadata } from "next";
import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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

      <section className="relative border-b border-line bg-panel/40 py-32 md:py-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            kicker="Selected work"
            title={
              <>
                Work that
                <br />
                <span className="text-outline-accent">ships.</span>
              </>
            }
            description="A slice of the brands, storefronts and products we've built — filter by discipline and open any tile for the full story."
          />
        </div>
      </section>

      <div className="relative border-y border-line bg-panel/50">
        <Portfolio heading={false} />
      </div>

      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}
