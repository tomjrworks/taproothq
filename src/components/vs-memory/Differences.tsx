import SectionHeader from "@/components/vs-memory/SectionHeader";

type Difference = {
  title: string;
  vendor: string;
  taproot: string;
};

const DIFFERENCES: Difference[] = [
  {
    title: "Where it lives",
    vendor: "Vendor memory lives in their database.",
    taproot: "Taproot lives in your files.",
  },
  {
    title: "What it remembers",
    vendor:
      "Vendor memory keeps small persistent facts about you — your name, your preferences, a few projects.",
    taproot:
      "Taproot keeps the work itself — your notes, your decisions, the things you wrote.",
  },
  {
    title: "What it works with",
    vendor:
      "Vendor memory works inside one product. ChatGPT memory only inside ChatGPT. Claude memory only inside Claude.",
    taproot:
      "Taproot plugs into every AI that speaks MCP — Claude, Cursor, Windsurf, Copilot. One memory layer, many tools.",
  },
  {
    title: "How you can see it",
    vendor:
      "You can see what they wrote down about you. You can’t see how, when, or why the AI reaches for it.",
    taproot:
      "The file IS the memory. You open the same notes the AI reads. Same words, both sides.",
  },
  {
    title: "What happens if you leave",
    vendor:
      "Switch AI providers and your memory doesn’t come with you. The list stays in their account.",
    taproot:
      "Switch tools and your files are still there. Taproot keeps working with whichever AI you bring next.",
  },
];

export default function Differences() {
  return (
    <section className="relative bg-cream-dark pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="What’s different, in plain English" />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          Five things that{" "}
          <em className="italic text-forest-dark">don&rsquo;t translate.</em>
        </h2>

        <ul className="mt-16 md:mt-20 space-y-14 md:space-y-16">
          {DIFFERENCES.map((d, i) => (
            <li
              key={d.title}
              className="grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-y-4 gap-x-6 md:gap-x-10"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55 md:pt-2">
                0{i + 1}
              </span>

              <div>
                <h3 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-forest-dark leading-[1.15] tracking-tight">
                  {d.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-14 mt-7">
                  <div>
                    <p className="font-serif italic text-sm md:text-base text-bark/55 leading-tight">
                      Vendor memory
                    </p>
                    <p className="font-serif text-base md:text-lg lg:text-xl text-bark/85 leading-[1.5] mt-2">
                      {d.vendor}
                    </p>
                  </div>
                  <div>
                    <p className="font-serif italic text-sm md:text-base text-forest-dark leading-tight">
                      Taproot
                    </p>
                    <p className="font-serif text-base md:text-lg lg:text-xl text-bark leading-[1.5] mt-2">
                      {d.taproot}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
