#!/usr/bin/env node
// Route table probe. usage: node scripts/probe-routes.mjs <BASE_URL> [--only g1,g2] [--skip g1,g2]
// Prints the measured status/location/marker per row and exits 1 on any mismatch.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const flag = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i < 0 ? null : process.argv[i + 1].split(",");
};
const only = flag("only");
const skip = flag("skip") ?? [];

// [group, path, expected status, markers in the body | redirect target path+query, strings that must be absent]
const SITE = "https://taproothq.com";
const canonical = (path) => [`rel="canonical" href="${SITE}${path}"`];
const POST = "passive-income-but-for-your-data";

const rows = [
  ["labs", "/", 200, ["We build", "Taproot Labs"], ["SoftwareApplication"]],
  ["labs", "/about", 200, ["A small studio", ...canonical("/about")], ["The team and the thesis"]],
  ["labs-new", "/services", 200, ["What we", "AI training", ...canonical("/services")]],
  ["labs-new", "/work", 200, ["Ask to see our work", ...canonical("/work")]],

  ["taproot", "/taproot", 200, ["SoftwareApplication", ...canonical("/taproot")]],
  ...[
    "about",
    "blog",
    `blog/${POST}`,
    "demo",
    "faq",
    "how-it-works",
    "pricing",
    "use-cases",
    "use-cases/research",
    "use-cases/business",
    "use-cases/creative",
    "use-cases/personal",
    "vs-memory",
  ].map((p) => ["taproot", `/taproot/${p}`, 200, canonical(`/taproot/${p}`)]),
  ["taproot", "/taproot/preview/expansion-2up", 200],

  ["redirect", "/home", 308, "/taproot"],
  ["redirect", "/pricing", 308, "/taproot/pricing"],
  ["redirect", "/pricing?plan=year", 308, "/taproot/pricing?plan=year"],
  ["redirect", "/demo", 308, "/taproot/demo"],
  ["redirect", "/faq", 308, "/taproot/faq"],
  ["redirect", "/how-it-works", 308, "/taproot/how-it-works"],
  ["redirect", "/vs-memory", 308, "/taproot/vs-memory"],
  ["redirect", "/use-cases", 308, "/taproot/use-cases"],
  ["redirect", "/use-cases/research", 308, "/taproot/use-cases/research"],
  ["redirect", "/blog", 308, "/taproot/blog"],
  ["redirect", `/blog/${POST}`, 308, `/taproot/blog/${POST}`],
  ["redirect", "/signup", 308, "/sign-up"],

  ["legal", "/privacy", 200],
  ["legal", "/terms", 200],

  ["app", "/sign-in", 200],
  ["app", "/sign-up", 200],
  ["app", "/onboarding", 307, "/sign-in?next=%2Fonboarding"],
  ["app", "/dashboard", 307, "/sign-in?next=%2Fdashboard"],

  [
    "sitemap",
    "/sitemap.xml",
    200,
    ["/services<", "/work<", "/about<", "/taproot<", "/taproot/about<", "/taproot/pricing<", "/privacy<", "/terms<"],
    ["com/pricing<", "com/demo<", "com/faq<", "com/how-it-works<", "com/vs-memory<", "com/use-cases", "com/blog", "com/home<", "/preview/"],
  ],
  ["llms", "/llms.txt", 200, ["taproothq.com/taproot)", "taproothq.com/taproot/about)", "taproothq.com/privacy)"], ["taproothq.com/pricing", "taproothq.com/about"]],

  ["gone", "/studio", 404],
  ["gone", "/studio/labs", 404],
  ["control", "/no-such-page", 404],
];

let failed = 0;
for (const [group, path, status, expect, absent = []] of rows) {
  if ((only && !only.includes(group)) || skip.includes(group)) continue;
  const res = await fetch(base + path, { redirect: "manual" });
  const problems = [];
  if (res.status !== status) problems.push(`status ${res.status}, want ${status}`);
  let measured = "";
  if (typeof expect === "string") {
    const loc = res.headers.get("location");
    const u = loc ? new URL(loc, base) : null;
    measured = u ? u.pathname + u.search : "(no location)";
    if (measured !== expect) problems.push(`location ${measured}, want ${expect}`);
  } else if (expect) {
    const body = await res.text();
    const missing = expect.filter((m) => !body.includes(m));
    const present = absent.filter((m) => body.includes(m));
    measured = `markers ${expect.length - missing.length}/${expect.length}, absent ${absent.length - present.length}/${absent.length}`;
    if (missing.length) problems.push(`missing ${JSON.stringify(missing)}`);
    if (present.length) problems.push(`present ${JSON.stringify(present)}`);
  }
  if (problems.length) failed++;
  console.log(`${problems.length ? "FAIL" : "ok  "} ${group.padEnd(10)} ${path} ${res.status} ${measured}${problems.length ? ` <- ${problems.join("; ")}` : ""}`);
}
console.log(failed ? `${failed} row(s) failed` : "all rows passed");
process.exit(failed ? 1 : 0);
