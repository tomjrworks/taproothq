import { describe, expect, it } from "vitest";
import config from "../../next.config.mjs";

// The table is duplicated here on purpose: this test reads the config Next actually uses.
const EXPECTED: Record<string, string> = {
  "/home": "/taproot",
  "/pricing": "/taproot/pricing",
  "/demo": "/taproot/demo",
  "/faq": "/taproot/faq",
  "/how-it-works": "/taproot/how-it-works",
  "/vs-memory": "/taproot/vs-memory",
  "/use-cases": "/taproot/use-cases",
  "/use-cases/:slug": "/taproot/use-cases/:slug",
  "/blog": "/taproot/blog",
  "/blog/:slug": "/taproot/blog/:slug",
  "/signup": "/sign-up",
};

const NEVER_A_SOURCE = [
  "/",
  "/about",
  "/services",
  "/work",
  "/privacy",
  "/terms",
  "/sign-in",
  "/sign-up",
  "/onboarding",
  "/dashboard",
  "/auth",
  "/api",
  "/taproot",
];

async function table() {
  return (await config.redirects?.()) ?? [];
}

describe("next.config redirects", () => {
  it.each(Object.entries(EXPECTED))(
    "%s -> %s is permanent",
    async (source, destination) => {
      const row = (await table()).find((r) => r.source === source);
      expect(row?.destination).toBe(destination);
      expect(row?.permanent).toBe(true);
    },
  );

  it("has exactly the locked rows", async () => {
    expect((await table()).map((r) => r.source).sort()).toEqual(
      Object.keys(EXPECTED).sort(),
    );
  });

  it("never takes over a Labs, app, API or legal route", async () => {
    const sources = (await table()).map((r) => r.source);
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) {
      for (const owned of NEVER_A_SOURCE) {
        const prefixOnly = owned === "/";
        expect(
          source === owned || (!prefixOnly && source.startsWith(`${owned}/`)),
        ).toBe(false);
      }
    }
  });
});
