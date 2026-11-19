import { describe, expect, it } from "vitest";
import config from "../../next.config.mjs";

// botid's client posts its challenge to same-origin paths; withBotId rewrites them to Vercel.
describe("next.config BotID", () => {
  it("proxies the challenge paths to Vercel's bot protection", async () => {
    const rewrites = await config.rewrites?.();
    const list = Array.isArray(rewrites) ? rewrites : [...(rewrites?.beforeFiles ?? []), ...(rewrites?.afterFiles ?? [])];
    const destinations = list.map((r) => r.destination);
    expect(destinations.length).toBeGreaterThanOrEqual(2);
    for (const d of destinations) expect(d.startsWith("https://api.vercel.com/bot-protection/")).toBe(true);
  });

  it("keeps the redirects and unoptimized images", async () => {
    expect((await config.redirects?.())?.length).toBeGreaterThan(0);
    expect(config.images?.unoptimized).toBe(true);
  });
});
