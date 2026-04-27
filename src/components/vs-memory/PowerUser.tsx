import SectionHeader from "@/components/vs-memory/SectionHeader";

type Axis = {
  name: string;
  vendor: string;
  taproot: string;
};

const AXES: Axis[] = [
  {
    name: "Substrate",
    vendor: "A vendor-controlled database. You don’t see the schema.",
    taproot: "Markdown files on disk, encrypted-mirrored to your account.",
  },
  {
    name: "Cross-AI",
    vendor:
      "One product per memory. Each vendor’s lock-in is the business model.",
    taproot:
      "Any MCP-speaking client — Claude, Cursor, Windsurf, Copilot — reads the same files.",
  },
  {
    name: "Retrieval",
    vendor:
      "Black-box reach. You see what the AI returned, never the steps it took.",
    taproot:
      "The retrieval is in the open: garden_find, garden_read, the file Claude opened, the line it pulled.",
  },
  {
    name: "Information shape",
    vendor: "A flat list of facts about you.",
    taproot:
      "Folders, sources, links, tags, frontmatter — the structure you already use to think.",
  },
  {
    name: "Persistence",
    vendor:
      "Bound to vendor lifecycle. If the vendor sunsets the feature, your memory goes with it.",
    taproot:
      "Your file survives anything. Stays readable without Taproot running.",
  },
];

export default function PowerUser() {
  return (
    <section className="relative bg-cream pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="For the deeper look" />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          The same five gaps,{" "}
          <em className="italic text-forest-dark">one layer down.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl">
          For the buyer who wants the architectural version. Same five axes,
          tighter words.
        </p>

        <div className="mt-16 md:mt-20">
          {AXES.map((a) => (
            <div
              key={a.name}
              className="border-t border-bark/15 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[8rem_1fr_1fr] gap-y-3 gap-x-8 md:gap-x-12"
            >
              <p className="font-serif italic text-xl md:text-2xl text-forest-dark leading-tight tracking-tight">
                {a.name}
              </p>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bark/45">
                  Vendor memory
                </p>
                <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.5] mt-2">
                  {a.vendor}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-forest-dark/70">
                  Taproot
                </p>
                <p className="font-serif text-base md:text-lg text-bark leading-[1.5] mt-2">
                  {a.taproot}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-bark/15" />
        </div>
      </div>
    </section>
  );
}
