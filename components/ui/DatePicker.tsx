"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils/cn";

const WEEKDAYS = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
}

export function DatePicker({
  selected,
  onSelect,
  minDate = startOfDay(new Date()),
  maxDate,
  isDateDisabled,
}: DatePickerProps) {
  const [month, setMonth] = useState(startOfMonth(selected ?? minDate));

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const leadingBlanks = getDay(startOfMonth(month));

  const canGoPrev = !isBefore(endOfMonth(subMonths(month, 1)), minDate);
  const canGoNext = !maxDate || isBefore(startOfMonth(addMonths(month, 1)), maxDate);

  return (
    <div className="rounded-2xl border border-navy/8 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrev && setMonth((m) => subMonths(m, 1))}
          disabled={!canGoPrev}
          className="rounded-full p-2 text-navy-deep transition-colors hover:bg-navy/5 disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>
        <AnimatePresence mode="wait">
          <motion.span
            key={format(month, "yyyy-MM")}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="text-sm font-bold text-navy-deep"
          >
            {format(month, "MMMM yyyy", { locale: ar })}
          </motion.span>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => canGoNext && setMonth((m) => addMonths(m, 1))}
          disabled={!canGoNext}
          className="rounded-full p-2 text-navy-deep transition-colors hover:bg-navy/5 disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-text-muted">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1.5">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const disabled =
            isBefore(day, minDate) ||
            (maxDate ? isBefore(maxDate, day) : false) ||
            (isDateDisabled?.(day) ?? false);
          const isSelected = selected && isSameDay(day, selected);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-colors",
                !isSameMonth(day, month) && "text-transparent",
                disabled && isSameMonth(day, month) && "text-text-muted/40 cursor-not-allowed",
                !disabled && isSameMonth(day, month) && "text-navy-deep hover:bg-navy/6",
                isSelected && "bg-navy text-white hover:bg-navy"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
