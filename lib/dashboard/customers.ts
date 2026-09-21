"use server";

import { createClient } from "@/lib/supabase/server";
import type { Customer, BookingWithRelations } from "@/types";

export interface CustomerWithStats extends Customer {
  bookingCount: number;
  lastBookingDate: string | null;
}

export async function getAllCustomers(): Promise<CustomerWithStats[]> {
  const supabase = await createClient();

  const [{ data: customers }, { data: bookings }] = await Promise.all([
    supabase.from("customers").select("*").order("created_at", { ascending: false }),
    supabase.from("bookings").select("customer_id, booking_date").order("booking_date", { ascending: false }),
  ]);

  if (!customers) return [];

  return customers.map((customer) => {
    const customerBookings = (bookings ?? []).filter((b) => b.customer_id === customer.id);
    return {
      ...customer,
      bookingCount: customerBookings.length,
      lastBookingDate: customerBookings[0]?.booking_date ?? null,
    };
  });
}

export async function getCustomerWithHistory(
  id: string
): Promise<{ customer: Customer; bookings: BookingWithRelations[] } | null> {
  const supabase = await createClient();

  const { data: customer } = await supabase.from("customers").select("*").eq("id", id).maybeSingle();
  if (!customer) return null;

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, customer:customers(*), service:services(*)")
    .eq("customer_id", id)
    .order("booking_date", { ascending: false });

  return { customer, bookings: (bookings as unknown as BookingWithRelations[]) ?? [] };
}
