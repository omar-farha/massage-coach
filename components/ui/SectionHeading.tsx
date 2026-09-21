"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-right",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-block text-sm font-semibold tracking-wide",
            light ? "text-gold-light" : "text-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-extrabold sm:text-4xl",
          light ? "text-white" : "text-navy-deep"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-balance text-base leading-7", light ? "text-white/70" : "text-text-muted")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
