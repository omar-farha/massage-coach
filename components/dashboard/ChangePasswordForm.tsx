"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { changePasswordSchema, type ChangePasswordValues } from "@/lib/dashboard/settings-schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function ChangePasswordForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema) });

  async function onSubmit(values: ChangePasswordValues) {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: values.password });
    setLoading(false);

    if (error) {
      showToast("حدث خطأ أثناء تحديث كلمة المرور", "error");
      return;
    }

    showToast("تم تحديث كلمة المرور بنجاح");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="password"
        type="password"
        label="كلمة المرور الجديدة"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        id="confirmPassword"
        type="password"
        label="تأكيد كلمة المرور"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" loading={loading}>
        تحديث كلمة المرور
      </Button>
    </form>
  );
}
