"use client";

import { motion } from "framer-motion";
import { CalendarClock, ClipboardList, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS } from "@/lib/constants";

const ICONS = [ClipboardList, CalendarClock, Sparkles];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute -bottom-24 end-[-6%] -z-0 size-80 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative">
        <SectionHeading eyebrow="خطوات بسيطة" title="الحجز في 3 خطوات" light />

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-9 hidden h-px w-full bg-gradient-to-l from-gold/70 via-gold/30 to-transparent sm:block origin-right"
          />

          {HOW_IT_WORKS.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg shadow-black/20">
                  <Icon className="size-7" />
                  <span className="absolute -top-2 -end-2 flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-navy-deep ring-2 ring-navy-deep">
                    {item.step}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/60">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
