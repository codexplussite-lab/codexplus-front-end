import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";
import type { Service } from "@/data/content";

export default async function ServicesPage() {
  const rows = await getServices();
  const services = rows as unknown as Service[];

  return (
    <main>
      <Navbar />
      <PageHero
        pageTagline="Our services"
        titlePrefix="Everything we do,"
        glowingWord="in one place."
        description="From brand strategy to shipped product — four disciplines, one accountable team. No hand-offs, no dropped balls."
        primaryCtaText="View Capabilities"
        primaryCtaLink="#services"
      />

      <section id="services" className="relative border-y border-line bg-panel/50 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
