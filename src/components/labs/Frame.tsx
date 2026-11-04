import Link from "next/link";
import type { ReactNode } from "react";
import { contact } from "./content";
import Engraving from "./Engraving";
import { Mark } from "./Mark";
import { DrawRule } from "./motion";
import type { SceneName } from "./sketch";
import { ThemeToggle } from "./theme";
import { W, btn, condensed, label } from "./tokens";

type Page = "home" | "about" | "services" | "work";

const nav: { id: Page; label: string; href: string }[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work", href: "/work" },
];

export function Rule({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ height: 1, background: "var(--rule)" }}
    />
  );
}

export function DoubleRule() {
  return (
    <div>
      <DrawRule style={{ height: 3, background: "var(--rule)" }} />
      <DrawRule
        style={{ height: 1, background: "var(--rule)", marginTop: 3 }}
      />
    </div>
  );
}

/** The page masthead: double rule, a caps strip, then the serif + italic beat. */
export function Masthead({
  strip,
  first,
  second,
  big,
  children,
}: {
  strip: string[];
  first: string;
  second: string;
  big?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`${W} pt-10 md:pt-14`}>
      <DoubleRule />
      <div className={`flex justify-between gap-4 py-2.5 ${label}`}>
        {strip.map((t, i) => (
          <span key={t} className={i === 1 ? "hidden sm:block" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <Rule />
      <h1
        className={`f-fr ${big ? "text-[clamp(56px,13vw,200px)] pt-12 md:pt-20 pb-10 md:pb-16" : "text-[clamp(50px,7.6vw,116px)] pt-8 md:pt-10 pb-8 md:pb-10"} leading-[0.92] tracking-[-0.03em]`}
      >
        {first}{" "}
        <em className="italic" style={{ color: "var(--accent)" }}>
          {second}
        </em>
      </h1>
      <Rule />
      {children}
    </section>
  );
}

/** A section head: double rule, condensed caps title, italic aside. */
export function SectionHead({
  title,
  aside,
  id,
}: {
  title: string;
  aside?: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-6">
      <DoubleRule />
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 pt-4 pb-3">
        <h2 className={`${condensed} text-[46px] md:text-[70px]`}>
          {title}
        </h2>
        {aside && (
          <p
            className="f-s4 italic text-[17px] pb-1"
            style={{ color: "var(--muted)" }}
          >
            {aside}
          </p>
        )}
      </div>
      <Rule />
    </div>
  );
}

/** A figure in a ruled plate with a caption, for screenshots and drawings alike. */
export function Plate({
  fig,
  caption,
  children,
  className,
}: {
  fig: string;
  caption: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className="p-2.5 rounded-[6px]"
        style={{ border: "1px solid var(--rule)" }}
      >
        <div
          className="relative overflow-hidden rounded-[3px]"
          style={{ background: "var(--card)" }}
        >
          {children}
        </div>
      </div>
      <figcaption
        className="f-s4 italic text-[14px] mt-2.5 leading-snug"
        style={{ color: "var(--muted)" }}
      >
        <span
          className={`${label} not-italic mr-2`}
          style={{ color: "var(--ink)" }}
        >
          Fig. {fig}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** A drawn scene sized to its own proportions, with no fade, for use inside a plate. */
export function Drawing({
  name,
  aspect,
  label: l,
}: {
  name: SceneName;
  aspect: string;
  label: string;
}) {
  return (
    <Engraving
      name={name}
      fade={false}
      preserve="xMidYMax meet"
      className={`w-full ${aspect}`}
      label={l}
    />
  );
}

export default function Frame({
  page,
  children,
}: {
  page: Page;
  children: ReactNode;
}) {
  return (
    <>
      <header id="top" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div
          className={`${W} h-[66px] flex items-center justify-between gap-6`}
        >
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="Taproot Labs home">
              <Mark
                size={26}
                textClass="f-fr text-[23px] font-semibold tracking-[-0.01em]"
              />
            </Link>
            <ThemeToggle labelClass="f-ar caps text-[10px] font-semibold" />
          </div>
          <div className="flex items-center gap-8">
            <nav
              className={`hidden md:flex items-center gap-8 ${label} text-[12px]`}
            >
              {nav.map((n) => (
                <Link
                  key={n.id}
                  href={n.href}
                  className="underline-offset-[7px] decoration-[1.5px] hover:underline"
                  style={
                    page === n.id ? { textDecoration: "underline" } : undefined
                  }
                  aria-current={page === n.id ? "page" : undefined}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <a
              href="#contact"
              className={`${btn} hidden sm:inline-flex !py-2.5 !px-4 !text-[11px]`}
              style={{ background: "var(--btn)", color: "var(--btn-ink)" }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>
      <nav
        className={`md:hidden flex justify-center gap-7 py-3 ${label} text-[12px]`}
        style={{ borderBottom: "1px solid var(--hair)" }}
      >
        {nav.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            style={
              page === n.id
                ? { textDecoration: "underline", textUnderlineOffset: 6 }
                : undefined
            }
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <main>{children}</main>

      {/* Contact, on every page but Work (Work is its own form) */}
      {page !== "work" && (
        <>
      <section className={`${W} pt-24 md:pt-32`}>
        <SectionHead
          id="contact"
          title="Get in touch"
        />
        <div className="grid md:grid-cols-12 gap-y-10 md:gap-x-12 py-12">
          <div className="md:col-span-5">
            <h3 className="f-fr text-[44px] md:text-[54px] leading-[1.02] tracking-[-0.02em]">
              {contact.first}
              <br />
              <em className="italic" style={{ color: "var(--accent)" }}>
                {contact.second}
              </em>
            </h3>
            <p
              className="f-s4 text-[19px] leading-[1.5] mt-6"
              style={{ color: "var(--muted)" }}
            >
              {contact.body}
            </p>
            <div
              className="mt-10 pt-4"
              style={{ borderTop: "3px solid var(--rule)" }}
            >
              <p className={`${condensed} text-[30px]`}>Write to us</p>
              <p
                className="f-s4 italic text-[15px] mt-1"
                style={{ color: "var(--muted)" }}
              >
                Ideas, projects and questions
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="f-s4 text-[16px] underline underline-offset-4 inline-block mt-3"
              >
                {contact.email}
              </a>
            </div>
            <Rule className="mt-4" />
          </div>
          <form
            className="md:col-span-7 rounded-[8px] p-6 md:p-9"
            style={{
              border: "1.5px solid var(--rule)",
              borderTopWidth: 4,
              background: "var(--card)",
            }}
          >
            <p className={`${condensed} text-[36px]`}>
              Tell us what you want to build
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              {[
                ["Name", "text"],
                ["Email", "email"],
              ].map(([l, t]) => (
                <label key={l} className="block">
                  <span className={label}>
                    {l} <span style={{ color: "var(--accent)" }}>*</span>
                  </span>
                  <input
                    type={t}
                    className="f-s4 w-full mt-2 px-3.5 py-3 rounded-[5px] bg-transparent text-[16px]"
                    style={{
                      border: "1px solid var(--rule)",
                      color: "var(--ink)",
                    }}
                  />
                </label>
              ))}
            </div>
            <label className="block mt-5">
              <span className={label}>
                What do you want to build?{" "}
                <span style={{ color: "var(--accent)" }}>*</span>
              </span>
              <textarea
                rows={5}
                className="f-s4 w-full mt-2 px-3.5 py-3 rounded-[5px] bg-transparent text-[16px] resize-y"
                style={{ border: "1px solid var(--rule)", color: "var(--ink)" }}
              />
            </label>
            <button
              type="button"
              className="w-full mt-6 py-4 rounded-[5px] f-ar caps text-[12px] font-bold tracking-[0.18em]"
              style={{ background: "var(--btn)", color: "var(--btn-ink)" }}
            >
              Send it
            </button>
          </form>
        </div>
      </section>
        </>
      )}

      <footer className="mt-6">
        <Engraving
          name="orchard"
          className="w-full h-[clamp(240px,30vw,470px)]"
          label="Pen sketch of an orchard with a small workshop"
        />
        <div className={W}>
          <div className="grid md:grid-cols-12 gap-y-10 md:gap-x-10 pt-12 pb-12">
            <div className="md:col-span-5">
              <Mark
                size={26}
                textClass="f-fr text-[26px] font-semibold tracking-[-0.01em]"
              />
              <p
                className="f-s4 text-[17px] mt-4"
                style={{ color: "var(--muted)" }}
              >
                Our own SaaS products, and contract work for companies.
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="f-s4 text-[16px] underline underline-offset-4 inline-block mt-6"
              >
                {contact.email}
              </a>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className={label}>Studio</p>
                <ul className="mt-4 space-y-2.5 f-s4 text-[16px]">
                  {nav.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={n.href}
                        className="hover:underline underline-offset-4"
                      >
                        {n.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#contact"
                      className="hover:underline underline-offset-4"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className={label}>Taproot app</p>
                <ul className="mt-4 space-y-2.5 f-s4 text-[16px]">
                  <li>
                    <Link href="/sign-in">Sign in</Link>
                  </li>
                  <li>
                    <Link href="/sign-up">Start free trial</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className={label}>Legal</p>
                <ul className="mt-4 space-y-2.5 f-s4 text-[16px]">
                  <li>
                    <Link href="/privacy">Privacy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Rule />
          <div className={`flex justify-between py-6 ${label}`}>
            <span>© 2026 Taproot Labs</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
