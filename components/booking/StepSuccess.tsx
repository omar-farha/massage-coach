"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDateArabic, formatTimeArabic } from "@/lib/utils/format";

interface StepSuccessProps {
  date: string;
  time: string;
  serviceName: string;
}

export function StepSuccess({ date, time, serviceName }: StepSuccessProps) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="flex size-20 items-center justify-center rounded-full bg-gold/15 text-gold"
      >
        <CheckCircle2 className="size-11" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-6 text-2xl font-extrabold text-navy-deep"
      >
        تم حجز موعدك بنجاح
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="mt-2 max-w-sm text-sm leading-7 text-text-muted"
      >
        هنكون في انتظارك في الموعد المحدد.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 rounded-2xl bg-navy/5 px-6 py-4 text-sm font-medium text-navy-deep"
      >
        {serviceName} — {formatDateArabic(date)} — {formatTimeArabic(time)}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Link href="/">
          <Button size="lg">العودة للرئيسية</Button>
        </Link>
      </motion.div>
    </div>
  );
}
