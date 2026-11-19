export const PUBLIC_MARK = "data-public-analytics";
const KEY = "analytics-clean-reload";

export type Win = {
  clarity?: unknown;
  gtag?: unknown;
  document: { querySelector(s: string): unknown };
  sessionStorage: Pick<Storage, "getItem" | "setItem" | "removeItem">;
};

// GA + Clarity load on public pages only (SEC-20261119-2), but a soft navigation keeps them running in the
// tab. A page without the public layouts' mark gets one full reload, which brings it up without them.
// The flag stops a loop if they somehow survive the reload; it clears once a page is clean.
export function needsCleanReload(w: Win, path: string): boolean {
  // gtag, not dataLayer: anything can create a dataLayer, only GA's snippet defines gtag.
  const running = w.clarity !== undefined || w.gtag !== undefined;
  const isPublic = w.document.querySelector(`[${PUBLIC_MARK}]`) !== null;
  try {
    if (!running) {
      w.sessionStorage.removeItem(KEY);
      return false;
    }
    if (isPublic || w.sessionStorage.getItem(KEY) === path) return false;
    w.sessionStorage.setItem(KEY, path);
  } catch {
    // Blocked storage: no loop guard, so reload only what still needs it.
    return running && !isPublic;
  }
  return true;
}
