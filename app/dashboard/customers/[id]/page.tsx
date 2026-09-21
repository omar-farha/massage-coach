import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { getCustomerWithHistory } from "@/lib/dashboard/customers";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_LABELS,
  formatDateShort,
  formatPrice,
  formatTimeArabic,
} from "@/lib/utils/format";

export default async function CustomerDetailPage({
  params,
}: PageProps<"/dashboard/customers/[id]">) {
  const { id } = await params;
  const result = await getCustomerWithHistory(id);

  if (!result) notFound();
  const { customer, bookings } = result;

  return (
    <div>
      <Link
        href="/dashboard/customers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-navy-deep"
      >
        <ArrowRight className="size-4" />
        العودة للعملاء
      </Link>

      <Card className="mb-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-navy-deep">{customer.name}</h2>
            <div className="mt-3 flex flex-wrap gap-5 text-sm text-text-muted">
              <span className="flex items-center gap-1.5" dir="ltr">
                <Phone className="size-4 text-gold" />
                {customer.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-gold" />
                {customer.area} — {customer.address}
              </span>
            </div>
          </div>
          <WhatsAppButton phone={customer.phone} label="تواصل واتساب" />
        </div>
      </Card>

      <h3 className="mb-4 text-lg font-bold text-navy-deep">سجل الحجوزات ({bookings.length})</h3>

      {bookings.length === 0 ? (
        <Card className="p-8 text-center text-sm text-text-muted">لا توجد حجوزات سابقة.</Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Card key={booking.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-navy-deep">{booking.service.name}</p>
                <p className="text-sm text-text-muted">
                  {formatDateShort(booking.booking_date)} — {formatTimeArabic(booking.start_time)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gold">{formatPrice(booking.total_price)}</span>
                <Badge className={BOOKING_STATUS_COLORS[booking.status]}>
                  {BOOKING_STATUS_LABELS[booking.status]}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
