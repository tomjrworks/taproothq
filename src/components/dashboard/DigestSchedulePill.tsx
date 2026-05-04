interface DigestSchedulePillProps {
  weekEndsAt: string;
}

function formatPill(weekEndsAt: string): string {
  const date = new Date(weekEndsAt);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    const month = date
      .toLocaleDateString("en-US", { month: "short" })
      .toLowerCase();
    return `sunday · ${month} ${date.getDate()}`;
  }

  return `sunday · ${diffDays}d ago`;
}

export default function DigestSchedulePill({
  weekEndsAt,
}: DigestSchedulePillProps) {
  return (
    <p className="font-mono text-xs tracking-wide text-bark/40 lowercase">
      {formatPill(weekEndsAt)}
    </p>
  );
}
