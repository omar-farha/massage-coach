import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-deep">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "min-h-28 w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted/70 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
