// Skeleton mirrors the C8 grid: header band, then a two-column body with a
// taller tree column on the left and a recent-additions column on the right.
// Cream-tinted shimmer rows so the wait reads as "soil settling," not "broken."

export default function DashboardLoading() {
  return (
    <div aria-busy="true" aria-live="polite" className="animate-pulse">
      <header className="mb-10">
        <div className="h-9 w-72 rounded bg-cream-dark/60" />
        <div className="mt-3 h-3 w-56 rounded bg-cream-dark/40" />
      </header>

      <div className="mt-2 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="mb-4 h-3 w-12 rounded bg-cream-dark/50" />
          <ul className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded px-2 py-1.5"
                style={{ paddingLeft: `${(i % 3) * 16 + 8}px` }}
              >
                <span className="h-3 w-3 rounded bg-cream-dark/40" />
                <span className="h-3 flex-1 rounded bg-cream-dark/40" />
                <span className="h-3 w-12 rounded bg-cream-dark/30" />
              </li>
            ))}
          </ul>
        </section>

        <aside>
          <div className="mb-4 h-3 w-20 rounded bg-cream-dark/50" />
          <ol className="space-y-6">
            {Array.from({ length: 3 }).map((_, day) => (
              <li key={day}>
                <div className="mb-2 h-3 w-16 rounded bg-cream-dark/50" />
                <ul className="space-y-2">
                  {Array.from({ length: 3 }).map((_, item) => (
                    <li
                      key={item}
                      className="flex flex-col gap-1 rounded px-2 py-1.5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="h-3 flex-1 rounded bg-cream-dark/40" />
                        <span className="h-3 w-10 shrink-0 rounded bg-cream-dark/30" />
                      </div>
                      <span className="h-2 w-32 rounded bg-cream-dark/30" />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
