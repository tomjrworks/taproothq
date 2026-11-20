import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { scene, type SceneName } from "@/components/labs/sketch";
import { GET } from "./route";

// Bytes as built at f46850d. The seeds are fixed, so any change here is a change to a drawing.
const PINS = {
  "orchard.svg": [2_151_124, "dd60fb6e457c37372f047d1b0a34fa45"],
  "workshop.svg": [1_199_262, "4a084cb543b6afc2e35a39bb27e168f2"],
  "bg-endpaper.svg": [54_664, "dca76ca21728aa29c7ecce860bf21784"],
} as const;

const get = (name: string) => GET(new Request(`http://localhost/art/${name}`), { params: { name } });

describe("/art/[name]", () => {
  it.each(Object.entries(PINS))("serves %s unchanged", async (name, [bytes, md5]) => {
    const res = get(name);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/svg+xml");
    const body = Buffer.from(await res.arrayBuffer());
    expect([body.length, createHash("md5").update(body).digest("hex")]).toEqual([bytes, md5]);
  });

  // On a case-insensitive disk, `next start` serves /art/Orchard.svg from orchard's cached file and then
  // stores whatever the handler returns over that file. Throwing is the one answer it doesn't store.
  it.each([
    "Orchard.svg",
    "ORCHARD.svg",
    "bg-endpaper.ſvg", // long s, which APFS folds to "s"
    "nope.svg",
    "orchard",
    "orchard.svg.svg",
    "[name]",
    "__proto__.svg",
    "constructor.svg",
  ])("throws instead of drawing anything for %s", (name) => {
    expect(() => get(name)).toThrow();
  });

  it("never falls through to the endpaper for an unknown scene", () => {
    expect(() => scene("Orchard" as SceneName)).toThrow();
  });
});
