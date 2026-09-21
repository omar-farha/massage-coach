import { Mail } from "lucide-react";
import { getCurrentUser } from "@/lib/dashboard/auth";
import { Card } from "@/components/ui/Card";
import { ChangePasswordForm } from "@/components/dashboard/ChangePasswordForm";

export default async function DashboardSettingsPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">الإعدادات</h2>
      <p className="mb-6 text-sm text-text-muted">إدارة بيانات حساب الدخول للوحة التحكم.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <h3 className="mb-4 font-bold text-navy-deep">بيانات الحساب</h3>
          <div className="flex items-center gap-2.5 text-sm text-text-muted">
            <Mail className="size-4 text-gold" />
            {user?.email}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="mb-4 font-bold text-navy-deep">تغيير كلمة المرور</h3>
          <ChangePasswordForm />
        </Card>
      </div>
    </div>
  );
}
