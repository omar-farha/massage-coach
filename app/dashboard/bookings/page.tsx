import { getBookings } from "@/lib/dashboard/bookings";
import { getAllServices } from "@/lib/dashboard/services";
import { BookingsManager } from "@/components/dashboard/BookingsManager";

export default async function DashboardBookingsPage() {
  const [bookings, services] = await Promise.all([getBookings(), getAllServices()]);

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">الحجوزات</h2>
      <p className="mb-6 text-sm text-text-muted">إدارة كل حجوزات العملاء وحالتها.</p>
      <BookingsManager bookings={bookings} services={services} />
    </div>
  );
}
