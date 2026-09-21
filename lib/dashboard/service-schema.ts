import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(2, "اسم الخدمة مطلوب").max(80, "الاسم طويل جدًا"),
  description: z.string().trim().min(3, "الوصف مطلوب").max(300, "الوصف طويل جدًا"),
  duration: z.coerce.number().int().min(15, "المدة يجب أن تكون 15 دقيقة على الأقل"),
  price: z.coerce.number().min(0, "السعر غير صحيح"),
  image_url: z.string().trim().url("رابط الصورة غير صحيح").optional().or(z.literal("")),
  active: z.boolean(),
});

export type ServiceFormInput = z.input<typeof serviceSchema>;
export type ServiceFormValues = z.output<typeof serviceSchema>;
