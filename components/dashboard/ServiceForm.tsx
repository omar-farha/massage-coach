"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  serviceSchema,
  type ServiceFormInput,
  type ServiceFormValues,
} from "@/lib/dashboard/service-schema";
import type { Service } from "@/types";

interface ServiceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
  service?: Service;
  loading?: boolean;
}

export function ServiceForm({ open, onClose, onSubmit, service, loading }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormInput, unknown, ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    values: service
      ? {
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: Number(service.price),
          image_url: service.image_url ?? "",
          active: service.active,
        }
      : {
          name: "",
          description: "",
          duration: 60,
          price: 0,
          image_url: "",
          active: true,
        },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title={service ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
    >
      <form
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values);
          reset();
        })}
        className="space-y-4"
      >
        <Input id="name" label="اسم الخدمة" error={errors.name?.message} {...register("name")} />
        <Textarea
          id="description"
          label="الوصف"
          error={errors.description?.message}
          {...register("description")}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="duration"
            type="number"
            label="المدة (دقيقة)"
            error={errors.duration?.message}
            {...register("duration")}
          />
          <Input
            id="price"
            type="number"
            label="السعر (جنيه)"
            error={errors.price?.message}
            {...register("price")}
          />
        </div>
        <Input
          id="image_url"
          label="رابط الصورة (اختياري)"
          dir="ltr"
          className="text-right"
          error={errors.image_url?.message}
          {...register("image_url")}
        />
        <label className="flex items-center gap-2.5 text-sm font-medium text-navy-deep">
          <input type="checkbox" className="size-4 accent-gold" {...register("active")} />
          الخدمة مفعّلة وتظهر للعملاء
        </label>

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {service ? "حفظ التعديلات" : "إضافة الخدمة"}
        </Button>
      </form>
    </Modal>
  );
}
