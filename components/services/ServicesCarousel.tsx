"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils/cn";
import { ServiceCard } from "./ServiceCard";

export function ServicesCarousel({ services }: { services: Service[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(services.length - 1, index));
    setActiveIndex(clamped);
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <div>
      <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {services.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="w-[78%] shrink-0 snap-center sm:w-auto sm:shrink"
          >
            <ServiceCard service={service} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="الخدمة السابقة"
          className={cn(
            "flex size-11 items-center justify-center rounded-full border transition-colors",
            activeIndex === 0
              ? "border-navy/10 text-navy/20"
              : "border-navy/15 text-navy-deep hover:border-gold hover:bg-gold/10 hover:text-gold"
          )}
        >
          <ChevronRight className="size-5" />
        </button>

        <span dir="ltr" className="text-xs font-medium text-text-muted">
          {activeIndex + 1} / {services.length}
        </span>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === services.length - 1}
          aria-label="الخدمة التالية"
          className={cn(
            "flex size-11 items-center justify-center rounded-full border transition-colors",
            activeIndex === services.length - 1
              ? "border-navy/10 text-navy/20"
              : "border-navy/15 text-navy-deep hover:border-gold hover:bg-gold/10 hover:text-gold"
          )}
        >
          <ChevronLeft className="size-5" />
        </button>
      </div>
    </div>
  );
}
