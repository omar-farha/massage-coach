"use server";

import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import type { BookingWithRelations } from "@/types";

export interface DashboardStats {
  todayCount: number;
  upcomingCount: number;
  totalCount: number;
  totalRevenue: number;
  todayBookings: BookingWithRelations[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, customer:customers(*), service:services(*)")
    .order("booking_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error || !bookings) {
    console.error("getDashboardStats error", error);
    return { todayCount: 0, upcomingCount: 0, totalCount: 0, totalRevenue: 0, todayBookings: [] };
  }

  const all = bookings as unknown as BookingWithRelations[];

  const todayBookings = all.filter((b) => b.booking_date === today && b.status !== "cancelled");
  const upcoming = all.filter((b) => b.booking_date > today && b.status === "confirmed");
  const activeBookings = all.filter((b) => b.status !== "cancelled");
  const totalRevenue = all
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + Number(b.total_price), 0);

  return {
    todayCount: todayBookings.length,
    upcomingCount: upcoming.length,
    totalCount: activeBookings.length,
    totalRevenue,
    todayBookings,
  };
}
