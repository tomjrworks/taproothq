#!/usr/bin/env node
import { createHash } from "node:crypto";

// Route table probe. usage: node scripts/probe-routes.mjs <BASE_URL> [--only g1,g2] [--skip g1,g2]
// Prints the measured status/location/marker per row and exits 1 on any mismatch.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const flag = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i < 0 ? null : process.argv[i + 1].split(",");
};
const only = flag("only");
const skip = flag("skip") ?? [];
const want = (group) => (!only || only.includes(group)) && !skip.includes(group);
const md5 = (bytes) => createHash("md5").update(bytes).digest("hex");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// [group, path, expected status, markers in the body | redirect target path+query, strings that must be absent]
const SITE = "https://taproothq.com";
const canonical = (path) => [`rel="canonical" href="${SITE}${path}"`];
const POST = "passive-income-but-for-your-data";

const rows = [
  ["labs", "/", 200, ["We build", "Taproot Labs"], ["SoftwareApplication"]],
  ["labs", "/about", 200, ["A small studio", ...canonical("/about")], ["The team and the thesis"]],
  ["labs-new", "/services", 200, ["What we", "AI training", ...canonical("/services")]],
  ["labs-new", "/work", 200, ["Ask to see our work", ...canonical("/work")]],

  // Structured data names /taproot as the product's home: the bare domain is the Labs home now.
  ["taproot", "/taproot", 200, ["SoftwareApplication", ...canonical("/taproot"), '"name":"Taproot","url":"https://taproothq.com/taproot"'], ['"url":"https://taproothq.com"']],
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

  [
    "legal",
    "/privacy",
    200,
    [
      "whatever else you type into a form on this site",
      "we keep what you sent",
      "anything you send us through a form",
      "or ask to see it",
      "your notes live on your Mac with an encrypted copy in our cloud",
      "Taproot keeps an encrypted copy in the cloud so your AI can reach them",
      "through Google Analytics and Microsoft Clarity",
      "The contact forms on this site are masked in those recordings",
      "so we could read your notes",
      "Microsoft Clarity</span> records how people use the site",
      "Effective November 19, 2026",
      "and checks that form submissions come from a person, not a bot",
    ],
    ["which is just your email", "we just keep your email", "We have no copy of it", "not ours", "stays on your machine", "That’s it", "Effective April 27, 2026"],
  ],
  ["legal", "/terms", 200],

  ["api", "/api/contact", 405],

  ["app", "/sign-in", 200],
  ["app", "/sign-up", 200],
  ["app", "/onboarding", 307, "/sign-in?next=%2Fonboarding"],
  ["app", "/dashboard", 307, "/sign-in?next=%2Fdashboard"],

  ["llms", "/llms.txt", 200, ["taproothq.com/taproot)", "taproothq.com/taproot/about)", "taproothq.com/privacy)"], ["taproothq.com/pricing", "taproothq.com/about"]],

  ["gone", "/studio", 404],
  ["gone", "/studio/labs", 404],
  ["control", "/no-such-page", 404],
];

let failed = 0;
const checker = (group) => (label, problems, measured) => {
  if (problems.length) failed++;
  console.log(`${problems.length ? "FAIL" : "ok  "} ${group.padEnd(10)} ${label} ${measured}${problems.length ? ` <- ${problems.join("; ")}` : ""}`);
};

for (const [group, path, status, expect, absent = []] of rows) {
  if (!want(group)) continue;
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
  checker(group)(`${path} ${res.status}`, problems, measured);
}

// The sitemap: every page we want indexed, the home included, and nothing outside the routes we serve.
if (want("sitemap")) {
  const check = checker("sitemap");
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  const POSTS = ["youve-been-fooled-by-how-you-file-your-documents", "passive-income-but-for-your-data", "inefficiency-is-the-scariest-word", "why-i-dont-worry-about-ais-environmental-impact"];
  const need = ["/", "/about", "/services", "/work", "/taproot", "/taproot/about", "/taproot/pricing", "/taproot/blog", ...POSTS.map((s) => `/taproot/blog/${s}`), "/privacy", "/terms"];
  const missing = need.filter((p) => !locs.includes(SITE + p));
  const served = (p) => ["/", "/about", "/services", "/work", "/privacy", "/terms", "/taproot"].includes(p) || (p.startsWith("/taproot/") && !p.startsWith("/taproot/preview/"));
  const stray = locs.filter((u) => !u.startsWith(`${SITE}/`) || !served(u.slice(SITE.length)));
  const problems = [];
  if (missing.length) problems.push(`missing ${JSON.stringify(missing)}`);
  if (stray.length) problems.push(`stray ${JSON.stringify(stray)}`);
  check("/sitemap.xml", problems, `${locs.length} entries, ${need.length - missing.length}/${need.length} required, ${stray.length} stray`);
}

