"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -bottom-16 end-[-4%] -z-10 size-72 rounded-full bg-navy/6 blur-3xl" />
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="أسئلة شائعة" title="الأسئلة الشائعة" />

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-cream/60 transition-colors",
                  isOpen ? "border-gold/50 bg-gold/5" : "border-navy/8"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                >
                  <span className="font-semibold text-navy-deep">{item.question}</span>
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full bg-navy/6 text-navy transition-transform duration-300",
                      isOpen && "rotate-45 bg-gold/15 text-gold"
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
