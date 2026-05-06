// Tiny relative-time helper used by VaultTree (right-rail mtime) and
// RecentAdditions (per-item timestamp). Avoids pulling in date-fns just for
// "2h ago" formatting. Resolution stops at days — older items render via the
// caller's day-grouping label.

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatRelativeTime(
  iso: string,
  now: number = Date.now(),
): string {
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return "";

  const delta = now - ts;
  if (delta < MINUTE) return "just now";
  if (delta < HOUR) return `${Math.floor(delta / MINUTE)}m ago`;
  if (delta < DAY) return `${Math.floor(delta / HOUR)}h ago`;
  const days = Math.floor(delta / DAY);
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}
