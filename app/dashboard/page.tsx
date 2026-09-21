import { CalendarCheck, CalendarClock, ListChecks, Wallet } from "lucide-react";
import { getDashboardStats } from "@/lib/dashboard/stats";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_LABELS,
  formatPrice,
  formatTimeArabic,
} from "@/lib/utils/format";

export default async function DashboardOverviewPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="حجوزات اليوم"
          value={stats.todayCount}
          icon={<CalendarCheck className="size-5" />}
          accent="gold"
          index={0}
        />
        <StatsCard
          label="الحجوزات القادمة"
          value={stats.upcomingCount}
          icon={<CalendarClock className="size-5" />}
          index={1}
        />
        <StatsCard
          label="إجمالي الحجوزات"
          value={stats.totalCount}
          icon={<ListChecks className="size-5" />}
          index={2}
        />
        <StatsCard
          label="إيرادات الحجوزات"
          value={formatPrice(stats.totalRevenue)}
          icon={<Wallet className="size-5" />}
          accent="gold"
          index={3}
        />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-navy-deep">حجوزات اليوم</h2>

        {stats.todayBookings.length === 0 ? (
          <Card className="p-8 text-center text-sm text-text-muted">
            لا توجد حجوزات اليوم.
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.todayBookings.map((booking) => (
              <Card key={booking.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-navy-deep">{booking.customer.name}</p>
                    <p className="text-sm text-text-muted">{booking.service.name}</p>
                  </div>
                  <Badge className={BOOKING_STATUS_COLORS[booking.status]}>
                    {BOOKING_STATUS_LABELS[booking.status]}
                  </Badge>
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-text-muted">
                  <p>الوقت: {formatTimeArabic(booking.start_time)}</p>
                  <p dir="ltr" className="text-right">
                    {booking.customer.phone}
                  </p>
                  <p>{booking.customer.area}</p>
                </div>
                <div className="mt-4 border-t border-navy/6 pt-4">
                  <WhatsAppButton phone={booking.customer.phone} label="تواصل واتساب" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
