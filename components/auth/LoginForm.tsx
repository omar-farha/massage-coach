"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginValues } from "@/lib/dashboard/schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginValues) {
    setLoading(true);
    setFormError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (error) {
      setFormError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="email"
        type="email"
        label="البريد الإلكتروني"
        placeholder="captain@example.com"
        dir="ltr"
        className="text-right"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        id="password"
        type="password"
        label="كلمة المرور"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {formError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {formError}
        </p>
      )}

      <Button type="submit" loading={loading} size="lg" className="w-full">
        تسجيل الدخول
        <LogIn className="size-4" />
      </Button>
    </form>
  );
}
