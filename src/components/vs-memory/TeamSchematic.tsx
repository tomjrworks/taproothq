import SectionHeader from "@/components/vs-memory/SectionHeader";

const BARK = "#3d3529";
const FOREST = "#1A5C32";
const CREAM_DARK = "#DDD7C5";

function Person({
  cx,
  cy,
  label,
  faded,
}: {
  cx: number;
  cy: number;
  label: string;
  faded?: boolean;
}) {
  const opacity = faded ? 0.45 : 1;
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy - 14} r={9} fill={BARK} />
      <path
        d={`M ${cx - 18} ${cy + 22} Q ${cx} ${cy + 4} ${cx + 18} ${cy + 22}`}
        fill="none"
        stroke={BARK}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <text
        x={cx}
        y={cy + 46}
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={10}
        letterSpacing="0.2em"
        fill={BARK}
        opacity={0.55}
      >
        {label}
      </text>
    </g>
  );
}

function MemoryBubble({
  cx,
  cy,
  dim,
}: {
  cx: number;
  cy: number;
  dim?: boolean;
}) {
  const opacity = dim ? 0.4 : 0.85;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - 26}
        y={cy - 16}
        width={52}
        height={32}
        rx={4}
        fill="none"
        stroke={BARK}
        strokeDasharray="3 3"
        strokeWidth={1.2}
      />
      <circle cx={cx - 12} cy={cy} r={2} fill={BARK} />
      <circle cx={cx} cy={cy} r={2} fill={BARK} />
      <circle cx={cx + 12} cy={cy} r={2} fill={BARK} />
    </g>
  );
}

