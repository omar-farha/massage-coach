import { getBookings } from "@/lib/dashboard/bookings";
import { getAllServices } from "@/lib/dashboard/services";
import { CalendarView } from "@/components/dashboard/CalendarView";

export default async function DashboardCalendarPage() {
  const [bookings, services] = await Promise.all([getBookings(), getAllServices()]);

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">التقويم</h2>
      <p className="mb-6 text-sm text-text-muted">استعراض الحجوزات بشكل شهري لفهم جدولك بسهولة.</p>
      <CalendarView bookings={bookings} services={services} />
    </div>
  );
}
