import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getActiveServices } from "@/lib/booking/actions";
import { ServicesCarousel } from "./ServicesCarousel";

export async function ServicesSection() {
  const services = await getActiveServices();

  if (services.length === 0) return null;

  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-16 start-[-6%] -z-10 size-72 rounded-full bg-gold-light/20 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="خدماتنا"
          title="خدمات المساج"
          subtitle="اختار الجلسة المناسبة لك واستمتع بتجربة احترافية في مكانك."
        />

        <div className="mt-14">
          <ServicesCarousel services={services} />
        </div>
      </Container>
    </section>
  );
}