// Share cards and structured data: every Labs page shows its own card, /taproot keeps the Taproot one.
const meta = (html, attr, name) =>
  html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]+)"`))?.[1];
const pathOf = (url) => new URL(url, base).pathname;

async function image(url) {
  const res = await fetch(new URL(pathOf(url), base));
  const bytes = Buffer.from(await res.arrayBuffer());
  return {
    status: res.status,
    type: res.headers.get("content-type"),
    width: bytes.readUInt32BE(16), // PNG IHDR
    height: bytes.readUInt32BE(20),
    md5: md5(bytes),
  };
}

if (want("share")) {
  const check = checker("share");
  const LABS_ORG = '{"@context":"https://schema.org","@type":"Organization","name":"Taproot Labs","url":"https://taproothq.com","logo":"https://taproothq.com/images/taproot-logo.png"}';

  const html = await (await fetch(`${base}/taproot`)).text();
  const og = meta(html, "property", "og:image");
  const tw = meta(html, "name", "twitter:image");
  const taprootCard = og ? await image(og) : null;
  const problems = [];
  // Compare the path: the file convention adds a hash to the query.
  if (!og || pathOf(og) !== "/taproot/opengraph-image.png") problems.push(`og:image ${og}`);
  if (!tw || pathOf(tw) !== "/taproot/twitter-image.png") problems.push(`twitter:image ${tw}`);
  else {
    const img = await image(tw);
    if (img.status !== 200 || img.type !== "image/png" || img.width !== 1200 || img.height !== 630) problems.push(`twitter:image ${img.status} ${img.type} ${img.width}x${img.height}`);
  }
  if (!html.includes(`rel="canonical" href="${SITE}/taproot"`)) problems.push("canonical");
  if (meta(html, "property", "og:url") !== `${SITE}/taproot`) problems.push(`og:url ${meta(html, "property", "og:url")}`);
  if (html.includes(LABS_ORG)) problems.push("carries the Labs structured data");
  check("/taproot", problems, `${og ? pathOf(og) : "(no og:image)"} ${tw ? pathOf(tw) : "(no twitter:image)"}`);

  for (const page of ["/", "/about", "/services", "/work"]) {
    const pageHtml = await (await fetch(base + page)).text();
    for (const [attr, name] of [["property", "og:image"], ["name", "twitter:image"]]) {
      const url = meta(pageHtml, attr, name);
      const pageProblems = [];
      let measured = "(missing)";
      if (!url) pageProblems.push(`no ${name}`);
      else {
        const img = await image(url);
        measured = `${pathOf(url)} ${img.status} ${img.type} ${img.width}x${img.height} ${img.md5.slice(0, 8)}`;
        if (img.status !== 200) pageProblems.push(`status ${img.status}`);
        if (img.type !== "image/png") pageProblems.push(`type ${img.type}`);
        if (img.width !== 1200 || img.height !== 630) pageProblems.push(`size ${img.width}x${img.height}`);
        if (img.md5 === taprootCard?.md5) pageProblems.push("same bytes as the Taproot card");
      }
      check(`${page} ${name}`, pageProblems, measured);
    }
    const ogUrl = meta(pageHtml, "property", "og:url");
    const wantUrl = page === "/" ? SITE : SITE + page;
    const ldProblems = [];
    if (ogUrl !== wantUrl) ldProblems.push(`og:url ${ogUrl}, want ${wantUrl}`);
    if (!pageHtml.includes(LABS_ORG)) ldProblems.push("no Labs Organization structured data");
    if (pageHtml.includes("SoftwareApplication")) ldProblems.push("carries Taproot's structured data");
    check(`${page} og:url + structured data`, ldProblems, ogUrl ?? "(no og:url)");
  }
}

// Analytics on public pages only (S2). Opt-in (--only analytics) and only against a build made with dummy,
// non-empty NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_CLARITY_PROJECT_ID: a blank build shows 0 tags everywhere.
if (only?.includes("analytics")) {
  const check = checker("analytics");
  const TAGS = ["googletagmanager.com/gtag/js", "clarity.ms/tag/"];
  const pub = ["/", "/about", "/services", "/work", "/taproot", "/taproot/pricing", "/taproot/blog", "/privacy", "/terms"];
  const priv = ["/sign-in", "/sign-up", "/no-such-page"];
  for (const page of [...pub, ...priv]) {
    const html = await (await fetch(base + page)).text();
    const found = TAGS.filter((t) => html.includes(t));
    const want = pub.includes(page) ? TAGS.length : 0;
    check(page, found.length === want ? [] : [`${found.length} tags, want ${want}`], `tags ${found.length}/${TAGS.length}`);
  }
}

