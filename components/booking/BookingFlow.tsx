"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Service } from "@/types";
import type { BookingDetailsValues } from "@/lib/booking/schema";
import { createBooking } from "@/lib/booking/actions";
import { useToast } from "@/components/ui/Toast";
import { BookingStepper } from "./BookingStepper";
import { StepService } from "./StepService";
import { StepDate } from "./StepDate";
import { StepTime } from "./StepTime";
import { StepDetails } from "./StepDetails";
import { StepSummary } from "./StepSummary";
import { StepSuccess } from "./StepSuccess";

interface BookingFlowProps {
  services: Service[];
  preselectedServiceId?: string;
}

export function BookingFlow({ services, preselectedServiceId }: BookingFlowProps) {
  const { showToast } = useToast();

  const initialService = useMemo(
    () => services.find((s) => s.id === preselectedServiceId),
    [services, preselectedServiceId]
  );

  const [step, setStep] = useState(initialService ? 2 : 1);
  const [service, setService] = useState<Service | undefined>(initialService);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [details, setDetails] = useState<BookingDetailsValues | undefined>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dateStr = date ? format(date, "yyyy-MM-dd") : undefined;

  async function handleConfirm() {
    if (!service || !dateStr || !time || !details) return;
    setLoading(true);
    const result = await createBooking({
      serviceId: service.id,
      date: dateStr,
      time,
      ...details,
    });
    setLoading(false);

    if (!result.success) {
      showToast(result.error || "حدث خطأ أثناء تأكيد الحجز", "error");
      return;
    }

    setSuccess(true);
  }

  if (success && service && dateStr && time) {
    return <StepSuccess date={dateStr} time={time} serviceName={service.name} />;
  }

  return (
    <div className="rounded-3xl border border-navy/8 bg-white p-5 shadow-sm shadow-navy/5 sm:p-8">
      <BookingStepper current={step} />

      {step > 1 && (
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-navy-deep"
        >
          <ArrowRight className="size-4" />
          رجوع
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {step === 1 && (
            <StepService
              services={services}
              selectedId={service?.id}
              onSelect={(s) => {
                setService(s);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <StepDate
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setTime(undefined);
                setStep(3);
              }}
            />
          )}

          {step === 3 && service && dateStr && (
            <StepTime
              serviceId={service.id}
              date={dateStr}
              selected={time}
              onSelect={(t) => {
                setTime(t);
                setStep(4);
              }}
            />
          )}

          {step === 4 && (
            <StepDetails
              defaultValues={details}
              onSubmit={(values) => {
                setDetails(values);
                setStep(5);
              }}
            />
          )}

          {step === 5 && service && dateStr && time && details && (
            <StepSummary
              service={service}
              date={dateStr}
              time={time}
              details={details}
              onConfirm={handleConfirm}
              loading={loading}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
