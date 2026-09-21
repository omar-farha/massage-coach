import { z } from "zod";

export const bookingDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "من فضلك أدخل اسمًا صحيحًا")
    .max(80, "الاسم طويل جدًا"),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "رقم الموبايل غير صحيح، مثال: 01012345678"),
  area: z.string().trim().min(2, "من فضلك اختار المنطقة"),
  address: z
    .string()
    .trim()
    .min(5, "من فضلك أدخل العنوان بالتفصيل")
    .max(300, "العنوان طويل جدًا"),
  notes: z.string().trim().max(300, "الملاحظات طويلة جدًا").optional().or(z.literal("")),
});

export type BookingDetailsValues = z.infer<typeof bookingDetailsSchema>;

export const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  ...bookingDetailsSchema.shape,
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
