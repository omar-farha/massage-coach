"use client";

import { DatePicker } from "@/components/ui/DatePicker";

interface StepDateProps {
  selected?: Date;
  onSelect: (date: Date) => void;
}

export function StepDate({ selected, onSelect }: StepDateProps) {
  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">اختار التاريخ</h2>
      <p className="mb-6 text-sm text-text-muted">حدد اليوم المناسب لك من التقويم.</p>
      <DatePicker selected={selected} onSelect={onSelect} />
    </div>
  );
}
