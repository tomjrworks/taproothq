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

// [group, path, expected status, markers in the body | redirect target path+query]
const rows = [
  ["labs-new", "/services", 200, ["What we", "AI training"]],
  ["labs-new", "/work", 200, ["Ask to see our work"]],
  ["app", "/sign-in", 200],
  ["app", "/sign-up", 200],
  ["app", "/onboarding", 307, "/sign-in?next=%2Fonboarding"],
  ["app", "/dashboard", 307, "/sign-in?next=%2Fdashboard"],
  ["control", "/no-such-page", 404],
];

let failed = 0;
for (const [group, path, status, expect] of rows) {
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
    measured = missing.length ? `missing ${JSON.stringify(missing)}` : `markers ok`;
    if (missing.length) problems.push(measured);
  }
  if (problems.length) failed++;
  console.log(`${problems.length ? "FAIL" : "ok  "} ${group.padEnd(10)} ${path} ${res.status} ${measured}${problems.length ? ` <- ${problems.join("; ")}` : ""}`);
}
console.log(failed ? `${failed} row(s) failed` : "all rows passed");
process.exit(failed ? 1 : 0);
