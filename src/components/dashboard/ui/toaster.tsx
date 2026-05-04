"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { useToasts, removeToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToasts();

  return (
    <ToastPrimitive.Provider>
      {toasts.map((t) => (
        <ToastPrimitive.Root
          key={t.id}
          open
          onOpenChange={(open) => {
            if (!open) removeToast(t.id);
          }}
          className={cn(
            "bg-cream border border-bark/15 rounded-lg p-4 shadow-lg flex items-start gap-3 w-[380px] max-w-[calc(100vw-2rem)]",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0",
            "duration-150",
            t.variant === "destructive" && "border-red-700/30 bg-red-50",
          )}
        >
          <div className="flex-1 min-w-0">
            {t.title && (
              <ToastPrimitive.Title
                className={cn(
                  "font-sans text-sm font-medium text-bark",
                  t.variant === "destructive" && "text-red-800",
                )}
              >
                {t.title}
              </ToastPrimitive.Title>
            )}
            {t.description && (
              <ToastPrimitive.Description className="font-sans text-sm text-bark/60 mt-0.5">
                {t.description}
              </ToastPrimitive.Description>
            )}
          </div>
          <ToastPrimitive.Close className="font-mono text-xs text-bark/30 hover:text-bark transition-colors shrink-0 focus-visible:outline-none">
            ✕
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" />
    </ToastPrimitive.Provider>
  );
}
