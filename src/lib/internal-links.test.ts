import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Redirects are for inbound links only: nothing we ship may link through one, and Taproot's own
// pages must not point at "/" or "/about", which belong to Labs now.

const ROOT = path.resolve(__dirname, "../..");
const MOVED = [
  "home",
  "pricing",
  "demo",
  "faq",
  "how-it-works",
  "vs-memory",
  "use-cases",
  "blog",
  "signup",
];

const PATTERNS = [
  // a string literal or URL starting with a redirect source
  new RegExp(`["'\`(]/(${MOVED.join("|")})(?=["'\`/?#)])`),
  new RegExp(`taproothq\\.com/(${MOVED.join("|")})(?=["'\`/?#)\\s])`),
  // a link target that now belongs to Labs
  /["'`](\/|\/#[^"'`]*|\/about)["'`]/,
  /taproothq\.com\/(about)?(?=["'`)])/,
];

// `file:line — reason` for non-link uses and for the files that really do mean the Labs pages.
const ALLOWED = [
  "src/app/api/clients/[id]/connected/route.ts:6 — splits a URL path",
  "src/app/layout.tsx:39 — root default canonical, already on the backlog",
  "src/app/sitemap.ts:12 — the Labs home belongs in the sitemap",
  "src/app/sitemap.ts:13 — the Labs About belongs in the sitemap",
  "src/components/dashboard/RecentAdditions.tsx:72 — splits a file path",
  "src/lib/dashboard/buildTree.ts:69 — splits a file path",
  "src/lib/safeNext.ts:4 — a comment about path validation",
  "src/lib/safeNext.ts:12 — path validation",
];

function hits(text: string): number[] {
  return text
    .split("\n")
    .flatMap((line, i) => (PATTERNS.some((p) => p.test(line)) ? [i + 1] : []));
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const scanned = [
  ...walk(path.join(ROOT, "src")).filter(
    (f) =>
      /\.tsx?$/.test(f) &&
      !/\.test\.tsx?$/.test(f) &&
      !f.includes(`${path.sep}components${path.sep}labs${path.sep}`) &&
      !f.includes(`${path.sep}(labs)${path.sep}`),
  ),
  path.join(ROOT, "public/llms.txt"),
];

describe("internal links", () => {
  it("the scanner fires on every shape it is meant to catch", () => {
    for (const bad of [
      'href="/pricing"',
      "`/blog/${slug}`",
      '"/use-cases/research"',
      "[Demo](https://taproothq.com/demo)",
      'href="/"',
      'href="/#how-it-works"',
      'href: "/about"',
      "router.push('/')",
      "(https://taproothq.com/)",
      "(https://taproothq.com/about)",
    ]) {
      expect(hits(bad), bad).toEqual([1]);
    }
    for (const ok of [
      '"/taproot/pricing"',
      '"/images/blog/a.png"',
      '"/sign-up"',
      '"https://taproothq.com"',
      '"/taproot"',
    ]) {
      expect(hits(ok), ok).toEqual([]);
    }
    expect(scanned.length).toBeGreaterThan(100);
  });

  it("nothing links through a redirect or at a Labs route", () => {
    const found = scanned.flatMap((file) => {
      const rel = path.relative(ROOT, file);
      return hits(readFileSync(file, "utf8")).map((n) => `${rel}:${n}`);
    });
    const allowed = new Set(ALLOWED.map((a) => a.split(" — ")[0]));
    expect(found.filter((f) => !allowed.has(f))).toEqual([]);
  });

  it("the allowlist has no stale entries", () => {
    for (const entry of ALLOWED) {
      const [where] = entry.split(" — ");
      const [file, line] = where.split(/:(?=\d+$)/);
      expect(
        hits(readFileSync(path.join(ROOT, file), "utf8")),
        entry,
      ).toContain(Number(line));
    }
  });
});
