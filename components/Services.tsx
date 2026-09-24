import SectionHeading from "@/components/SectionHeading";
import ServicesAccordion from "@/components/ServicesAccordion";
import { getServices, getHome } from "@/lib/data";
import type { Service } from "@/data/content";

export default async function Services({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title?: string;
  description?: string;
}) {
  const rows = await getServices();
  const services = rows as unknown as Service[];
  const homeData = !kicker || !title || !description ? await getHome() : null;

  const sectionKicker = kicker || homeData?.servicesKicker || "What we do";
  const sectionTitle = title || homeData?.servicesTitle || "Services engineered for impact.";
  const sectionDescription =
    description ||
    homeData?.servicesDescription ||
    "Four tightly-argued disciplines, one accountable team. Strategy through shipping — no hand-offs, no dropped balls.";

  return (
    <section
      id="services"
      className="relative border-y border-line bg-panel/50 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={sectionKicker}
          title={
            sectionTitle.includes("\n") ? (
              sectionTitle.split("\n").map((line, idx) => (
                <span key={idx}>
                  {idx > 0 && <br />}
                  {line}
                </span>
              ))
            ) : (
              sectionTitle
            )
          }
          description={sectionDescription}
        />

        <ServicesAccordion services={services} />
      </div>
    </section>
  );
}
