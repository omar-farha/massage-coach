"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-deep shadow-sm shadow-navy/20 disabled:hover:bg-navy",
  secondary:
    "bg-gold text-navy-deep hover:bg-gold-light shadow-sm shadow-gold/30 disabled:hover:bg-gold",
  outline:
    "border border-navy/15 text-navy bg-white hover:border-gold hover:text-navy disabled:hover:border-navy/15",
  ghost: "text-navy hover:bg-navy/5 disabled:hover:bg-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
