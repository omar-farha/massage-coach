"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_US_ITEMS, IMAGES } from "@/lib/constants";

export function WhyUs() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative order-2 h-[22rem] sm:h-[28rem] lg:order-1 lg:h-auto lg:min-h-[36rem]"
        >
          <Image
            src={IMAGES.whyUs}
            alt="أجواء فاخرة لتجربة مساج منزلي"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-navy-deep/10" />
        </motion.div>

        <div className="order-1 flex flex-col justify-center px-5 py-20 sm:px-10 sm:py-24 lg:order-2 lg:px-16 lg:py-28 xl:px-20">
          <SectionHeading
            align="start"
            eyebrow="ليه تختارنا"
            title="ليه كابتن سلطان؟"
            subtitle="مش مجرد جلسة مساج، دي تجربة متكاملة مبنية على الخبرة والاحترافية."
            className="!mx-0"
          />

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {WHY_US_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl bg-cream/60 p-3.5 ring-1 ring-navy/6"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-navy-deep">
                  <Check className="size-4" />
                </span>
                <span className="text-sm font-medium text-navy-deep">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
