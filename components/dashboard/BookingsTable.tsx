"use client";

import { CheckCircle2, Pencil, XCircle } from "lucide-react";
import { Table, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_LABELS,
  formatDateShort,
  formatPrice,
  formatTimeArabic,
} from "@/lib/utils/format";
import type { BookingWithRelations } from "@/types";

interface BookingsTableProps {
  bookings: BookingWithRelations[];
  onEdit: (booking: BookingWithRelations) => void;
  onComplete: (booking: BookingWithRelations) => void;
  onCancel: (booking: BookingWithRelations) => void;
}

export function BookingsTable({ bookings, onEdit, onComplete, onCancel }: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-navy/8 bg-white p-10 text-center text-sm text-text-muted">
        لا توجد حجوزات مطابقة.
      </div>
    );
  }

  return (
    <Table>
      <Thead>
        <tr>
          <Th>العميل</Th>
          <Th>الخدمة</Th>
          <Th>التاريخ</Th>
          <Th>الوقت</Th>
          <Th>المنطقة</Th>
          <Th>السعر</Th>
          <Th>الحالة</Th>
          <Th>إجراءات</Th>
        </tr>
      </Thead>
      <tbody>
        {bookings.map((booking) => (
          <Tr key={booking.id}>
            <Td>
              <p className="font-medium text-navy-deep">{booking.customer.name}</p>
              <p dir="ltr" className="text-right text-xs text-text-muted">
                {booking.customer.phone}
              </p>
            </Td>
            <Td>{booking.service.name}</Td>
            <Td className="whitespace-nowrap">{formatDateShort(booking.booking_date)}</Td>
            <Td className="whitespace-nowrap">{formatTimeArabic(booking.start_time)}</Td>
            <Td>{booking.customer.area}</Td>
            <Td className="whitespace-nowrap">{formatPrice(booking.total_price)}</Td>
            <Td>
              <Badge className={BOOKING_STATUS_COLORS[booking.status]}>
                {BOOKING_STATUS_LABELS[booking.status]}
              </Badge>
            </Td>
            <Td>
              <div className="flex items-center gap-1">
                <WhatsAppButton phone={booking.customer.phone} />
                <button
                  onClick={() => onEdit(booking)}
                  title="تعديل"
                  className="rounded-lg p-1.5 text-text-muted hover:bg-navy/5 hover:text-navy"
                >
                  <Pencil className="size-4" />
                </button>
                {booking.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => onComplete(booking)}
                      title="إتمام"
                      className="rounded-lg p-1.5 text-text-muted hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      <CheckCircle2 className="size-4" />
                    </button>
                    <button
                      onClick={() => onCancel(booking)}
                      title="إلغاء"
                      className="rounded-lg p-1.5 text-text-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <XCircle className="size-4" />
                    </button>
                  </>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
