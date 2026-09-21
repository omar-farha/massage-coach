import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Trust } from "@/components/sections/Trust";
import { ServicesSection } from "@/components/services/ServicesSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <ServicesSection />
        <WhyUs />
        <About />
        <HowItWorks />
        <ServiceAreas />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
