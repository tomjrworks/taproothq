import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-cream-dark/40 rounded-lg border border-bark/8 p-8",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";
