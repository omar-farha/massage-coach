"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types";

export async function getAllServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getAllServices error", error);
    return [];
  }
  return data ?? [];
}

export interface ServiceInput {
  name: string;
  description: string;
  duration: number;
  price: number;
  image_url?: string | null;
  active: boolean;
}

export async function createService(input: ServiceInput) {
  const supabase = await createClient();
  const { data: maxRow } = await supabase
    .from("services")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("services").insert({
    ...input,
    sort_order: (maxRow?.sort_order ?? 0) + 1,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/services");
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, input: ServiceInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").update(input).eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/services");
  revalidatePath("/");
  return { success: true };
}

export async function toggleServiceActive(id: string, active: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").update({ active }).eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/services");
  revalidatePath("/");
  return { success: true };
}
