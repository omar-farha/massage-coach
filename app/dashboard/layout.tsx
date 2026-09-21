import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export const metadata = {
  title: "لوحة التحكم | كابتن سلطان",
};

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute -top-24 end-[-8%] -z-10 size-96 rounded-full bg-gold-light/15 blur-3xl" />
        <Topbar title="لوحة التحكم" userEmail={user.email} />
        <main className="relative flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
