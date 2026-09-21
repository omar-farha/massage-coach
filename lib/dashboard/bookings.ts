"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus, BookingWithRelations } from "@/types";

export interface BookingFilters {
  status?: BookingStatus;
  serviceId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export async function getBookings(filters: BookingFilters = {}): Promise<BookingWithRelations[]> {
  const supabase = await createClient();

  let query = supabase
    .from("bookings")
    .select("*, customer:customers(*), service:services(*)")
    .order("booking_date", { ascending: false })
    .order("start_time", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.serviceId) query = query.eq("service_id", filters.serviceId);
  if (filters.dateFrom) query = query.gte("booking_date", filters.dateFrom);
  if (filters.dateTo) query = query.lte("booking_date", filters.dateTo);

  const { data, error } = await query;
  if (error) {
    console.error("getBookings error", error);
    return [];
  }

  let results = (data as unknown as BookingWithRelations[]) ?? [];

  if (filters.search) {
    const term = filters.search.trim().toLowerCase();
    results = results.filter(
      (b) => b.customer.name.toLowerCase().includes(term) || b.customer.phone.includes(term)
    );
  }

  return results;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/bookings");
  revalidatePath("/dashboard/calendar");
  return { success: true };
}

export interface UpdateBookingInput {
  serviceId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  notes?: string | null;
  status: BookingStatus;
  customer: {
    name: string;
    phone: string;
    area: string;
    address: string;
  };
}

export async function updateBooking(bookingId: string, input: UpdateBookingInput) {
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("customer_id")
    .eq("id", bookingId)
    .maybeSingle();

  if (!booking) return { success: false, error: "الحجز غير موجود" };

  await supabase
    .from("customers")
    .update({
      name: input.customer.name,
      phone: input.customer.phone,
      area: input.customer.area,
      address: input.customer.address,
    })
    .eq("id", booking.customer_id);

  const { error } = await supabase
    .from("bookings")
    .update({
      service_id: input.serviceId,
      booking_date: input.bookingDate,
      start_time: input.startTime,
      end_time: input.endTime,
      total_price: input.totalPrice,
      notes: input.notes || null,
      status: input.status,
    })
    .eq("id", bookingId);

  if (error) {
    if (error.code === "23P01") {
      return { success: false, error: "هذا الموعد يتعارض مع حجز آخر" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/bookings");
  revalidatePath("/dashboard/calendar");
  return { success: true };
}

export interface CreateManualBookingInput {
  serviceId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  notes?: string | null;
  customer: {
    name: string;
    phone: string;
    area: string;
    address: string;
  };
}

export async function createManualBooking(input: CreateManualBookingInput) {
  const supabase = await createClient();

  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", input.customer.phone)
    .maybeSingle();

  let customerId = existingCustomer?.id;

  if (!customerId) {
    const { data: newCustomer, error: customerError } = await supabase
      .from("customers")
      .insert(input.customer)
      .select("id")
      .single();

    if (customerError) return { success: false, error: customerError.message };
    customerId = newCustomer.id;
  } else {
    await supabase
      .from("customers")
      .update({
        name: input.customer.name,
        area: input.customer.area,
        address: input.customer.address,
      })
      .eq("id", customerId);
  }

  const { error } = await supabase.from("bookings").insert({
    customer_id: customerId,
    service_id: input.serviceId,
    booking_date: input.bookingDate,
    start_time: input.startTime,
    end_time: input.endTime,
    total_price: input.totalPrice,
    notes: input.notes || null,
  });

  if (error) {
    if (error.code === "23P01") {
      return { success: false, error: "هذا الموعد يتعارض مع حجز آخر" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/bookings");
  revalidatePath("/dashboard/calendar");
  return { success: true };
}
