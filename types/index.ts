import type { Database, BookingStatus } from "./database";

export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Availability = Database["public"]["Tables"]["availability"]["Row"];
export type BlockedDate = Database["public"]["Tables"]["blocked_dates"]["Row"];

export type { BookingStatus };

export interface BookingWithRelations extends Booking {
  customer: Customer;
  service: Service;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  area: string;
  address: string;
  notes?: string;
}
