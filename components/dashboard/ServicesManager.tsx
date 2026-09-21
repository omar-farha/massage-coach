"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { ServiceForm } from "./ServiceForm";
import { createService, updateService, toggleServiceActive } from "@/lib/dashboard/services";
import type { ServiceFormValues } from "@/lib/dashboard/service-schema";
import { formatDuration, formatPrice } from "@/lib/utils/format";
import { DEFAULT_SERVICE_IMAGE } from "@/lib/constants";
import type { Service } from "@/types";
import { cn } from "@/lib/utils/cn";

export function ServicesManager({ services }: { services: Service[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | undefined>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: ServiceFormValues) {
    setLoading(true);
    const payload = { ...values, image_url: values.image_url || null };
    const result = editing
      ? await updateService(editing.id, payload)
      : await createService(payload);
    setLoading(false);

    if (!result.success) {
      showToast(result.error || "حدث خطأ", "error");
      return;
    }

    showToast(editing ? "تم تحديث الخدمة" : "تم إضافة الخدمة");
    setModalOpen(false);
    setEditing(undefined);
    router.refresh();
  }

  async function handleToggle(service: Service) {
    const result = await toggleServiceActive(service.id, !service.active);
    if (!result.success) {
      showToast(result.error || "حدث خطأ", "error");
      return;
    }
    showToast(service.active ? "تم إخفاء الخدمة" : "تم تفعيل الخدمة");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-muted">{services.length} خدمة</p>
        <Button
          onClick={() => {
            setEditing(undefined);
            setModalOpen(true);
          }}
        >
          <Plus className="size-4" />
          إضافة خدمة
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src={service.image_url || DEFAULT_SERVICE_IMAGE}
                alt={service.name}
                fill
                sizes="360px"
                className="object-cover"
              />
              {!service.active && (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/50">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-navy-deep">
                    غير مفعّلة
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-navy-deep">{service.name}</h3>
                <button
                  onClick={() => {
                    setEditing(service);
                    setModalOpen(true);
                  }}
                  className="shrink-0 rounded-full p-1.5 text-text-muted hover:bg-navy/5 hover:text-navy"
                >
                  <Pencil className="size-4" />
                </button>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-text-muted">{service.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gold">{formatPrice(service.price)}</span>
                <span className="text-xs text-text-muted">{formatDuration(service.duration)}</span>
              </div>

              <button
                onClick={() => handleToggle(service)}
                className={cn(
                  "mt-4 w-full rounded-full border py-2 text-xs font-semibold transition-colors",
                  service.active
                    ? "border-navy/15 text-navy-deep hover:border-red-300 hover:text-red-600"
                    : "border-gold bg-gold/10 text-gold hover:bg-gold/20"
                )}
              >
                {service.active ? "إخفاء الخدمة" : "تفعيل الخدمة"}
              </button>
            </div>
          </Card>
        ))}
      </div>

      <ServiceForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(undefined);
        }}
        onSubmit={handleSubmit}
        service={editing}
        loading={loading}
      />
    </div>
  );
}
