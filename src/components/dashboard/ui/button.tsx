import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-dark/40",
  {
    variants: {
      variant: {
        primary:
          "bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest rounded px-8 py-4 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(26,92,50,0.25)] active:translate-y-0",
        secondary:
          "border border-bark/20 text-bark font-mono text-xs uppercase tracking-widest rounded px-8 py-4 hover:border-forest-dark/40 hover:text-forest-dark",
        ghost:
          "text-bark/50 hover:text-forest-dark font-sans text-sm px-3 py-1.5 rounded",
        destructive:
          "bg-red-700 text-cream font-mono text-xs uppercase tracking-widest rounded px-8 py-4 hover:bg-red-800 active:translate-y-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
