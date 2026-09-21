"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: "navy" | "gold";
  index?: number;
}

export function StatsCard({ label, value, icon, accent = "navy", index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-2xl border border-navy/8 bg-white p-5 shadow-sm shadow-navy/5"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl",
            accent === "gold" ? "bg-gold/12 text-gold" : "bg-navy/6 text-navy"
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-4 text-2xl font-extrabold text-navy-deep">{value}</p>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
    </motion.div>
  );
}
