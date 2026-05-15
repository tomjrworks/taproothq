// Server-only — do not import from client components.
// Reads the published Sparkle appcast and surfaces the latest helper-mac
// version + DMG URL so the onboarding wizard never lags behind a release.
// Plan: /Users/miloman/.claude/plans/calm-prancing-hoare.md (D6).
import "server-only";

const APPCAST_URL = "https://updates.taproothq.com/appcast.xml";
const FETCH_TIMEOUT_MS = 3000;

export const FALLBACK_HELPER_VERSION = "0.1.13";
export const FALLBACK_DMG_URL = `https://downloads.taproothq.com/releases/v${FALLBACK_HELPER_VERSION}/TaprootHelper-${FALLBACK_HELPER_VERSION}.dmg`;

export type HelperRelease = {
  version: string;
  dmgUrl: string;
  source: "appcast" | "fallback";
};

export async function getLatestHelperRelease(): Promise<HelperRelease> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(APPCAST_URL, {
      signal: ctrl.signal,
      // 5-min Next.js cache — fresh helper releases appear on SITE within
      // ~5 minutes of the appcast going live. Avoids hitting Cloudflare on
      // every render.
      next: { revalidate: 300 },
    });
    clearTimeout(t);
    if (!res.ok) throw new Error(`appcast HTTP ${res.status}`);
    const xml = await res.text();
    const version =
      /<sparkle:shortVersionString>([\d.]+)<\/sparkle:shortVersionString>/.exec(
        xml,
      )?.[1];
    const dmgUrl = /<enclosure[^>]*\burl="([^"]+\.dmg)"/.exec(xml)?.[1];
    if (!version || !dmgUrl) throw new Error("appcast parse failed");
    return { version, dmgUrl, source: "appcast" };
  } catch (err) {
    console.warn("[helper-release] falling back to constant:", err);
    return {
      version: FALLBACK_HELPER_VERSION,
      dmgUrl: FALLBACK_DMG_URL,
      source: "fallback",
    };
  }
}
