"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 shadow-sm shadow-navy/5 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="#home" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="كابتن سلطان للمساج المنزلي"
            width={40}
            height={40}
            className="size-10 rounded-full object-cover ring-1 ring-gold/40"
            priority
          />
          <span
            className={cn(
              "hidden text-lg font-extrabold sm:block transition-colors",
              scrolled ? "text-navy-deep" : "text-white"
            )}
          >
            كابتن سلطان
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold",
                scrolled ? "text-text" : "text-white/85"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/booking">
            <Button size="md" variant={scrolled ? "primary" : "secondary"}>
              احجز موعدك
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          className={cn(
            "rounded-full p-2 transition-colors lg:hidden",
            scrolled ? "text-navy-deep" : "text-white"
          )}
          aria-label="افتح القائمة"
        >
          <Menu className="size-6" />
        </button>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white p-6 shadow-2xl lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <Image src="/logo.png" alt="كابتن سلطان" width={40} height={40} className="size-10 rounded-full" />
              <button onClick={() => setOpen(false)} className="rounded-full p-2 text-navy-deep" aria-label="إغلاق">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-3 py-3.5 text-base font-medium text-navy-deep hover:bg-navy/5"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <Link href="/booking" onClick={() => setOpen(false)}>
                <Button className="w-full" size="lg">
                  احجز موعدك
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
