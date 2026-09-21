"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Availability, BlockedDate } from "@/types";

export async function getAvailability(): Promise<Availability[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .order("day_of_week", { ascending: true });

  if (error) {
    console.error("getAvailability error", error);
    return [];
  }
  return data ?? [];
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("getBlockedDates error", error);
    return [];
  }
  return data ?? [];
}

export async function upsertDaySchedule(
  dayOfWeek: number,
  input: { start_time: string; end_time: string; active: boolean }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("availability")
    .upsert({ day_of_week: dayOfWeek, ...input }, { onConflict: "day_of_week" });

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/availability");
  revalidatePath("/booking");
  return { success: true };
}

export async function addBlockedDate(input: {
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  reason?: string | null;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("blocked_dates").insert(input);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/availability");
  revalidatePath("/booking");
  return { success: true };
}

export async function removeBlockedDate(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blocked_dates").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/availability");
  revalidatePath("/booking");
  return { success: true };
}
