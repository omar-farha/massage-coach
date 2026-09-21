"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICE_AREAS } from "@/lib/constants";

export function ServiceAreas() {
  return (
    <section id="areas" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-20 start-[-8%] -z-10 size-80 rounded-full bg-navy/6 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 end-[-6%] -z-10 size-64 rounded-full bg-gold-light/20 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="مناطق التغطية"
          title="بنوصلك لحد عندك"
          subtitle="متاحين في مجموعة من مناطق القاهرة والجيزة."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {SERVICE_AREAS.map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 10) * 0.04 }}
              whileHover={{ y: -3 }}
              className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-navy/10 bg-white px-4 py-2.5 text-sm font-medium text-navy-deep shadow-sm shadow-navy/5 transition-colors hover:border-gold hover:bg-gold/5"
            >
              <MapPin className="size-3.5 text-gold" />
              {area}
            </motion.span>
          ))}
        </div>
      </Container>
    </section>
  );
}
