import Engraving from "@/components/labs/Engraving";
import Frame, { Masthead, SectionHead } from "@/components/labs/Frame";
import { apps, hero } from "@/components/labs/content";
import { labsMetadata } from "@/components/labs/meta";
import { Reveal } from "@/components/labs/motion";
import { W, label } from "@/components/labs/tokens";

export const metadata = labsMetadata({
  title: "About · Taproot Labs",
  description:
    "Taproot Labs is a small software studio. We build and run our own SaaS products, and we take on contract work for companies.",
  path: "/about",
});

const values = [
  {
    n: "I",
    title: "Ship early",
    body: "A working build in your hands early, not a slide deck.",
  },
  {
    n: "II",
    title: "Measure first",
    body: "Real people, real data. We measure before we add.",
  },
  {
    n: "III",
    title: "AI that does real work",
    body: "Used where it saves real time, not added for show.",
  },
];

const live = apps.filter((a) => a.status === "Live").length;

const stats = [
  { n: String(apps.length), l: "Apps built" },
  { n: String(live), l: "Live today" },
  { n: String(apps.length - live), l: "In the works" },
  { n: "3", l: "Platforms, iOS to Mac" },
];

export default function LabsAbout() {
  return (
    <Frame page="about">
      <Masthead
        strip={["Who we are", "SaaS and contract work", hero.tally]}
        first="A small studio"
        second="that ships."
      >
        <p className="f-s4 text-[21px] md:text-[23px] leading-[1.45] py-8 md:py-10 max-w-[44ch]">
          Taproot Labs is a small software studio. We build and run our own SaaS
          products, and we take on contract work for companies. That means apps,
          internal tools, AI automations and hands-on AI training for your team.
        </p>
      </Masthead>

      <Reveal className="mt-4">
        <Engraving
          name="workshop"
          className="w-full h-[clamp(220px,27vw,420px)]"
          label="Pen sketch of the workshop, a bench of seedlings and a row of young trees"
        />
      </Reveal>

      <section className={`${W} pt-16`}>
        <SectionHead
          title="What we hold to"
          aside="Three habits behind every app."
        />
        <div className="grid md:grid-cols-3 md:-mx-8">
          {values.map((v, i) => (
            <div
              key={v.n}
              className={`py-8 md:px-8 ${i ? "md:border-l" : ""}`}
              style={{ borderColor: "var(--hair)" }}
            >
              <p
                className="f-fr italic text-[24px] leading-none"
                style={{ color: "var(--accent)" }}
              >
                {v.n}.
              </p>
              <h3 className="f-fr text-[30px] leading-[1.05] mt-3">
                {v.title}
              </h3>
              <p
                className="f-s4 text-[17px] leading-[1.55] mt-3"
                style={{ color: "var(--muted)" }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${W} pt-16`}>
        <SectionHead title="By the numbers" />
        <div className="grid grid-cols-2 md:grid-cols-4 md:-mx-8">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`py-8 md:px-8 ${i ? "md:border-l" : ""}`}
              style={{ borderColor: "var(--hair)" }}
            >
              <p
                className="f-fr text-[72px] md:text-[96px] leading-none tracking-[-0.03em]"
                style={{ color: "var(--accent)", fontWeight: 300 }}
              >
                {s.n}
              </p>
              <p className={`${label} mt-3`}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </Frame>
  );
}
