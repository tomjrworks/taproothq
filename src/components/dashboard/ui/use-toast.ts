"use client";

import * as React from "react";

export type ToastVariant = "default" | "destructive";

export type ToastData = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
};

let nextId = 0;
let toasts: ToastData[] = [];
const listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((fn) => fn());
}

function addToast(data: Omit<ToastData, "id">, duration = 4000) {
  const t: ToastData = { ...data, id: String(nextId++) };
  toasts = [t, ...toasts].slice(0, 5);
  notify();
  setTimeout(() => removeToast(t.id), duration);
  return t.id;
}

export function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function toast(data: Omit<ToastData, "id">, duration?: number) {
  return addToast(data, duration);
}

export function useToasts() {
  const [, rerender] = React.useReducer((x: number) => x + 1, 0);

  React.useEffect(() => {
    listeners.push(rerender);
    return () => {
      const idx = listeners.indexOf(rerender);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  return { toasts, removeToast };
}
