"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clock,
  LayoutDashboard,
  ListChecks,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/bookings", label: "الحجوزات", icon: ListChecks },
  { href: "/dashboard/calendar", label: "التقويم", icon: CalendarDays },
  { href: "/dashboard/customers", label: "العملاء", icon: Users },
  { href: "/dashboard/services", label: "الخدمات", icon: Sparkles },
  { href: "/dashboard/availability", label: "المواعيد", icon: Clock },
  { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {LINKS.map((link) => {
        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-navy text-white shadow-sm shadow-navy/20"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className="size-[18px]" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="relative hidden w-64 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy-deep to-navy lg:flex">
      <div className="bg-dot-navy pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-16 left-1/2 z-0 size-56 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative flex items-center gap-2.5 px-5 py-6">
        <Image src="/logo.png" alt="كابتن سلطان" width={38} height={38} className="size-9 rounded-full ring-1 ring-gold/40" />
        <div>
          <p className="text-sm font-extrabold text-white">كابتن سلطان</p>
          <p className="text-xs text-white/50">لوحة التحكم</p>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col">
        <SidebarNav />
      </div>
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-navy-deep/60" onClick={onClose} />
      <div className="absolute inset-y-0 start-0 flex w-72 flex-col overflow-hidden bg-gradient-to-b from-navy-deep to-navy">
        <div className="bg-dot-navy pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="كابتن سلطان" width={38} height={38} className="size-9 rounded-full ring-1 ring-gold/40" />
            <p className="text-sm font-extrabold text-white">كابتن سلطان</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-white/70 hover:bg-white/10">
            <X className="size-5" />
          </button>
        </div>
        <div className="relative" onClick={onClose}>
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
