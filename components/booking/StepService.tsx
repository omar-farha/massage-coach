"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Service } from "@/types";
import { formatDuration, formatPrice } from "@/lib/utils/format";
import { DEFAULT_SERVICE_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

interface StepServiceProps {
  services: Service[];
  selectedId?: string;
  onSelect: (service: Service) => void;
}

export function StepService({ services, selectedId, onSelect }: StepServiceProps) {
  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">اختار الخدمة</h2>
      <p className="mb-6 text-sm text-text-muted">اختار نوع المساج المناسب لك.</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service, i) => {
          const isSelected = selectedId === service.id;
          return (
            <motion.button
              key={service.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(service)}
              className={cn(
                "group flex items-center gap-3.5 rounded-2xl border p-3 text-right transition-all",
                isSelected
                  ? "border-gold bg-gold/5 ring-2 ring-gold/25"
                  : "border-navy/10 bg-white hover:border-gold/40"
              )}
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={service.image_url || DEFAULT_SERVICE_IMAGE}
                  alt={service.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-navy-deep">{service.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-text-muted">
                  <Clock className="size-3.5" />
                  {formatDuration(service.duration)}
                </div>
                <p className="mt-1 text-sm font-bold text-gold">{formatPrice(service.price)}</p>
              </div>
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isSelected ? "border-gold bg-gold text-navy-deep" : "border-navy/15 text-transparent"
                )}
              >
                <Check className="size-3.5" />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