export default function TeamSchematic() {
  return (
    <section className="relative bg-cream-dark pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="When a team uses it" />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          Vendor memory is per-account.{" "}
          <em className="italic text-forest-dark">Taproot is per-workspace.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl">
          By design, not by feature toggle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-16 mt-16 md:mt-20">
          {/* Vendor side */}
          <div>
            <div className="inline-block">
              <p className="font-serif italic text-base md:text-lg text-bark/60 leading-tight">
                Vendor memory
              </p>
              <span className="block h-px w-full bg-bark/30 mt-1.5" />
            </div>

            <div className="mt-8 bg-cream rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-6 md:p-8">
              <svg
                viewBox="0 0 360 280"
                className="w-full h-auto block"
                aria-label="Three people each with their own siloed memory bubble"
              >
                {/* 3 isolated person+memory pairs */}
                <Person cx={70} cy={70} label="A" />
                <MemoryBubble cx={70} cy={150} dim />
                <line
                  x1={70}
                  y1={92}
                  x2={70}
                  y2={134}
                  stroke={BARK}
                  strokeWidth={1}
                  strokeDasharray="2 4"
                  opacity={0.5}
                />

                <Person cx={180} cy={70} label="B" />
                <MemoryBubble cx={180} cy={150} dim />
                <line
                  x1={180}
                  y1={92}
                  x2={180}
                  y2={134}
                  stroke={BARK}
                  strokeWidth={1}
                  strokeDasharray="2 4"
                  opacity={0.5}
                />

                <Person cx={290} cy={70} label="C" />
                <MemoryBubble cx={290} cy={150} dim />
                <line
                  x1={290}
                  y1={92}
                  x2={290}
                  y2={134}
                  stroke={BARK}
                  strokeWidth={1}
                  strokeDasharray="2 4"
                  opacity={0.5}
                />

                {/* Vertical separators between siloes */}
                <line
                  x1={125}
                  y1={40}
                  x2={125}
                  y2={210}
                  stroke={BARK}
                  strokeWidth={0.5}
                  strokeDasharray="2 6"
                  opacity={0.35}
                />
                <line
                  x1={235}
                  y1={40}
                  x2={235}
                  y2={210}
                  stroke={BARK}
                  strokeWidth={0.5}
                  strokeDasharray="2 6"
                  opacity={0.35}
                />

                {/* Caption */}
                <text
                  x={180}
                  y={250}
                  textAnchor="middle"
                  fontFamily="var(--font-fraunces), serif"
                  fontStyle="italic"
                  fontSize={13}
                  fill={BARK}
                  opacity={0.55}
                >
                  Three accounts, three private silos.
                </text>
              </svg>
            </div>

            <p className="font-serif text-base md:text-lg lg:text-xl text-bark/85 leading-[1.55] mt-6">
              Each teammate&rsquo;s memory is locked to their own account.
              Nothing crosses over.
            </p>
            <p className="font-serif italic text-sm md:text-base text-bark/55 mt-3">
              Their data model treats memory as user-personal. That&rsquo;s not
              a setting; it&rsquo;s the shape.
            </p>
          </div>

          {/* Taproot side */}
          <div>
            <div className="inline-block">
              <p className="font-serif italic text-base md:text-lg text-forest-dark leading-tight">
                Taproot
              </p>
              <span className="block h-px w-full bg-forest-dark mt-1.5" />
            </div>

            <div className="mt-8 bg-cream rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-6 md:p-8">
              <svg
                viewBox="0 0 360 280"
                className="w-full h-auto block"
                aria-label="Three people sharing one workspace-scoped memory layer"
              >
                <Person cx={70} cy={70} label="A" />
                <Person cx={180} cy={70} label="B" />
                <Person cx={290} cy={70} label="C" />

                {/* Connection lines into the shared layer */}
                <line
                  x1={70}
                  y1={92}
                  x2={70}
                  y2={166}
                  stroke={FOREST}
                  strokeWidth={1.4}
                />
                <line
                  x1={180}
                  y1={92}
                  x2={180}
                  y2={166}
                  stroke={FOREST}
                  strokeWidth={1.4}
                />
                <line
                  x1={290}
                  y1={92}
                  x2={290}
                  y2={166}
                  stroke={FOREST}
                  strokeWidth={1.4}
                />

                {/* The shared substrate layer — wide horizontal */}
                <rect
                  x={28}
                  y={166}
                  width={304}
                  height={40}
                  rx={4}
                  fill={CREAM_DARK}
                  stroke={FOREST}
                  strokeWidth={1.4}
                />
                <text
                  x={180}
                  y={191}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains-mono), monospace"
                  fontSize={10}
                  letterSpacing="0.25em"
                  fill={FOREST}
                >
                  WORKSPACE
                </text>

                {/* root downward — visual nod to the brand metaphor */}
                <path
                  d="M 180 206 Q 180 230 165 245 M 180 206 Q 180 230 195 245 M 180 206 L 180 250"
                  fill="none"
                  stroke={FOREST}
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  opacity={0.6}
                />

                <text
                  x={180}
                  y={272}
                  textAnchor="middle"
                  fontFamily="var(--font-fraunces), serif"
                  fontStyle="italic"
                  fontSize={13}
                  fill={BARK}
                  opacity={0.7}
                >
                  Three teammates, one shared substrate.
                </text>
              </svg>
            </div>

            <p className="font-serif text-base md:text-lg lg:text-xl text-bark/85 leading-[1.55] mt-6">
              Everyone reads from the same files. The team&rsquo;s memory IS the
              team&rsquo;s memory.
            </p>
            <p className="font-serif italic text-sm md:text-base text-bark/55 mt-3">
              Workspace-scoped from day one &mdash; an architectural choice, not
              an upsell tier.
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-24 max-w-3xl">
          <span className="block h-px w-12 bg-forest-dark/30 mb-6" />
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-bark leading-[1.35]">
            Vendor memory was built for <em className="italic">an account</em>.
          </p>
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-forest-dark leading-[1.35] mt-2">
            Taproot was built for the work an account does &mdash; alone or
            together.
          </p>
        </div>
      </div>
    </section>
  );
}
