import Image from "next/image";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "تسجيل الدخول | كابتن سلطان",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const redirectTo = typeof params.redirectTo === "string" ? params.redirectTo : "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="كابتن سلطان"
            width={64}
            height={64}
            className="size-16 rounded-full ring-2 ring-gold/40"
          />
          <h1 className="mt-4 text-xl font-extrabold text-navy-deep">لوحة تحكم كابتن سلطان</h1>
          <p className="mt-1 text-sm text-text-muted">سجل دخولك لإدارة الحجوزات والخدمات</p>
        </div>

        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
