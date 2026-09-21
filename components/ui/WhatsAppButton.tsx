import { toWhatsAppLink } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.45 1.07 2.86 1.22 3.06.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2Zm0 18.1c-1.68 0-3.24-.5-4.55-1.36l-.33-.2-3.02.79.8-2.93-.21-.34a8.1 8.1 0 0 1-1.25-4.32c0-4.49 3.65-8.14 8.15-8.14 4.48 0 8.13 3.65 8.13 8.14 0 4.49-3.65 8.15-8.13 8.15Z" />
    </svg>
  );
}

export function WhatsAppButton({
  phone,
  message,
  className,
  label,
}: {
  phone: string;
  message?: string;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={toWhatsAppLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      title="تواصل عبر واتساب"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-white",
        label ? "px-3 py-1.5 text-xs font-semibold" : "size-8 shrink-0",
        className
      )}
    >
      <WhatsAppIcon className="size-4" />
      {label}
    </a>
  );
}
