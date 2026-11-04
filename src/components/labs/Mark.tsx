/* eslint-disable @next/next/no-img-element */

/** The sprout mark with "Taproot Labs" typed beside it. */
export function Mark({
  size = 28,
  textClass,
  gap = 8,
}: {
  size?: number;
  textClass?: string;
  gap?: number;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <span
        style={{
          display: "inline-grid",
          placeItems: "center",
          width: size + 8,
          height: size + 8,
          borderRadius: 999,
          background: "var(--mark-bg, transparent)",
          transition: "background-color .5s",
        }}
      >
        <img
          src="/images/taproot-logo.png"
          alt=""
          style={{ height: size, width: "auto" }}
        />
      </span>
      <span className={textClass}>Taproot Labs</span>
    </span>
  );
}
