import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ar-EG").format(price)} جنيه`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hoursLabel = hours === 1 ? "ساعة" : "ساعتين";
  if (rest === 0) return hours > 2 ? `${hours} ساعات` : hoursLabel;
  return `${hours > 2 ? `${hours} ساعات` : hoursLabel} و${rest} دقيقة`;
}

export function formatDateArabic(date: string | Date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "EEEE d MMMM yyyy", { locale: ar });
}

export function formatDateShort(date: string | Date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMM yyyy", { locale: ar });
}

export function formatTimeArabic(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "م" : "ص";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function toWhatsAppLink(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("0") ? digits.slice(1) : digits;
  const international = local.startsWith("20") ? local : `20${local}`;
  const base = `https://wa.me/${international}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  confirmed: "مؤكد",
  cancelled: "ملغي",
  completed: "مكتمل",
};

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  completed: "bg-navy/5 text-navy ring-navy/20",
};
