import { scene, type SceneName } from "./sketch";

/**
 * Renders a procedural pen sketch. Lines use currentColor; leaf and
 * occluding shapes fill with var(--paper), so the wrapper sets both.
 */
export default function Engraving({
  name,
  className,
  fade = true,
  preserve = "xMidYMax slice",
  label,
}: {
  name: SceneName;
  className?: string;
  fade?: boolean;
  preserve?: string;
  label?: string;
}) {
  const sc = scene(name);
  return (
    <div className={className} style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${sc.w} ${sc.h}`}
        preserveAspectRatio={preserve}
        role="img"
        aria-label={label ?? "Pen sketch"}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          WebkitMaskImage: fade ? "linear-gradient(to bottom, #000 78%, transparent)" : undefined,
          maskImage: fade ? "linear-gradient(to bottom, #000 78%, transparent)" : undefined,
        }}
      >
        {sc.layers.map((l, i) => (
          <g key={i}>
            {l.occlude && <path d={l.occlude} fill="var(--paper)" />}
            {l.strokes.map((st) => (
              <path
                key={st.w}
                d={st.d}
                fill="none"
                stroke="currentColor"
                strokeWidth={st.w}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {l.leaves && (
              <path d={l.leaves} fill="var(--paper)" stroke="currentColor" strokeWidth={0.55} />
            )}
            {l.ink && <path d={l.ink} fill="currentColor" />}
            {l.hi && (
              <path d={l.hi} fill="none" stroke="var(--paper)" strokeWidth={0.6} strokeLinecap="round" />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
