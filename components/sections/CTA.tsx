"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,165,92,0.18),_transparent_60%)]" />
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-10 start-1/4 size-56 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:26px_26px]" />

      <Container className="relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-block text-sm font-semibold text-gold-light"
        >
          خلي راحتك توصلك لحد البيت
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-2xl text-balance text-3xl font-extrabold text-white sm:text-4xl"
        >
          احجز جلستك الآن واختار موعدك بكل سهولة
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-9"
        >
          <Link href="/booking">
            <Button variant="secondary" size="lg">
              احجز جلستك الآن
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
