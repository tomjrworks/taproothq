import { obsidianUri } from "@/lib/dashboard/obsidianUri";
import { formatRelativeTime } from "@/lib/dashboard/relativeTime";

const VISIBLE_CAP = 50;

type RecentItem = {
  path: string;
  modified_at: string;
  created_at: string;
};

type Props = {
  items: RecentItem[];
  vaultName: string | null;
};

type DayGroup = {
  key: string;
  label: string;
  items: RecentItem[];
};

// Day grouping uses the server's local TZ. UTC vs explicit-from-header is a
// known v1 limitation; revisit when the dashboard grows a per-user TZ field.
function dayKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function dayLabel(iso: string, now: Date): string {
  const d = new Date(iso);
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  if (sameDay) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();
  if (isYesterday) return "Yesterday";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function groupByDay(items: RecentItem[]): DayGroup[] {
  const now = new Date();
  const groups: DayGroup[] = [];
  let current: DayGroup | null = null;
  for (const item of items) {
    const key = dayKey(item.modified_at);
    if (!current || current.key !== key) {
      current = {
        key,
        label: dayLabel(item.modified_at, now),
        items: [item],
      };
      groups.push(current);
    } else {
      current.items.push(item);
    }
  }
  return groups;
}

function splitFolderAndName(path: string): { folder: string; name: string } {
  const idx = path.lastIndexOf("/");
  if (idx === -1) return { folder: "", name: path };
  return { folder: path.slice(0, idx), name: path.slice(idx + 1) };
}

export default function RecentAdditions({ items, vaultName }: Props) {
  const visible = items.slice(0, VISIBLE_CAP);

  if (visible.length === 0) {
    return (
      <p className="font-serif italic text-bark/40">
        no new shoots, <em className="text-forest-dark/75">yet.</em>
      </p>
    );
  }

  const groups = groupByDay(visible);

  return (
    <ol className="space-y-6">
      {groups.map((group) => (
        <li key={group.key}>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const { folder, name } = splitFolderAndName(item.path);
              const href = obsidianUri(vaultName, item.path);
              const noopHref = href === "#";
              return (
                <li key={`${item.path}:${item.modified_at}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={noopHref || undefined}
                    className="flex flex-col gap-0.5 rounded px-2 py-1.5 transition hover:bg-cream/60"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate font-serif text-sm text-bark">
                        {name}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-stone">
                        {formatRelativeTime(item.modified_at)}
                      </span>
                    </span>
                    {folder && (
                      <span className="truncate font-mono text-[10px] text-stone">
                        {folder}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}
