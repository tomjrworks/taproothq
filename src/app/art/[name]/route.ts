import { scene, SCENE_NAMES, type SceneName } from "@/components/labs/sketch";

// One file per drawing, built once, so the pages reference it instead of each carrying it.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SCENE_NAMES.map((name) => ({ name: `${name}.svg` }));
}

const ROUND = 'stroke-linecap="round"';

function markup(name: SceneName) {
  const groups = scene(name).layers.map((l) => {
    const parts = [
      l.occlude && `<path d="${l.occlude}" fill="var(--paper)"/>`,
      ...l.strokes.map(
        (st) =>
          `<path d="${st.d}" fill="none" stroke="currentColor" stroke-width="${st.w}" ${ROUND} stroke-linejoin="round"/>`,
      ),
      l.leaves &&
        `<path d="${l.leaves}" fill="var(--paper)" stroke="currentColor" stroke-width="0.55"/>`,
      l.ink && `<path d="${l.ink}" fill="currentColor"/>`,
      l.hi &&
        `<path d="${l.hi}" fill="none" stroke="var(--paper)" stroke-width="0.6" ${ROUND}/>`,
    ];
    return `<g>${parts.filter(Boolean).join("")}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg"><g id="art">${groups.join("")}</g></svg>`;
}

export function GET(
  _request: Request,
  { params }: { params: { name: string } },
) {
  const name = params.name.replace(/\.svg$/, "") as SceneName;
  return new Response(markup(name), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800",
    },
  });
}
