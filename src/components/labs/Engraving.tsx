import { scene, type SceneName } from "./sketch";

/**
 * Draws a pen sketch from its file at /art/<name>.svg: inlined, one drawing is 2 MB and
 * travels twice in every page. Lines use currentColor and leaf and occluding shapes use
 * var(--paper); both inherit through `use`, so the wrapper still sets the theme.
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
  const { w, h } = scene(name);
  return (
    <div className={className} style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
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
        <use href={`/art/${name}.svg#art`} />
      </svg>
    </div>
  );
}
