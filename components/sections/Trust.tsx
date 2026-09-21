"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { CalendarCheck, Gem, Home, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TRUST_ITEMS } from "@/lib/constants";

const ICONS = [ShieldCheck, Gem, CalendarCheck, Home];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Trust() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-0 h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/5 text-gold ring-1 ring-gold/25">
                  <Icon className="size-6" />
                </span>
                <p className="text-4xl font-extrabold text-white sm:text-5xl">
                  <Counter value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-sm text-white/60">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
