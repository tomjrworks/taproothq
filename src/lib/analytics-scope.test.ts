import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { needsCleanReload } from "./analytics-boundary";

// GA + Clarity load on public pages only (SEC-20261119-2): Clarity records what's on screen, and signed-in
// pages show vault file names. The probe can't reach /dashboard or /onboarding without a session, so this
// pins it in the source: one component holds the tags, and only the three public layouts render it.
const SRC = path.resolve(__dirname, "..");
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name)) : /\.(tsx?|mjs|js)$/.test(e.name) ? [path.join(dir, e.name)] : [],
  );
const rel = (f: string) => path.relative(path.resolve(SRC, ".."), f);
const containing = (re: RegExp) => files(SRC).filter((f) => !f.endsWith(".test.ts") && re.test(readFileSync(f, "utf8"))).map(rel).sort();

describe("analytics scope", () => {
  it("the scan finds a known string, so an empty answer below means something", () => {
    expect(containing(/BotIdClient/)).toContain("src/app/layout.tsx");
  });

  it("only PublicAnalytics names the GA or Clarity hosts or IDs", () => {
    expect(containing(/googletagmanager|clarity\.ms|NEXT_PUBLIC_GA_MEASUREMENT_ID|NEXT_PUBLIC_CLARITY_PROJECT_ID/)).toEqual([
      "src/components/PublicAnalytics.tsx",
    ]);
  });

  it("only the three public layouts render it", () => {
    expect(containing(/<PublicAnalytics\b/)).toEqual([
      "src/app/(labs)/layout.tsx",
      "src/app/(marketing)/layout.tsx",
      "src/app/taproot/layout.tsx",
    ]);
  });
});

describe("clean reload after a soft navigation", () => {
  const win = ({ running = true, mark = false, flag = null as string | null, throws = false } = {}) => {
    const store = new Map<string, string>(flag ? [["analytics-clean-reload", flag]] : []);
    const guard = <T,>(f: () => T) => () => { if (throws) throw new Error("blocked"); return f(); };
    return {
      ...(running ? { clarity: () => {}, gtag: () => {} } : {}),
      document: { querySelector: () => (mark ? {} : null) },
      sessionStorage: {
        getItem: (k: string) => guard(() => store.get(k) ?? null)(),
        setItem: (k: string, v: string) => guard(() => void store.set(k, v))(),
        removeItem: (k: string) => guard(() => void store.delete(k))(),
      },
      store,
    };
  };

  it("reloads an app page that inherited GA or Clarity", () => {
    const w = win();
    expect(needsCleanReload(w, "/sign-in")).toBe(true);
    expect(w.store.get("analytics-clean-reload")).toBe("/sign-in");
  });

  it("reloads on gtag alone, and on clarity alone", () => {
    expect(needsCleanReload({ ...win({ running: false }), gtag: () => {} }, "/dashboard")).toBe(true);
    expect(needsCleanReload({ ...win({ running: false }), clarity: () => {} }, "/dashboard")).toBe(true);
  });

  it("leaves a public page alone", () => {
    expect(needsCleanReload(win({ mark: true }), "/services")).toBe(false);
  });

  it("leaves a clean page alone and clears the flag, so the next crossing reloads again", () => {
    const w = win({ running: false, flag: "/sign-in" });
    expect(needsCleanReload(w, "/sign-in")).toBe(false);
    expect(w.store.has("analytics-clean-reload")).toBe(false);
  });

  it("stops after one reload of the same page", () => {
    expect(needsCleanReload(win({ flag: "/sign-in" }), "/sign-in")).toBe(false);
    expect(needsCleanReload(win({ flag: "/sign-in" }), "/dashboard")).toBe(true);
  });

  it("still reloads when storage is blocked", () => {
    expect(needsCleanReload(win({ throws: true }), "/sign-in")).toBe(true);
    expect(needsCleanReload(win({ throws: true, mark: true }), "/")).toBe(false);
  });

  it("never reloads a clean page when storage is blocked (no loop)", () => {
    expect(needsCleanReload(win({ running: false, throws: true }), "/dashboard")).toBe(false);
  });

  // A dataLayer can come from an extension or another tag; only GA's own gtag means GA is running.
  it("ignores a foreign dataLayer", () => {
    expect(needsCleanReload(Object.assign(win({ running: false }), { dataLayer: [] }), "/dashboard")).toBe(false);
  });

  it("only the root layout mounts the guard", () => {
    expect(containing(/<AnalyticsBoundary\b/)).toEqual(["src/app/layout.tsx"]);
  });
});
