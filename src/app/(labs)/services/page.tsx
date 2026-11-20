import type { CSSProperties, ReactNode } from "react";
import Frame, { Masthead, Plate, SectionHead } from "@/components/labs/Frame";
import { howWeBuild, pillars, stack } from "@/components/labs/content";
import { labsMetadata } from "@/components/labs/meta";
import { Reveal } from "@/components/labs/motion";
import { W, label } from "@/components/labs/tokens";

export const metadata = labsMetadata({
  title: "Services · Taproot Labs",
  description: "AI, automation, apps and training for companies.",
  path: "/services",
});

// The figures are generic drawings in code: an illustration of the kind of thing, never a product or a client's system.

const chip = `${label} !text-[10px] px-2.5 py-1.5 rounded-[3px]`;
const box: CSSProperties = {
  border: "1.5px solid var(--rule)",
  background: "var(--bg)",
};
const hair: CSSProperties = { border: "1px solid var(--hair)" };
const muted: CSSProperties = { color: "var(--muted)" };

function Tags({
  items,
  className = "mt-6",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`${className} flex flex-wrap gap-2`}>
      {items.map((t) => (
        <span key={t} className={chip} style={hair}>
          {t}
        </span>
      ))}
    </div>
  );
}

/** Grey text lines, the wireframe stand-in for words. */
function Bars({ ws }: { ws: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {ws.map((w, i) => (
        <span
          key={i}
          className="block h-2 rounded-full"
          style={{ width: w, background: "var(--hair)" }}
        />
      ))}
    </div>
  );
}

const Arrow = () => (
  <span
    aria-hidden
    className="self-center f-s4 text-[20px] rotate-90 md:rotate-0"
    style={muted}
  >
    →
  </span>
);

/** An assistant reading your files. */
function Ask() {
  return (
    <div className="md:aspect-[16/10] flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-6 md:px-8">
      <div className="md:w-[30%] flex flex-col gap-2">
        <p className={`${label} !text-[9px]`} style={muted}>
          Your files
        </p>
        {["Contracts", "Invoices", "Emails"].map((t) => (
          <span
            key={t}
            className="f-s4 text-[14px] rounded-[4px] px-3 py-2.5"
            style={box}
          >
            {t}
          </span>
        ))}
      </div>
      <Arrow />
      <div className="flex-1 rounded-[6px] p-4 flex flex-col gap-3" style={box}>
        <p className={`${label} !text-[9px]`} style={muted}>
          Assistant
        </p>
        <p
          className="f-s4 text-[14px] self-end rounded-[4px] px-3 py-2"
          style={{ ...hair, background: "var(--card)" }}
        >
          Which invoices are past due?
        </p>
        <div className="pr-10">
          <Bars ws={["92%", "78%", "56%"]} />
        </div>
        <span className={`${chip} self-start`} style={hair}>
          From Invoices
        </span>
      </div>
    </div>
  );
}

