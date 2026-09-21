"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils/cn";
import { useToast } from "@/components/ui/Toast";
import { BookingsTable } from "./BookingsTable";
import { BookingModal } from "./BookingModal";
import { createManualBooking, updateBooking, updateBookingStatus } from "@/lib/dashboard/bookings";
import { addMinutesToTime } from "@/lib/booking/availability";
import type { ManualBookingValues } from "@/lib/dashboard/booking-schema";
import type { BookingWithRelations, Service } from "@/types";

const WEEKDAYS = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

export function CalendarView({
  bookings,
  services,
}: {
  bookings: BookingWithRelations[];
  services: Service[];
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BookingWithRelations | undefined>();
  const [loading, setLoading] = useState(false);

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const leadingBlanks = getDay(startOfMonth(month));

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, BookingWithRelations[]>();
    for (const b of bookings) {
      if (b.status === "cancelled") continue;
      const list = map.get(b.booking_date) ?? [];
      list.push(b);
      map.set(b.booking_date, list);
    }
    return map;
  }, [bookings]);

  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const selectedBookings = bookingsByDate.get(selectedKey) ?? [];

  async function handleSubmit(values: ManualBookingValues) {
    const service = services.find((s) => s.id === values.serviceId);
    if (!service) return;

    setLoading(true);
    const endTime = addMinutesToTime(values.time, service.duration);
    const payload = {
      serviceId: values.serviceId,
      bookingDate: values.date,
      startTime: values.time,
      endTime,
      totalPrice: Number(service.price),
      notes: values.notes || null,
      customer: {
        name: values.name,
        phone: values.phone,
        area: values.area,
        address: values.address,
      },
    };

    const result = editing
      ? await updateBooking(editing.id, { ...payload, status: values.status })
      : await createManualBooking(payload);

    setLoading(false);

    if (!result.success) {
      showToast(result.error || "حدث خطأ", "error");
      return;
    }

    showToast(editing ? "تم تحديث الحجز" : "تم إضافة الحجز");
    setModalOpen(false);
    setEditing(undefined);
    router.refresh();
  }

  async function handleQuickStatus(booking: BookingWithRelations, status: "completed" | "cancelled") {
    const result = await updateBookingStatus(booking.id, status);
    if (!result.success) {
      showToast(result.error || "حدث خطأ", "error");
      return;
    }
    showToast(status === "completed" ? "تم إتمام الحجز" : "تم إلغاء الحجز");
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
      <div className="rounded-2xl border border-navy/8 bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setMonth((m) => subMonths(m, 1))}
            className="rounded-full p-2 text-navy-deep hover:bg-navy/5"
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
            onClick={() => setMonth((m) => addMonths(m, 1))}
            className="rounded-full p-2 text-navy-deep hover:bg-navy/5"
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
            <div key={`b-${i}`} />
          ))}
          {days.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const count = bookingsByDate.get(key)?.length ?? 0;
            const isSelected = isSameDay(day, selectedDate);
            return (
              <button
                key={key}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-center gap-0.5 rounded-xl text-sm font-medium transition-colors",
                  !isSameMonth(day, month) && "text-transparent",
                  isSameMonth(day, month) && "text-navy-deep hover:bg-navy/6",
                  isSelected && "bg-navy text-white hover:bg-navy",
                  isToday(day) && !isSelected && "ring-1 ring-gold"
                )}
              >
                {format(day, "d")}
                {count > 0 && (
                  <span
                    className={cn(
                      "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                      isSelected ? "bg-gold text-navy-deep" : "bg-gold/20 text-gold"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-navy-deep">
            حجوزات {format(selectedDate, "EEEE d MMMM", { locale: ar })}
          </h3>
        </div>
        <BookingsTable
          bookings={selectedBookings}
          onEdit={(b) => {
            setEditing(b);
            setModalOpen(true);
          }}
          onComplete={(b) => handleQuickStatus(b, "completed")}
          onCancel={(b) => handleQuickStatus(b, "cancelled")}
        />
      </div>

      <BookingModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(undefined);
        }}
        onSubmit={handleSubmit}
        services={services}
        booking={editing}
        loading={loading}
      />
    </div>
  );
}
