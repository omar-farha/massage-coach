import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-deep">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "h-12 w-full appearance-none rounded-xl border border-navy/12 bg-white px-4 pe-10 text-sm text-text outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20",
              error && "border-red-400 focus:border-red-400 focus:ring-red-100",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
