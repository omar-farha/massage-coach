"use server";

import { createClient } from "@/lib/supabase/server";
import { createBookingSchema, type CreateBookingInput } from "./schema";
import { getAvailableSlots } from "./availability";
import type { Service, TimeSlot } from "@/types";

export async function getActiveServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveServices error", error);
    return [];
  }
  return data ?? [];
}

export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("getServiceById error", error);
    return null;
  }
  return data;
}

export async function getSlotsForDate(
  serviceId: string,
  date: string
): Promise<{ slots: TimeSlot[]; error?: string }> {
  const supabase = await createClient();

  const service = await getServiceById(serviceId);
  if (!service) {
    return { slots: [], error: "الخدمة غير متاحة" };
  }

  const [{ data: availability }, { data: blockedDates }, { data: busyRanges }] =
    await Promise.all([
      supabase.from("availability").select("*"),
      supabase.from("blocked_dates").select("*").eq("date", date),
      supabase.from("public_booking_slots").select("*").eq("booking_date", date),
    ]);

  const slots = getAvailableSlots({
    date,
    durationMinutes: service.duration,
    availability: availability ?? [],
    blockedDates: blockedDates ?? [],
    busyRanges: busyRanges ?? [],
  });

  return { slots };
}

interface CreateBookingResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}

export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  const parsed = createBookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "من فضلك تأكد من صحة البيانات المدخلة" };
  }

  const { serviceId, date, time, name, phone, area, address, notes } = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_booking", {
    p_service_id: serviceId,
    p_booking_date: date,
    p_start_time: time,
    p_name: name,
    p_phone: phone,
    p_area: area,
    p_address: address,
    p_notes: notes || null,
  });

  if (error) {
    return { success: false, error: error.message || "حدث خطأ أثناء تأكيد الحجز" };
  }

  return { success: true, bookingId: data as string };
}