// Page weight: the drawings stay out of the pages, and the browser can keep its one copy.
if (want("weight")) {
  const check = checker("weight");
  const MAX_PAGE_BYTES = 300_000;
  for (const page of ["/", "/about", "/services", "/work"]) {
    const html = await (await fetch(base + page)).text();
    const bytes = Buffer.byteLength(html);
    const problems = [];
    if (bytes > MAX_PAGE_BYTES) problems.push(`over ${MAX_PAGE_BYTES}`);
    if (!html.includes('href="/art/orchard.svg#art"')) problems.push("no orchard reference");
    check(page, problems, `${bytes} bytes`);
  }
  const res = await fetch(`${base}/art/orchard.svg`);
  const type = res.headers.get("content-type");
  const cache = res.headers.get("cache-control");
  const problems = [];
  if (type !== "image/svg+xml") problems.push(`type ${type}`);
  if (!/max-age=[1-9]/.test(cache ?? "")) problems.push(`cache-control ${cache}`);
  // Printed, not asserted: next start sends it uncompressed; production's edge is expected to compress.
  check("/art/orchard.svg", problems, `${type} ${cache} encoding=${res.headers.get("content-encoding") ?? "none"}`);
}

// Landmarks: the contact section sits inside <main>, and both navs mark the current page.
if (want("a11y")) {
  const check = checker("a11y");
  for (const [page, current] of [["/", 0], ["/about", 2], ["/services", 2], ["/work", 2]]) {
    const html = await (await fetch(base + page)).text();
    const marked = html.split('aria-current="page"').length - 1;
    const [open, contact, close] = ["<main", 'id="contact"', "</main>"].map((s) => html.indexOf(s));
    const problems = [];
    if (marked !== current) problems.push(`aria-current ${marked}, want ${current}`);
    if (!(open >= 0 && open < contact && contact < close)) problems.push("contact section outside <main>");
    check(page, problems, `aria-current ${marked}, <main ${open} < contact ${contact} < </main> ${close}`);
  }
}

// The drawings, last: exact bytes per scene (the seeds are fixed), so a wrong drawing can't pass, then
// requests that must never change one. Production paths are case-sensitive, so a case variant 404s
// there; on a case-insensitive disk next start serves orchard's own file for it, which is fine. Any
// other drawing means the real file was written over.
if (want("art")) {
  const check = checker("art");
  const ART = {
    orchard: [2_151_124, "dd60fb6e457c37372f047d1b0a34fa45"],
    workshop: [1_199_262, "4a084cb543b6afc2e35a39bb27e168f2"],
    "bg-endpaper": [54_664, "dca76ca21728aa29c7ecce860bf21784"],
  };
  const get = async (path) => {
    const res = await fetch(base + path, { redirect: "manual" });
    const bytes = Buffer.from(await res.arrayBuffer());
    return { status: res.status, size: bytes.length, md5: md5(bytes) };
  };
  const is = (name, got) => got.status === 200 && got.size === ART[name][0] && got.md5 === ART[name][1];
  const drawn = (got) => Object.keys(ART).find((n) => got.size === ART[n][0] && got.md5 === ART[n][1]) ?? "no drawing";
  const show = (got) => `${got.status} ${got.size} md5 ${got.md5.slice(0, 10)} (${drawn(got)})`;

  for (const name of Object.keys(ART)) {
    const got = await get(`/art/${name}.svg`);
    check(`/art/${name}.svg`, is(name, got) ? [] : ["not the pinned bytes"], show(got));
  }
  const unknown = await get("/art/no-such-scene.svg");
  check("/art/no-such-scene.svg", unknown.status === 404 ? [] : ["want 404"], show(unknown));
  // The route's own literal path: next start answers it with a router error before the handler; never a drawing.
  const literal = await get("/art/%5Bname%5D");
  check("/art/%5Bname%5D", literal.status !== 200 && drawn(literal) === "no drawing" ? [] : ["served a drawing"], show(literal));
  for (const round of [1, 2]) {
    if (round === 2) await sleep(2500); // past the 1 s revalidate Next gives a path it didn't prerender
    const got = await get("/art/Orchard.svg");
    check(`/art/Orchard.svg #${round}`, got.status === 404 || is("orchard", got) ? [] : ["neither a 404 nor orchard's bytes"], show(got));
  }
  await sleep(1000);
  const after = await get("/art/orchard.svg");
  check("/art/orchard.svg after the requests above", is("orchard", after) ? [] : ["the real file was written over"], show(after));
}

console.log(failed ? `${failed} row(s) failed` : "all rows passed");
process.exit(failed ? 1 : 0);
