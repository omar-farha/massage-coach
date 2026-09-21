import { z } from "zod";

export const manualBookingSchema = z.object({
  serviceId: z.string().uuid("اختار الخدمة"),
  date: z.string().min(1, "اختار التاريخ"),
  time: z.string().min(1, "اختار الوقت"),
  name: z.string().trim().min(2, "اسم العميل مطلوب"),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "رقم الموبايل غير صحيح، مثال: 01012345678"),
  area: z.string().trim().min(2, "المنطقة مطلوبة"),
  address: z.string().trim().min(3, "العنوان مطلوب"),
  notes: z.string().trim().max(300).optional().or(z.literal("")),
  status: z.enum(["confirmed", "cancelled", "completed"]),
});

export type ManualBookingValues = z.infer<typeof manualBookingSchema>;
