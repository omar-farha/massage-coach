"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { Service } from "@/types";
import type { BookingStatus } from "@/types";

export interface BookingFilterState {
  search: string;
  status: BookingStatus | "";
  serviceId: string;
  dateFrom: string;
  dateTo: string;
}

interface BookingFiltersProps {
  services: Service[];
  filters: BookingFilterState;
  onChange: (filters: BookingFilterState) => void;
}

export function BookingFilters({ services, filters, onChange }: BookingFiltersProps) {
  return (
    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="relative lg:col-span-2">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
        <Input
          placeholder="ابحث بالاسم أو رقم الهاتف"
          className="ps-10"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <Select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value as BookingStatus | "" })}
      >
        <option value="">كل الحالات</option>
        <option value="confirmed">مؤكد</option>
        <option value="completed">مكتمل</option>
        <option value="cancelled">ملغي</option>
      </Select>

      <Select
        value={filters.serviceId}
        onChange={(e) => onChange({ ...filters, serviceId: e.target.value })}
      >
        <option value="">كل الخدمات</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Select>

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
        />
        <Input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
        />
      </div>
    </div>
  );
}
