import SectionHeader from "@/components/vs-memory/SectionHeader";

type Scene = {
  label: string;
  title: string;
  setup: string;
  vendor: string;
  taproot: string;
};

const SCENES: Scene[] = [
  {
    label: "01",
    title: "The handoff",
    setup:
      "You ran a 90-minute research session in Claude. Tomorrow your colleague picks up where you left off.",
    vendor:
      "With vendor memory, they start from your prompts, not your work. The thinking stays in your account.",
    taproot:
      "With Taproot, they open the same notes you wrote — and Claude reads them too. Same substrate, same shelf.",
  },
  {
    label: "02",
    title: "The switch",
    setup: "You move from Claude to Cursor for a week of coding.",
    vendor:
      "With vendor memory, your context stays on the side you left. Cursor starts from zero on you.",
    taproot:
      "With Taproot, your files come along. Cursor reads from the same shelf Claude was reading from yesterday.",
  },
  {
    label: "03",
    title: "Six months later",
    setup: "You ask, “What did I land on for the pricing page?”",
    vendor:
      "With vendor memory, the AI guesses from training data and your tiny fact list. No source.",
    taproot:
      "With Taproot, the AI reads the actual decision note — your own words, from the day you wrote it.",
  },
];

export default function Scenarios() {
  return (
    <section className="relative bg-cream pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="How it shows up" />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          What the difference looks like in{" "}
          <em className="italic text-forest-dark">real work.</em>
        </h2>

        <div className="mt-16 md:mt-20 space-y-16 md:space-y-20">
          {SCENES.map((s) => (
            <div
              key={s.label}
              className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-y-4 gap-x-6 md:gap-x-12"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
                  Scene {s.label}
                </p>
              </div>

              <div>
                <h3 className="font-serif italic text-3xl md:text-4xl lg:text-[2.5rem] text-forest-dark leading-[1.1] tracking-tight">
                  {s.title}
                </h3>

                <p className="font-serif text-lg md:text-xl lg:text-2xl text-bark leading-[1.4] mt-6 max-w-3xl">
                  {s.setup}
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 max-w-4xl">
                  <div>
                    <p className="font-serif italic text-sm md:text-base text-bark/55 leading-tight">
                      Vendor memory
                    </p>
                    <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.55] mt-2">
                      {s.vendor}
                    </p>
                  </div>
                  <div>
                    <p className="font-serif italic text-sm md:text-base text-forest-dark leading-tight">
                      Taproot
                    </p>
                    <p className="font-serif text-base md:text-lg text-bark leading-[1.55] mt-2">
                      {s.taproot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
