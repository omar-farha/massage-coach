"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-24 end-[-6%] -z-10 size-80 rounded-full bg-gold-light/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 start-[-8%] -z-10 size-72 rounded-full bg-navy/6 blur-3xl" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="start"
              eyebrow="قصتنا"
              title="عن كابتن سلطان"
              className="!mx-0"
            />
            <div className="mt-6 space-y-4 text-base leading-8 text-text-muted">
              <p>
                أنا كابتن سلطان، متخصص في تقديم خدمات المساج المنزلي بأسلوب يجمع بين الاحتراف
                والاهتمام بالتفاصيل.
              </p>
              <p>
                أحرص في كل جلسة على فهم تفضيلات العميل واختيار أسلوب المساج المناسب له، مع
                الالتزام بالموعد وتوفير تجربة مريحة ومنظمة داخل المكان الذي يختاره.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-cream p-5 ring-1 ring-navy/6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Award className="size-6" />
              </span>
              <div>
                <p className="font-bold text-navy-deep">10+ سنوات خبرة</p>
                <p className="text-sm text-text-muted">في مجال المساج الاحترافي المنزلي</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -end-4 -top-4 -z-10 h-full w-full rounded-[2rem] border-2 border-gold/50 sm:-end-5 sm:-top-5" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/20 sm:aspect-[4/5]">
              <Image
                src={IMAGES.about}
                alt="احترافية كابتن سلطان في جلسات المساج"
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -start-6 -z-10 size-36 rounded-full bg-gold-light/30 blur-2xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
