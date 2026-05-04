import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full bg-cream border border-bark/15 rounded px-4 py-3 font-sans text-sm text-bark placeholder-bark/30 focus:outline-none focus:border-forest-dark/60 transition-colors",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
