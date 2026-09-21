"use client";

import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { signOut } from "@/lib/dashboard/auth";
import { MobileSidebar } from "./Sidebar";

export function Topbar({ title, userEmail }: { title: string; userEmail?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy/8 bg-white/90 px-5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-navy-deep hover:bg-navy/5 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="text-lg font-bold text-navy-deep">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {userEmail && <span className="hidden text-sm text-text-muted sm:block">{userEmail}</span>}
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-full border border-navy/10 px-3.5 py-2 text-sm font-medium text-navy-deep transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </form>
        </div>
      </header>

      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
