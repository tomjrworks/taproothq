import Link from "next/link";
import Backdrop from "@/components/labs/Backdrop";
import Frame, { Masthead } from "@/components/labs/Frame";
import { hero } from "@/components/labs/content";
import { labsMetadata } from "@/components/labs/meta";
import { btn, label } from "@/components/labs/tokens";

export const metadata = labsMetadata({
  title: "Taproot Labs",
  description: hero.sub,
  path: "/",
});

export default function LabsHome() {
  return (
    <Frame page="home">
      <div className="relative overflow-hidden min-h-[calc(100svh-66px)] flex flex-col">
        <Backdrop />
        <div className="relative flex-1 flex flex-col">
          {/* a plain block, so the masthead fills the column instead of shrinking to its content */}
          <div>
            <Masthead
              strip={[
                "Our own SaaS products",
                "Contract work for companies",
                hero.tally,
              ]}
              first="We build"
              second="things."
              big
            >
              <div className="grid md:grid-cols-12 gap-y-7 md:gap-x-10 py-8 md:py-10 items-end">
                <p className="md:col-span-7 f-s4 text-[21px] md:text-[24px] leading-[1.45] max-w-[34ch]">
                  {hero.sub}
                </p>
                <div className="md:col-span-5 md:justify-self-end flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href="/work"
                    className={btn}
                    style={{
                      background: "var(--btn)",
                      color: "var(--btn-ink)",
                    }}
                  >
                    See our work
                  </Link>
                  <Link
                    href="/services"
                    className={`${label} text-[12px] underline underline-offset-[6px]`}
                  >
                    What we do →
                  </Link>
                </div>
              </div>
            </Masthead>
          </div>
        </div>
      </div>
    </Frame>
  );
}
