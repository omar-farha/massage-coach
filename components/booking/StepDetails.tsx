"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { bookingDetailsSchema, type BookingDetailsValues } from "@/lib/booking/schema";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREAS } from "@/lib/constants";

interface StepDetailsProps {
  defaultValues?: Partial<BookingDetailsValues>;
  onSubmit: (values: BookingDetailsValues) => void;
}

export function StepDetails({ defaultValues, onSubmit }: StepDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingDetailsValues>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues,
  });

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">بياناتك</h2>
      <p className="mb-6 text-sm text-text-muted">من فضلك أدخل بياناتك لإتمام الحجز.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          label="الاسم"
          placeholder="اسمك الكامل"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="phone"
          label="رقم الموبايل"
          placeholder="01012345678"
          dir="ltr"
          className="text-right"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Select id="area" label="المنطقة" error={errors.area?.message} {...register("area")}>
          <option value="">اختار المنطقة</option>
          {SERVICE_AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Select>
        <Textarea
          id="address"
          label="العنوان بالتفصيل"
          placeholder="اسم الشارع، رقم العمارة، الدور..."
          error={errors.address?.message}
          {...register("address")}
        />
        <Textarea
          id="notes"
          label="ملاحظات إضافية (اختياري)"
          placeholder="أي تفاصيل تحب تضيفها"
          error={errors.notes?.message}
          {...register("notes")}
        />

        <Button type="submit" size="lg" className="w-full">
          التالي
          <ArrowLeft className="size-4" />
        </Button>
      </form>
    </div>
  );
}
