import Frame, { Masthead } from "@/components/labs/Frame";
import { hero } from "@/components/labs/content";
import { labsMetadata } from "@/components/labs/meta";
import { W, condensed, field, input, label } from "@/components/labs/tokens";

export const metadata = labsMetadata({
  title: "Work · Taproot Labs",
  description:
    "We walk people through our work one on one. Tell us what you're after and we'll set up a time.",
  path: "/work",
});

const req = <span style={{ color: "var(--accent)" }}>*</span>;

const steps = [
  { n: "01", t: "Send us a note." },
  { n: "02", t: "We reply to set up a call." },
  { n: "03", t: "We show you the builds closest to what you need." },
];

const interests = ["iOS apps", "Web apps", "AI tools", "Automation"];

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

        <form
          className="md:col-span-7 rounded-[8px] p-6 md:p-9"
          style={{
            border: "1.5px solid var(--rule)",
            borderTopWidth: 4,
            background: "var(--card)",
          }}
        >
          <p className={`${condensed} text-[36px]`}>Ask to see our work</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-7">
            {[
              ["Name", "text", true],
              ["Email", "email", true],
              ["Company", "text", false],
            ].map(([l, t, r]) => (
              <label key={l as string} className="block">
                <span className={label}>
                  {l} {r && req}
                </span>
                <input
                  type={t as string}
                  required={r as boolean}
                  className={input}
                  style={field}
                />
              </label>
            ))}
          </div>
          <fieldset className="mt-6">
            <legend className={label}>What do you want to see?</legend>
            <div className="flex flex-wrap gap-2 mt-3">
              {interests.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 f-s4 text-[15px] px-3 py-2 rounded-[4px] cursor-pointer"
                  style={field}
                >
                  <input
                    type="checkbox"
                    name="interest"
                    value={t}
                    style={{ accentColor: "var(--accent)" }}
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block mt-6">
            <span className={label}>Anything we should know?</span>
            <textarea rows={4} className={`${input} resize-y`} style={field} />
          </label>
          <button
            type="button"
            className="w-full mt-6 py-4 rounded-[5px] f-ar caps text-[12px] font-bold tracking-[0.18em]"
            style={{ background: "var(--btn)", color: "var(--btn-ink)" }}
          >
            Send
          </button>
        </form>
      </section>
    </Frame>
  );
}
