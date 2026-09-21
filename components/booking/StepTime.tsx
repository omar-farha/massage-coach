"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getSlotsForDate } from "@/lib/booking/actions";
import { formatTimeArabic } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { TimeSlot } from "@/types";

interface StepTimeProps {
  serviceId: string;
  date: string;
  selected?: string;
  onSelect: (time: string) => void;
}

export function StepTime({ serviceId, date, selected, onSelect }: StepTimeProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const res = await getSlotsForDate(serviceId, date);
      if (cancelled) return;
      if (res.error) setError(res.error);
      setSlots(res.slots);
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [serviceId, date]);

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">اختار الوقت</h2>
      <p className="mb-6 text-sm text-text-muted">المواعيد المتاحة في هذا اليوم.</p>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
          <Loader2 className="size-5 animate-spin" />
          جاري تحميل المواعيد المتاحة...
        </div>
      )}

      {!loading && error && (
        <p className="rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && slots.length === 0 && (
        <p className="rounded-xl bg-navy/5 p-4 text-center text-sm font-medium text-text-muted">
          للأسف لا توجد مواعيد متاحة في هذا اليوم، جرب تاريخًا آخر.
        </p>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {slots.map((slot, i) => (
            <motion.button
              key={slot.time}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 12) * 0.02 }}
              disabled={!slot.available}
              onClick={() => onSelect(slot.time)}
              className={cn(
                "rounded-xl border py-3 text-sm font-semibold transition-colors",
                !slot.available &&
                  "cursor-not-allowed border-navy/6 bg-navy/[0.03] text-text-muted/40 line-through",
                slot.available &&
                  selected === slot.time &&
                  "border-gold bg-gold text-navy-deep ring-2 ring-gold/25",
                slot.available &&
                  selected !== slot.time &&
                  "border-navy/10 bg-white text-navy-deep hover:border-gold/50"
              )}
            >
              {formatTimeArabic(slot.time)}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
