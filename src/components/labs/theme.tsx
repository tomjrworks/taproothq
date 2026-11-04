"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { T, type Mode } from "./tokens";

const Ctx = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({
  mode: "light",
  setMode: () => {},
});

/** Holds the theme for the whole Labs group. Rendered by the layout, so it survives page navigation. */
export function ThemeShell({
  initial,
  children,
}: {
  initial: Mode;
  children: ReactNode;
}) {
  const [mode, setModeState] = useState<Mode>(initial);

  // Coming Back from outside the group can restore a layout rendered with an older cookie.
  useEffect(() => {
    const saved = document.cookie.match(/(?:^|; )labs-theme=(dark|light)/);
    if (saved) setModeState(saved[1] as Mode);
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    document.cookie = `labs-theme=${m}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <Ctx.Provider value={{ mode, setMode }}>
      <div
        data-mode={mode}
        style={{
          ...(T[mode] as CSSProperties),
          background: "var(--bg)",
          color: "var(--ink)",
          minHeight: "100vh",
          transition: "background-color .5s ease, color .5s ease",
        }}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

/** The DARK / LIGHT pill in the header. */
export function ThemeToggle({ labelClass }: { labelClass?: string }) {
  const { mode, setMode } = useContext(Ctx);
  const btn = (m: Mode, text: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
      className={labelClass}
      style={{
        padding: "5px 10px",
        background: mode === m ? "var(--ink)" : "transparent",
        color: mode === m ? "var(--bg)" : "var(--ink)",
        transition: "background-color .3s, color .3s",
      }}
    >
      {text}
    </button>
  );
  return (
    <div
      style={{
        display: "inline-flex",
        border: "1px solid var(--ink)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {btn("dark", "DARK")}
      {btn("light", "LIGHT")}
    </div>
  );
}
