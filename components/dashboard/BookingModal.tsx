"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { manualBookingSchema, type ManualBookingValues } from "@/lib/dashboard/booking-schema";
import { SERVICE_AREAS } from "@/lib/constants";
import type { BookingWithRelations, Service } from "@/types";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ManualBookingValues) => Promise<void>;
  services: Service[];
  booking?: BookingWithRelations;
  loading?: boolean;
}

export function BookingModal({ open, onClose, onSubmit, services, booking, loading }: BookingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManualBookingValues>({
    resolver: zodResolver(manualBookingSchema),
    values: booking
      ? {
          serviceId: booking.service_id,
          date: booking.booking_date,
          time: booking.start_time.slice(0, 5),
          name: booking.customer.name,
          phone: booking.customer.phone,
          area: booking.customer.area,
          address: booking.customer.address,
          notes: booking.notes ?? "",
          status: booking.status,
        }
      : {
          serviceId: services[0]?.id ?? "",
          date: "",
          time: "",
          name: "",
          phone: "",
          area: "",
          address: "",
          notes: "",
          status: "confirmed",
        },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title={booking ? "تعديل الحجز" : "إضافة حجز يدوي"}
      maxWidth="max-w-xl"
    >
      <form
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values);
          reset();
        })}
        className="space-y-4"
      >
        <Select id="serviceId" label="الخدمة" error={errors.serviceId?.message} {...register("serviceId")}>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Input id="date" type="date" label="التاريخ" error={errors.date?.message} {...register("date")} />
          <Input
            id="time"
            type="time"
            step={900}
            label="الوقت"
            error={errors.time?.message}
            {...register("time")}
          />
        </div>

        {booking && (
          <Select id="status" label="حالة الحجز" error={errors.status?.message} {...register("status")}>
            <option value="confirmed">مؤكد</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </Select>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input id="name" label="اسم العميل" error={errors.name?.message} {...register("name")} />
          <Input
            id="phone"
            label="رقم الموبايل"
            dir="ltr"
            className="text-right"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <Select id="area" label="المنطقة" error={errors.area?.message} {...register("area")}>
          <option value="">اختار المنطقة</option>
          {SERVICE_AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Select>

        <Textarea id="address" label="العنوان بالتفصيل" error={errors.address?.message} {...register("address")} />
        <Textarea id="notes" label="ملاحظات" error={errors.notes?.message} {...register("notes")} />

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {booking ? "حفظ التعديلات" : "إضافة الحجز"}
        </Button>
      </form>
    </Modal>
  );
}
