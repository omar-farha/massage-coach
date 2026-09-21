import { getAllServices } from "@/lib/dashboard/services";
import { ServicesManager } from "@/components/dashboard/ServicesManager";

export default async function DashboardServicesPage() {
  const services = await getAllServices();

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">إدارة الخدمات</h2>
      <p className="mb-6 text-sm text-text-muted">
        تحكم في اسم وسعر ومدة وصورة وحالة كل خدمة تظهر للعملاء.
      </p>
      <ServicesManager services={services} />
    </div>
  );
}