/** A team workshop: an agenda on a board. */
function Workshop() {
  const rows = [
    "Where the hours go",
    "What AI can take on",
    "Try it on your own work",
  ];
  return (
    <div className="md:aspect-[16/10] flex items-center p-6 md:px-10">
      <div className="w-full rounded-[6px] p-5 md:p-7" style={box}>
        <div className="flex items-baseline justify-between gap-4">
          <p className={`${label} !text-[9px]`} style={muted}>
            Workshop
          </p>
          <p className={`${label} !text-[9px]`} style={muted}>
            Your team
          </p>
        </div>
        <ol className="mt-4">
          {rows.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-4 py-3"
              style={{ borderTop: "1px solid var(--hair)" }}
            >
              <span
                className="f-fr italic text-[20px] leading-none w-7 shrink-0"
                style={{ color: "var(--accent)" }}
              >
                {i + 1}
              </span>
              <span className="f-s4 text-[15px] md:text-[16px] shrink-0">
                {t}
              </span>
              <span className="flex-1 hidden sm:block">
                <Bars ws={["70%"]} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** An automation drawn as a flow (when, check, AI step, out). */
function Flow() {
  const cols: [string, string[]][] = [
    ["When", ["Every morning", "A new form entry"]],
    ["Check", ["Skip what's already done"]],
    ["AI step", ["AI reads it and drafts a reply"]],
    ["Out", ["Email", "Spreadsheet", "Slack"]],
  ];
  return (
    <div className="md:aspect-[16/10] flex flex-col md:flex-row md:items-center gap-3 md:gap-2 p-6 md:px-8">
      {cols.map(([head, items], i) => (
        <div key={head} className="contents">
          {i > 0 && <Arrow />}
          <div className="flex-1 flex flex-col gap-2">
            <p className={`${label} !text-[9px]`} style={muted}>
              {head}
            </p>
            {items.map((t) => (
              <span
                key={t}
                className="f-s4 text-[14px] leading-[1.3] rounded-[4px] px-3 py-2.5"
                style={box}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** A web app: browser chrome, a sidebar, three numbers, a table. */
function Browser() {
  return (
    <div className="aspect-[16/10] p-6 md:p-8">
      <div
        className="h-full rounded-[6px] overflow-hidden flex flex-col"
        style={box}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ borderBottom: "1.5px solid var(--rule)" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ border: "1px solid var(--rule)" }}
            />
          ))}
          <span
            className="ml-3 h-3 flex-1 max-w-[45%] rounded-full"
            style={{ background: "var(--hair)" }}
          />
        </div>
        <div className="flex-1 flex min-h-0">
          <div
            className="w-[22%] p-3"
            style={{ borderRight: "1px solid var(--hair)" }}
          >
            <Bars ws={["70%", "85%", "60%", "75%", "50%"]} />
          </div>
          <div className="flex-1 p-3 md:p-4 flex flex-col gap-3 min-h-0">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-10 md:h-16 rounded-[4px] p-2"
                  style={hair}
                >
                  <Bars ws={["45%"]} />
                </div>
              ))}
            </div>
            <div
              className="flex-1 rounded-[4px] p-3 overflow-hidden"
              style={hair}
            >
              <Bars ws={["95%", "80%", "88%", "70%", "84%", "76%"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** An iPhone app: two screens, a card view and a list view. */
function Phones() {
  return (
    <div className="aspect-[16/10] flex items-end justify-center gap-6 px-8 pt-8 overflow-hidden">
      {[0, 1].map((k) => (
        <div
          key={k}
          className="w-[28%] aspect-[9/19] translate-y-10 rounded-[22px] p-3 flex flex-col gap-3"
          style={box}
        >
          <span
            className="mx-auto w-[35%] h-2.5 rounded-full"
            style={{ background: "var(--hair)" }}
          />
          {k === 0 ? (
            <>
              <div className="mt-1 aspect-square rounded-[10px]" style={hair} />
              <Bars ws={["80%", "60%"]} />
              <span
                className="mt-1 h-7 rounded-[8px]"
                style={{ border: "1.5px solid var(--rule)" }}
              />
            </>
          ) : (
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 h-6 shrink-0 rounded-full" style={hair} />
                <div className="flex-1">
                  <Bars ws={["85%", "55%"]} />
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

const figures: { caption: string; body: ReactNode }[] = [
  { caption: "An assistant on your own files.", body: <Ask /> },
  { caption: "A team workshop.", body: <Workshop /> },
  { caption: "An automation.", body: <Flow /> },
  { caption: "A web app.", body: <Browser /> },
  { caption: "An iPhone app.", body: <Phones /> },
];

export default function LabsServices() {
  return (
    <Frame page="services">
      <Masthead
        strip={["What we do", "AI, automation, apps and training", "For companies"]}
        first="What we"
        second="build."
      />

      <section className={`${W} pt-6`}>
        {pillars.map((p, i) => (
          <Reveal key={p.n}>
            <div
              className="grid md:grid-cols-12 gap-y-8 md:gap-x-12 items-center py-12"
              style={i ? { borderTop: "1px solid var(--hair)" } : undefined}
            >
              <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                <p
                  className="f-fr italic text-[24px] leading-none"
                  style={{ color: "var(--accent)" }}
                >
                  {p.n}
                </p>
                <h2 className="f-fr text-[40px] md:text-[50px] leading-[1] tracking-[-0.02em] mt-3">
                  {p.title}
                </h2>
                <p className="f-s4 text-[19px] leading-[1.55] mt-4">{p.body}</p>
                <Tags items={p.tags} />
              </div>
              <Plate
                fig={String(i + 1)}
                caption={figures[i].caption}
                className={`md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}
              >
                {figures[i].body}
              </Plate>
            </div>
          </Reveal>
        ))}
      </section>

      <section className={`${W} pt-16`}>
        <SectionHead id="how" title="How we build" />
        <ol>
          {howWeBuild.map((s, i) => (
            <li
              key={s.n}
              className="grid md:grid-cols-12 gap-y-3 md:gap-x-10 py-9"
              style={i ? { borderTop: "1px solid var(--hair)" } : undefined}
            >
              <p
                className="md:col-span-1 f-fr italic text-[28px] leading-none"
                style={{ color: "var(--accent)" }}
              >
                {s.n}
              </p>
              <h3 className="md:col-span-3 f-fr text-[36px] leading-none">
                {s.title}
              </h3>
              <div className="md:col-span-8">
                <p className="f-s4 text-[19px] leading-[1.5]">{s.body}</p>
                <Tags items={s.tags} className="mt-4" />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${W} pt-16`}>
        <SectionHead title="Our stack" />
        {stack.map((s, i) => (
          <div
            key={s.layer}
            className="grid md:grid-cols-12 gap-y-3 md:gap-x-10 items-baseline py-7"
            style={i ? { borderTop: "1px solid var(--hair)" } : undefined}
          >
            <p className={`md:col-span-4 ${label} text-[12px]`}>{s.layer}</p>
            <Tags items={s.tools} className="md:col-span-8" />
          </div>
        ))}
      </section>
    </Frame>
  );
}
