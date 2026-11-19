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
  // a string literal, URL or `${SITE}` join starting with a redirect source
  new RegExp(`["'\`(}]/(${MOVED.join("|")})(?=["'\`/?#)])`),
  new RegExp(`taproothq\\.com/(${MOVED.join("|")})(?=["'\`/?#)\\s])`),
  // a link target that now belongs to Labs: "/" or "/about", with any query, hash or trailing slash
  /["'`}]\/(?:[?#][^"'`]*|about(?:[/?#][^"'`]*)?)?["'`]/,
  // the domain itself, its About, the same with a query or hash; not an email address or a subdomain
  /(?<![@\w.-])(?:www\.)?taproothq\.com(?:\/(?:about\/?)?)?(?:[?#][^"'`)\s]*)?(?=["'`)])/,
];

// `file:line — reason` for non-link uses and for the files that really do mean the Labs pages.
const ALLOWED = [
  "src/app/api/auth/sign-out/route.ts:8 — the base URL for the /taproot redirect",
  "src/app/api/clients/[id]/connected/route.ts:6 — splits a URL path",
  "src/app/layout.tsx:31 — the metadataBase constant (the root og:url default is on the backlog)",
  "src/app/layout.tsx:39 — root default canonical, already on the backlog",
  "src/app/sitemap.ts:4 — the base the sitemap joins every path to",
  "src/app/sitemap.ts:13 — the Labs home belongs in the sitemap",
  "src/app/sitemap.ts:14 — the Labs About belongs in the sitemap",
  "src/app/taproot/layout.tsx:4 — the base Taproot's structured data joins /taproot to",
  "src/components/dashboard/RecentAdditions.tsx:72 — splits a file path",
  "src/lib/dashboard/buildTree.ts:69 — splits a file path",
  "src/lib/proxy-handler.ts:6 — the allowed Origin for API calls, not a link",
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
      // a site constant joined to a moved path or a Labs path
      "`${SITE}/pricing`",
      "`${SITE}/`",
      "`${SITE}/about`",
      // the Labs home or About with a query, a hash or a trailing slash
      '"/?from=x"',
      '"/about#team"',
      '"/about/"',
      // the bare domain is the Labs home now
      '"https://taproothq.com"',
      '"https://www.taproothq.com/"',
      '"https://taproothq.com/?ref=x"',
    ]) {
      expect(hits(bad), bad).toEqual([1]);
    }
    for (const ok of [
      '"/taproot/pricing"',
      '"/images/blog/a.png"',
      '"/sign-up"',
      '"/taproot"',
      '"/about-us"',
      '"//cdn.example.com/a.js"',
      "`${SITE}/taproot/pricing`",
      '"https://taproothq.com/taproot"',
      '"https://taproothq.com/images/a.png"',
      '"tom@taproothq.com"',
      '"Taproot Labs <forms@taproothq.com>"',
      '"https://connect.taproothq.com"',
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
