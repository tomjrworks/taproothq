import SectionHeader from "@/components/vs-memory/SectionHeader";

const QUOTES = [
  "I want my AI to just know my stuff.",
  "Every conversation starts at zero.",
  "I keep copy-pasting the same context into every chat.",
  "I have years of notes my AI can’t see.",
  "I want to ask about something I wrote months ago — and have it actually find it.",
];

export default function Quotes() {
  return (
    <section className="relative bg-cream-dark pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader title="Why this page exists" />

        <p className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] text-bark leading-[1.25] tracking-tight max-w-3xl">
          Buyers tell us the same five things.
        </p>

        <ul className="mt-12 md:mt-16 max-w-3xl space-y-7 md:space-y-9">
          {QUOTES.map((q, i) => (
            <li key={i} className="flex gap-5 md:gap-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bark/45 pt-3 min-w-[2.5rem]">
                0{i + 1}
              </span>
              <p className="font-serif italic text-xl md:text-2xl lg:text-[1.75rem] text-bark leading-[1.35] tracking-tight">
                &ldquo;{q}&rdquo;
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20 max-w-3xl">
          <span className="block h-px w-12 bg-forest-dark/30 mb-6" />
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-bark leading-[1.35]">
            Vendor memory doesn&rsquo;t solve any of these.
          </p>
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-forest-dark leading-[1.35] mt-2">
            Taproot is the layer that does.
          </p>
        </div>
      </div>
    </section>
  );
}
