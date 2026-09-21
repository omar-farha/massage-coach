"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const STEP_LABELS = ["الخدمة", "التاريخ", "الوقت", "بياناتك", "التأكيد"];

export function BookingStepper({ current }: { current: number }) {
  return (
    <div className="mb-10 flex items-center">
      {STEP_LABELS.map((label, i) => {
        const stepIndex = i + 1;
        const isDone = stepIndex < current;
        const isActive = stepIndex === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-sm font-bold transition-colors sm:size-10",
                  isDone && "bg-navy text-white",
                  isActive && "bg-gold text-navy-deep ring-4 ring-gold/20",
                  !isDone && !isActive && "bg-navy/6 text-text-muted"
                )}
              >
                {isDone ? <Check className="size-4" /> : stepIndex}
              </motion.div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isActive || isDone ? "text-navy-deep" : "text-text-muted"
                )}
              >
                {label}
              </span>
            </div>
            {stepIndex !== STEP_LABELS.length && (
              <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-navy/8">
                <motion.div
                  initial={false}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gold"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
