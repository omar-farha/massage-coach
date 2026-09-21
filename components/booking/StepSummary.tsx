"use client";

import { Calendar, Clock, MapPin, Phone, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDateArabic, formatDuration, formatPrice, formatTimeArabic } from "@/lib/utils/format";
import type { Service } from "@/types";
import type { BookingDetailsValues } from "@/lib/booking/schema";

interface StepSummaryProps {
  service: Service;
  date: string;
  time: string;
  details: BookingDetailsValues;
  onConfirm: () => void;
  loading: boolean;
}

function Row({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-navy/6 text-navy">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="font-medium text-navy-deep">{value}</p>
      </div>
    </div>
  );
}

export function StepSummary({ service, date, time, details, onConfirm, loading }: StepSummaryProps) {
  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">ملخص الحجز</h2>
      <p className="mb-6 text-sm text-text-muted">راجع بياناتك قبل تأكيد الحجز.</p>

      <div className="rounded-2xl border border-navy/8 bg-white p-5">
        <div className="flex items-center justify-between border-b border-navy/8 pb-4">
          <div>
            <p className="font-bold text-navy-deep">{service.name}</p>
            <p className="text-sm text-text-muted">{formatDuration(service.duration)}</p>
          </div>
          <p className="text-lg font-extrabold text-gold">{formatPrice(service.price)}</p>
        </div>

        <div className="divide-y divide-navy/6">
          <Row icon={Calendar} label="التاريخ" value={formatDateArabic(date)} />
          <Row icon={Clock} label="الوقت" value={formatTimeArabic(time)} />
          <Row icon={User} label="اسم العميل" value={details.name} />
          <Row icon={Phone} label="رقم الهاتف" value={details.phone} />
          <Row icon={MapPin} label="المنطقة والعنوان" value={`${details.area} — ${details.address}`} />
          {details.notes && <Row icon={FileText} label="ملاحظات" value={details.notes} />}
        </div>
      </div>

      <Button onClick={onConfirm} loading={loading} size="lg" className="mt-6 w-full">
        تأكيد الحجز
      </Button>
    </div>
  );
}
