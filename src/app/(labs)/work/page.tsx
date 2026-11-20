import AskToSeeForm from "@/components/labs/AskToSeeForm";
import Frame, { Masthead } from "@/components/labs/Frame";
import { hero } from "@/components/labs/content";
import { labsMetadata } from "@/components/labs/meta";
import { W } from "@/components/labs/tokens";

export const metadata = labsMetadata({
  title: "Work · Taproot Labs",
  description:
    "We walk people through our work one on one. Tell us what you're after and we'll set up a time.",
  path: "/work",
});

const steps = [
  { n: "01", t: "Send us a note." },
  { n: "02", t: "We reply to set up a call." },
  { n: "03", t: "We show you the builds closest to what you need." },
];

export default function LabsWork() {
  return (
    <Frame page="work">
      <Masthead
        strip={["Our work", "Shown one on one", hero.tally]}
        first="See what"
        second="we've built."
      >
        <p className="f-s4 text-[21px] md:text-[23px] leading-[1.45] py-8 md:py-10 max-w-[44ch]">
          We walk people through our work one on one. Tell us what you&apos;re
          after and we&apos;ll set up a time.
        </p>
      </Masthead>

      <section
        id="contact"
        className={`${W} grid md:grid-cols-12 gap-y-12 md:gap-x-12 pt-10 pb-8`}
      >
        <ol className="md:col-span-5">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="flex gap-6 py-6"
              style={{
                borderTop: i
                  ? "1px solid var(--hair)"
                  : "3px solid var(--rule)",
              }}
            >
              <span
                className="f-fr italic text-[28px] leading-none w-10 shrink-0"
                style={{ color: "var(--accent)" }}
              >
                {s.n}
              </span>
              <span className="f-fr text-[26px] md:text-[30px] leading-[1.1]">
                {s.t}
              </span>
            </li>
          ))}
        </ol>

        <AskToSeeForm />
      </section>
    </Frame>
  );
}
