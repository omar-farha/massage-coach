"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { BookingFilters, type BookingFilterState } from "./BookingFilters";
import { BookingsTable } from "./BookingsTable";
import { BookingModal } from "./BookingModal";
import {
  createManualBooking,
  updateBooking,
  updateBookingStatus,
} from "@/lib/dashboard/bookings";
import { addMinutesToTime } from "@/lib/booking/availability";
import type { ManualBookingValues } from "@/lib/dashboard/booking-schema";
import type { BookingWithRelations, Service } from "@/types";

const EMPTY_FILTERS: BookingFilterState = {
  search: "",
  status: "",
  serviceId: "",
  dateFrom: "",
  dateTo: "",
};

export function BookingsManager({
  bookings,
  services,
}: {
  bookings: BookingWithRelations[];
  services: Service[];
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [filters, setFilters] = useState<BookingFilterState>(EMPTY_FILTERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BookingWithRelations | undefined>();
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (filters.status && b.status !== filters.status) return false;
      if (filters.serviceId && b.service_id !== filters.serviceId) return false;
      if (filters.dateFrom && b.booking_date < filters.dateFrom) return false;
      if (filters.dateTo && b.booking_date > filters.dateTo) return false;
      if (filters.search) {
        const term = filters.search.trim().toLowerCase();
        if (
          !b.customer.name.toLowerCase().includes(term) &&
          !b.customer.phone.includes(term)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [bookings, filters]);

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
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-text-muted">{filtered.length} حجز</p>
        <Button
          onClick={() => {
            setEditing(undefined);
            setModalOpen(true);
          }}
        >
          <Plus className="size-4" />
          إضافة حجز يدوي
        </Button>
      </div>

      <BookingFilters services={services} filters={filters} onChange={setFilters} />

      <BookingsTable
        bookings={filtered}
        onEdit={(b) => {
          setEditing(b);
          setModalOpen(true);
        }}
        onComplete={(b) => handleQuickStatus(b, "completed")}
        onCancel={(b) => handleQuickStatus(b, "cancelled")}
      />

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
