"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import type { Service } from "@/types";
import { formatDuration, formatPrice } from "@/lib/utils/format";
import { DEFAULT_SERVICE_IMAGE } from "@/lib/constants";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-md shadow-navy/[0.06] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-2xl hover:shadow-navy/15"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 origin-right scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image_url || DEFAULT_SERVICE_IMAGE}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-navy-deep/0 to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy-deep backdrop-blur-sm w-fit">
          <Clock className="size-3.5 text-gold" />
          {formatDuration(service.duration)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-navy-deep">{service.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-text-muted">
          {service.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-navy/6 pt-4">
          <span className="text-lg font-extrabold text-navy-deep">
            {formatPrice(service.price)}
          </span>
          <Link
            href={`/booking?service=${service.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-transform group-hover:-translate-x-1"
          >
            احجز الآن
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
