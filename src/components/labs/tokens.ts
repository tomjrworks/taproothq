import type { CSSProperties } from "react";

// Plain values only, so client components can import them without pulling in anything server-side.

export type Mode = "light" | "dark";

export const T: Record<Mode, Record<string, string>> = {
  light: {
    "--bg": "#EAE5D6",
    "--paper": "#EAE5D6",
    "--ink": "#3D3529",
    "--muted": "#6E6555",
    "--rule": "#3D3529",
    "--hair": "rgba(61,53,41,.28)",
    "--accent": "#1A5C32",
    "--card": "#F1ECE0",
    "--btn": "#1A5C32",
    "--btn-ink": "#EFEBDF",
    "--mark-bg": "transparent",
  },
  dark: {
    "--bg": "#3D3529",
    "--paper": "#3D3529",
    "--ink": "#EEE8D6",
    "--muted": "#BDB4A0",
    "--rule": "#EEE8D6",
    "--hair": "rgba(238,232,214,.26)",
    "--accent": "#B3D99F",
    "--card": "#463D30",
    "--btn": "#B3D99F",
    "--btn-ink": "#3D3529",
    "--mark-bg": "#EEE8D6",
  },
};

export const W = "mx-auto max-w-[1280px] px-5 md:px-10";
export const label = "f-ar caps text-[11px] font-semibold";
export const btn =
  "f-ar caps text-[12px] font-semibold px-6 py-3.5 rounded-[4px] inline-flex items-center gap-2";
export const condensed =
  "f-ar-cond font-extrabold uppercase leading-[0.88] tracking-[-0.01em]";

export const input =
  "f-s4 w-full mt-2 px-3.5 py-3 rounded-[5px] bg-transparent text-[16px]";
export const field: CSSProperties = {
  border: "1px solid var(--rule)",
  color: "var(--ink)",
};
