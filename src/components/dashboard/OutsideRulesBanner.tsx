// F7 hook: surfaces the count of files flagged `outside_rules` once
// Workstream F's writer is live. Hidden when count===0 — the banner never
// flickers a meaningless "0 files" state during the gap between C ship and
// F ship.
//
// The View → link points to a `#outside-rules` placeholder until F lands the
// dashboard filter UI; the anchor is intentional (and harmless) so the layout
// stops here without a dead-end click target.
//
// Plan: /Users/miloman/.claude/plans/robust-skipping-key.md (C7).

type Props = {
  count: number;
};

export default function OutsideRulesBanner({ count }: Props) {
  if (count <= 0) return null;

  const noun = count === 1 ? "file" : "files";

  return (
    <aside
      role="status"
      aria-live="polite"
      className="mb-8 flex items-center justify-between gap-4 rounded-lg border border-cream-dark bg-cream/40 px-5 py-4"
    >
      <p className="font-serif text-base text-bark">
        <strong className="font-semibold">
          {count} {noun} growing wild.
        </strong>{" "}
        <em className="font-serif italic text-forest-dark/80">
          tend them when you&apos;re ready.
        </em>
      </p>
      <a
        href="#outside-rules"
        className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-forest-dark transition hover:text-forest-dark/70"
      >
        view →
      </a>
    </aside>
  );
}
