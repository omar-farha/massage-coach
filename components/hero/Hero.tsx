"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IMAGES } from "@/lib/constants";

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image
          src={IMAGES.hero}
          alt="تجربة مساج منزلي فاخرة"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-navy-deep/40 via-transparent to-transparent" />

      <motion.div
        aria-hidden
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-16 start-[8%] -z-10 size-64 rounded-full bg-gold/20 blur-3xl"
      />

      <Container className="relative py-28 sm:py-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-gold-light ring-1 ring-white/20 backdrop-blur-sm"
          >
            <Sparkles className="size-4" />
            كابتن سلطان للمساج المنزلي
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance text-5xl font-extrabold leading-[1.12] text-white sm:text-6xl lg:text-7xl"
          >
            راحة تستحقها...
            <br />
            <span className="text-gold-light">في المكان اللي تحبه</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-lg text-balance text-lg leading-8 text-white/75"
          >
            كابتن سلطان للمساج المنزلي يقدم لك تجربة مساج احترافية ومريحة في منزلك، مع اهتمام
            بالتفاصيل والالتزام بالموعد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/booking">
              <Button variant="secondary" size="lg">
                احجز موعدك الآن
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <a href="#services">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/5 text-white hover:border-gold hover:bg-white/10 hover:text-white"
              >
                اكتشف خدماتنا
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-14 inline-flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/15 backdrop-blur-sm"
          >
            <p className="text-3xl font-extrabold text-gold-light">10+</p>
            <p className="max-w-[9rem] text-xs font-medium leading-5 text-white/70">
              سنوات من الخبرة والثقة مع عملائنا
            </p>
          </motion.div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep to-transparent" />
    </section>
  );
}
