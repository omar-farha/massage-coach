import { getAvailability, getBlockedDates } from "@/lib/dashboard/availability";
import { AvailabilityManager } from "@/components/dashboard/AvailabilityManager";

export default async function DashboardAvailabilityPage() {
  const [availability, blockedDates] = await Promise.all([getAvailability(), getBlockedDates()]);

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">إدارة المواعيد</h2>
      <p className="mb-6 text-sm text-text-muted">
        حدد أيام وساعات العمل، وقم بحظر أي يوم أو وقت غير متاح.
      </p>
      <AvailabilityManager availability={availability} blockedDates={blockedDates} />
    </div>
  );
}
