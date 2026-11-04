// Procedural pen-and-ink scenes for the Labs pages. Seeded, so every render draws the same lines.

export type P = [number, number];

const f = (n: number) => (Math.round(n * 10) / 10).toString();

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Layer = {
  occlude: string[]; // closed shapes filled with paper colour, drawn first
  strokes: Map<number, string[]>; // ink lines, grouped by width
  leaves: string[]; // paper-filled, ink-outlined leaf shapes
  ink: string[]; // solid ink fills (shadow leaves, dark accents)
  hi: string[]; // paper-coloured strokes over ink (bark texture)
};

export type RenderedLayer = {
  occlude: string;
  strokes: { w: number; d: string }[];
  leaves: string;
  ink: string;
  hi: string;
};

export class Sketch {
  private layers: Layer[] = [];
  private cur!: Layer;
  private r: () => number;

  constructor(seed: number) {
    this.r = mulberry32(seed);
    this.layer();
  }

  layer() {
    this.cur = { occlude: [], strokes: new Map(), leaves: [], ink: [], hi: [] };
    this.layers.push(this.cur);
    return this;
  }

  rand(a = 0, b = 1) {
    return a + (b - a) * this.r();
  }
  chance(p: number) {
    return this.r() < p;
  }

  private push(w: number, d: string) {
    const k = Math.round(w * 20) / 20;
    let arr = this.cur.strokes.get(k);
    if (!arr) {
      arr = [];
      this.cur.strokes.set(k, arr);
    }
    arr.push(d);
  }

  poly(pts: P[], w: number) {
    if (pts.length < 2) return;
    this.push(w, "M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L"));
  }

  quad(a: P, c: P, b: P, w: number) {
    this.push(
      w,
      `M${f(a[0])} ${f(a[1])}Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`,
    );
  }

  /** A slightly shaky line, the way a pen draws it. */
  wob(a: P, b: P, w: number, amp = 0.8, seg = 0) {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const n = seg || Math.max(2, Math.round(len / 14));
    const nx = -(b[1] - a[1]) / len;
    const ny = (b[0] - a[0]) / len;
    const pts: P[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const o = i === 0 || i === n ? 0 : this.rand(-amp, amp);
      pts.push([a[0] + (b[0] - a[0]) * t + nx * o, a[1] + (b[1] - a[1]) * t + ny * o]);
    }
    this.poly(pts, w);
  }

  occlude(pts: P[]) {
    this.cur.occlude.push("M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L") + "Z");
  }

  leaf(x: number, y: number, ang: number, len: number, solid = false) {
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    const mx = (x + ex) / 2;
    const my = (y + ey) / 2;
    const px = -Math.sin(ang) * len * 0.34;
    const py = Math.cos(ang) * len * 0.34;
    const d = `M${f(x)} ${f(y)}Q${f(mx + px)} ${f(my + py)} ${f(ex)} ${f(ey)}Q${f(mx - px)} ${f(my - py)} ${f(x)} ${f(y)}Z`;
    (solid ? this.cur.ink : this.cur.leaves).push(d);
  }

  inkShape(d: string) {
    this.cur.ink.push(d);
  }

  inkPoly(pts: P[]) {
    this.cur.ink.push("M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L") + "Z");
  }

  hiQuad(a: P, c: P, b: P) {
    this.cur.hi.push(`M${f(a[0])} ${f(a[1])}Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`);
  }

  render(): RenderedLayer[] {
    return this.layers.map((l) => ({
      occlude: l.occlude.join(""),
      strokes: Array.from(l.strokes.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([w, ds]) => ({ w, d: ds.join("") })),
      leaves: l.leaves.join(""),
      ink: l.ink.join(""),
      hi: l.hi.join(""),
    }));
  }
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export function roots(
  s: Sketch,
  x: number,
  gy: number,
  depth: number,
  bw: number,
  spread = 1,
) {
  const tap: P[] = [];
  let px = x;
  let py = gy;
  const steps = Math.max(4, Math.round(depth / 10));
  for (let i = 0; i <= steps; i++) {
    tap.push([px, py]);
    px += s.rand(-2, 2);
    py += depth / steps;
  }
  for (let i = 0; i < tap.length - 1; i++) {
    const w = Math.max(0.5, bw * 0.95 * (1 - i / tap.length));
    s.poly([tap[i], tap[i + 1]], w);
  }
  const lateral = (p: P, ang: number, len: number, d: number, w: number) => {
    const pts: P[] = [p];
    let cx = p[0];
    let cy = p[1];
    let a = ang;
    const n = Math.max(3, Math.round(len / 8));
    for (let i = 0; i < n; i++) {
      a += s.rand(-0.22, 0.22);
      a += (Math.PI / 2 - a) * 0.07;
      cx += (Math.cos(a) * len) / n;
      cy += (Math.sin(a) * len) / n;
      pts.push([cx, cy]);
    }
    s.poly(pts, w);
    if (d < 3) {
      for (let i = 0; i < 2; i++) {
        const idx = Math.min(pts.length - 1, Math.floor(s.rand(0.35, 0.95) * pts.length));
        lateral(
          pts[idx],
          a + (s.chance(0.5) ? 1 : -1) * s.rand(0.35, 0.85),
          len * s.rand(0.38, 0.6),
          d + 1,
          Math.max(0.4, w * 0.6),
        );
      }
    } else {
      const e = pts[pts.length - 1];
      for (let i = 0; i < 3; i++) {
        s.wob(e, [e[0] + s.rand(-6, 6), e[1] + s.rand(3, 8)], 0.4, 0.3, 2);
      }
    }
  };
  const nL = Math.round(3 + spread * 3);
  for (let i = 0; i < nL; i++) {
    const t = s.rand(0.02, 0.6);
    const bp = tap[Math.floor(t * (tap.length - 1))];
    const side = i % 2 ? 1 : -1;
    lateral(
      bp,
      Math.PI / 2 + side * s.rand(0.65, 1.25),
      depth * s.rand(0.35, 0.65) * spread * (1 - t * 0.5),
      0,
      Math.max(0.5, bw * 0.55 * (1 - t)),
    );
  }
}

export function tree(
  s: Sketch,
  x: number,
  gy: number,
  h: number,
  o: {
    spread?: number;
    density?: number;
    leaf?: number;
    roots?: number; // root depth in px; 0 = none
    rootSpread?: number;
  } = {},
) {
  const spread = o.spread ?? 1;
  const density = o.density ?? 1;
  const ls = o.leaf ?? 1;
  s.layer();
  const trunkH = h * 0.34;
  const bw = Math.max(1.6, h * 0.05);
  const top: P = [x + s.rand(-0.02, 0.02) * h, gy - trunkH];
  const L: P[] = [];
  const R: P[] = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const y = gy - trunkH * t;
    const cx = x + (top[0] - x) * t;
    const half = bw * (1 - t * 0.45) * (i === 0 ? 1.6 : 1);
    L.push([cx - half + s.rand(-0.5, 0.5), y]);
    R.push([cx + half + s.rand(-0.5, 0.5), y]);
  }
  s.inkPoly([...L, ...R.slice().reverse()]);
  for (let i = 0; i < trunkH / 3.2; i++) {
    const t = s.rand(0.04, 0.96);
    const y = gy - trunkH * t;
    const cx = x + (top[0] - x) * t;
    const half = bw * (1 - t * 0.45);
    const x1 = cx - half * s.rand(0.55, 0.85);
    const x2 = cx + half * s.rand(-0.35, 0.15);
    s.hiQuad([x1, y], [(x1 + x2) / 2, y - 1.4], [x2, y + s.rand(-0.8, 0.8)]);
  }
  const tips: P[] = [];
  const maxD = h > 220 ? 6 : h > 120 ? 5 : 4;
  const grow = (p: P, ang: number, len: number, d: number, w: number) => {
    const end: P = [p[0] + Math.cos(ang) * len, p[1] + Math.sin(ang) * len];
    const c: P = [
      (p[0] + end[0]) / 2 + s.rand(-len * 0.12, len * 0.12),
      (p[1] + end[1]) / 2 + s.rand(-len * 0.08, len * 0.08),
    ];
    s.quad(p, c, end, w);
    if (d >= maxD - 2) tips.push(end);
    if (d >= maxD) return;
    const n = d < 2 ? 3 : 2 + (s.chance(0.3) ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const sp = (0.45 + 0.35 * spread) * (d === 0 ? 1.15 : 1);
      const a = ang + (i / (n - 1) - 0.5) * 2 * sp + s.rand(-0.22, 0.22);
      grow(end, a, len * s.rand(0.62, 0.78), d + 1, Math.max(0.5, w * 0.66));
    }
  };
  grow(top, -Math.PI / 2 + s.rand(-0.08, 0.08), h * 0.24, 0, bw * 0.9);

  const cx = tips.reduce((a, p) => a + p[0], 0) / tips.length;
  const cy = tips.reduce((a, p) => a + p[1], 0) / tips.length;
  const spanX = Math.max(...tips.map((p) => Math.abs(p[0] - cx))) || 1;
  const spanY = Math.max(...tips.map((p) => Math.abs(p[1] - cy))) || 1;
  for (const t of tips) {
    const rr = h * s.rand(0.055, 0.085) * (0.75 + spread * 0.25);
    const k = Math.round(rr * rr * 0.05 * density);
    for (let i = 0; i < k; i++) {
      const ang = s.rand(0, Math.PI * 2);
      const rad = rr * Math.sqrt(s.rand());
      const lx = t[0] + Math.cos(ang) * rad;
      const ly = t[1] + Math.sin(ang) * rad * 0.85;
      if (ly > gy - 4) continue;
      const shade =
        ((lx - cx) / spanX) * 0.45 + ((ly - cy) / spanY) * 0.55 + s.rand(-0.35, 0.35);
      const len = s.rand(4.6, 8.4) * ls * Math.min(1, 0.55 + h / 500);
      s.leaf(lx, ly, s.rand(0, Math.PI * 2), len, shade > 0.8);
    }
  }
  if (o.roots) {
    s.layer();
    roots(s, x, gy, o.roots, bw, o.rootSpread ?? 1);
  }
}

export function sprout(s: Sketch, x: number, gy: number, h: number, rootDepth = 0) {
  s.layer();
  const top: P = [x + s.rand(-2, 2), gy - h];
  s.quad([x, gy], [x - 2, gy - h * 0.5], top, Math.max(0.8, h * 0.03));
  const lw = h * 0.55;
  const leafL = (ang: number, scale: number) => {
    const ex = top[0] + Math.cos(ang) * lw * scale;
    const ey = top[1] + Math.sin(ang) * lw * scale;
    const mx = (top[0] + ex) / 2;
    const my = (top[1] + ey) / 2;
    const px = -Math.sin(ang) * lw * scale * 0.32;
    const py = Math.cos(ang) * lw * scale * 0.32;
    s.occlude([top, [mx + px, my + py], [ex, ey], [mx - px, my - py]]);
    s.quad(top, [mx + px, my + py], [ex, ey], 0.9);
    s.quad(top, [mx - px, my - py], [ex, ey], 0.9);
    s.quad(top, [mx + px * 0.15, my + py * 0.15], [ex, ey], 0.45);
    for (let i = 1; i < 5; i++) {
      const t = i / 5;
      const bx = top[0] + (ex - top[0]) * t;
      const by = top[1] + (ey - top[1]) * t;
      s.wob([bx, by], [bx + px * 0.55 * (1 - t * 0.5), by + py * 0.55 * (1 - t * 0.5)], 0.4, 0.2, 2);
    }
  };
  leafL(-Math.PI * 0.86, 0.85);
  leafL(-Math.PI * 0.2, 1);
  if (rootDepth) {
    s.layer();
    roots(s, x, gy, rootDepth, 1.2, 0.5);
  }
}

export function seed(s: Sketch, x: number, y: number, size: number) {
  s.layer();
  const a: P = [x - size, y];
  const b: P = [x + size, y];
  s.occlude([a, [x, y - size * 0.75], b, [x, y + size * 0.75]]);
  s.quad(a, [x, y - size * 1.1], b, 1);
  s.quad(a, [x, y + size * 1.1], b, 1);
  s.quad([x - size * 0.6, y], [x, y - size * 0.3], [x + size * 0.6, y + size * 0.1], 0.5);
  s.wob([x + size, y], [x + size + 3, y + size * 2.2], 0.5, 0.6, 3);
}

export function groundLine(
  s: Sketch,
  x0: number,
  x1: number,
  y: (x: number) => number,
  grass = 1,
) {
  s.layer();
  const pts: P[] = [];
  for (let x = x0; x <= x1; x += 12) pts.push([x, y(x) + s.rand(-0.8, 0.8)]);
  s.poly(pts, 1.1);
  for (let x = x0; x < x1; x += s.rand(5, 16) / grass) {
    const gy = y(x);
    const n = 2 + Math.floor(s.rand(0, 4));
    for (let i = 0; i < n; i++) {
      const hgt = s.rand(4, 13);
      const lean = s.rand(-4, 4);
      s.quad([x + i * 1.6, gy], [x + i * 1.6 + lean * 0.3, gy - hgt * 0.6], [x + i * 1.6 + lean, gy - hgt], 0.5);
    }
  }
}

/** Receding hatch below a landscape ground line, like a road or field. */
export function fieldHatch(s: Sketch, x0: number, x1: number, y0: number, y1: number) {
  s.layer();
  for (let y = y0 + 5; y < y1; y += 4 + (y - y0) * 0.06) {
    let x = x0 + s.rand(0, 30);
    const fade = 1 - (y - y0) / (y1 - y0);
    while (x < x1) {
      const len = s.rand(12, 70) * (0.5 + fade);
      if (s.chance(0.35 + fade * 0.45)) s.wob([x, y], [Math.min(x1, x + len), y + s.rand(-0.6, 0.6)], 0.45, 0.4);
      x += len + s.rand(8, 40);
    }
  }
}

export function treeLine(s: Sketch, x0: number, x1: number, y: number, h: number) {
  s.layer();
  let x = x0;
  while (x < x1) {
    const r = h * s.rand(0.45, 0.95);
    const cy = y - r * s.rand(0.4, 0.8);
    const n = Math.round(r * r * 0.12);
    for (let i = 0; i < n; i++) {
      const a = s.rand(Math.PI, Math.PI * 2);
      const rad = r * Math.sqrt(s.rand());
      const ly = cy + Math.sin(a) * rad;
      s.leaf(x + Math.cos(a) * rad, ly, s.rand(0, 6.3), s.rand(2.2, 3.6), s.chance(0.12));
    }
    x += r * s.rand(1, 1.6);
  }
  for (let i = 0; i < (x1 - x0) / 7; i++) {
    const xx = s.rand(x0, x1);
    const yy = y - s.rand(0, h * 0.2);
    s.wob([xx, yy], [xx + s.rand(4, 12), yy], 0.4, 0.2, 2);
  }
}

export function shed(s: Sketch, x: number, gy: number, w: number, h: number) {
  s.layer();
  const wallH = h * 0.6;
  const eave = gy - wallH;
  const ridge = gy - h;
  const cx = x + w / 2;
  s.occlude([
    [x, gy],
    [x, eave],
    [x - 10, eave + 4],
    [cx, ridge],
    [x + w + 10, eave + 4],
    [x + w, eave],
    [x + w, gy],
  ]);
  s.wob([x, gy], [x, eave], 1.3);
  s.wob([x + w, gy], [x + w, eave], 1.5);
  s.wob([x - 10, eave + 4], [cx, ridge], 1.4);
  s.wob([cx, ridge], [x + w + 10, eave + 4], 1.4);
  s.wob([x - 10, eave + 4], [x + w + 10, eave + 4], 1);
  for (let px = x + 6; px < x + w - 2; px += 6.5) s.wob([px, eave + 8], [px, gy], 0.42, 0.35);
  for (let y = eave + 7; y < eave + 15; y += 2.2) s.wob([x + 1, y], [x + w - 1, y], 0.5, 0.3);
  for (let y = eave - 4; y > ridge + 6; y -= 7) {
    const hw = (w / 2 + 10) * ((y - ridge) / (eave + 4 - ridge));
    s.wob([cx - hw, y], [cx + hw, y], 0.5, 0.3);
    for (let tx = cx - hw + 5; tx < cx + hw - 3; tx += s.rand(6, 10)) s.wob([tx, y], [tx, y + 5], 0.4, 0, 1);
  }
  s.layer();
  const dw = w * 0.24;
  const dx = x + w * 0.56;
  const dTop = gy - wallH * 0.66;
  s.occlude([[dx, gy], [dx, dTop], [dx + dw, dTop], [dx + dw, gy]]);
  s.wob([dx, gy], [dx, dTop], 1);
  s.wob([dx, dTop], [dx + dw, dTop], 1);
  s.wob([dx + dw, dTop], [dx + dw, gy], 1.2);
  for (let px = dx + 4; px < dx + dw - 2; px += 4) s.wob([px, dTop + 2], [px, gy], 0.38, 0.2);
  s.inkShape(`M${f(dx + dw - 5)} ${f(gy - wallH * 0.33)}a1.6 1.6 0 1 0 0.1 0Z`);
  const wx = x + w * 0.12;
  const wy = eave + wallH * 0.28;
  const ww = w * 0.28;
  const wh = wallH * 0.3;
  s.occlude([[wx, wy], [wx + ww, wy], [wx + ww, wy + wh], [wx, wy + wh]]);
  s.poly([[wx, wy], [wx + ww, wy], [wx + ww, wy + wh], [wx, wy + wh], [wx, wy]], 1);
  s.wob([wx + ww / 2, wy], [wx + ww / 2, wy + wh], 0.7, 0);
  s.wob([wx, wy + wh / 2], [wx + ww, wy + wh / 2], 0.7, 0);
  for (let i = 0; i < 3; i++) s.wob([wx + 3 + i * 3, wy + wh / 2 - 2], [wx + 8 + i * 3, wy + 3], 0.4, 0, 1);
  s.wob([wx - 3, wy + wh + 1], [wx + ww + 3, wy + wh + 1], 1.2, 0);
}

export function pot(s: Sketch, x: number, gy: number, size: number, plant: "sprout" | "sapling" = "sprout") {
  if (plant === "sprout") sprout(s, x, gy - size, size * 1.3);
  else tree(s, x, gy - size, size * 2.6, { spread: 0.6, density: 0.8 });
  s.layer();
  const tw = size * 0.75;
  const bw = size * 0.52;
  const pts: P[] = [[x - tw, gy - size], [x + tw, gy - size], [x + bw, gy], [x - bw, gy]];
  s.occlude(pts);
  s.poly([...pts, pts[0]], 1);
  s.wob([x - tw - 2, gy - size + size * 0.18], [x + tw + 2, gy - size + size * 0.18], 0.8, 0);
  for (let i = 0; i < size / 2.5; i++) {
    const t = s.rand(0.25, 0.95);
    const yy = gy - size + size * t;
    const half = tw + (bw - tw) * t;
    s.wob([x + half * 0.25, yy], [x + half * 0.95, yy], 0.4, 0.1, 1);
  }
}

export function wateringCan(s: Sketch, x: number, gy: number, size: number) {
  s.layer();
  const w = size * 1.2;
  const h = size;
  const body: P[] = [[x, gy], [x, gy - h], [x + w, gy - h], [x + w, gy]];
  s.occlude(body);
  s.poly([...body, body[0]], 1.1);
  s.quad([x + w * 0.15, gy - h], [x + w * 0.5, gy - h * 1.7], [x + w * 0.85, gy - h], 1.1);
  s.poly([[x + w, gy - h * 0.3], [x + w + size * 0.9, gy - h * 1.1]], 1.2);
  s.poly([[x + w + size * 0.85, gy - h * 1.2], [x + w + size * 1.05, gy - h * 0.95]], 1.6);
  for (let i = 0; i < h / 2.4; i++) s.wob([x + w * 0.6, gy - 2 - i * 2.4], [x + w - 1, gy - 2 - i * 2.4], 0.4, 0, 1);
}

export function bench(s: Sketch, x: number, gy: number, w: number, h: number) {
  s.layer();
  s.wob([x, gy - h], [x + w, gy - h], 1.4, 0.2);
  s.wob([x, gy - h + 4], [x + w, gy - h + 4], 0.8, 0.2);
  for (const lx of [x + 6, x + w - 6]) s.wob([lx, gy - h + 4], [lx, gy], 1.2, 0.2);
  s.wob([x + 6, gy - h * 0.35], [x + w - 6, gy - h * 0.35], 0.7, 0.2);
}

export function fence(s: Sketch, x0: number, x1: number, gy: number, h: number) {
  s.layer();
  for (let x = x0; x <= x1; x += s.rand(30, 40)) s.wob([x, gy], [x + s.rand(-1, 1), gy - h - s.rand(0, 4)], 1.2, 0.3);
  for (const t of [0.35, 0.8]) s.wob([x0 - 4, gy - h * t], [x1 + 4, gy - h * t + s.rand(-2, 2)], 0.8, 0.6);
}

export function birds(s: Sketch, x0: number, x1: number, y0: number, y1: number, n: number) {
  s.layer();
  for (let i = 0; i < n; i++) {
    const x = s.rand(x0, x1);
    const y = s.rand(y0, y1);
    const w = s.rand(4, 7);
    s.quad([x - w, y - 1], [x - w * 0.45, y - w * 0.55], [x, y], 0.75);
    s.quad([x, y], [x + w * 0.45, y - w * 0.55], [x + w, y - 1], 0.75);
  }
}

/** A young tree held up by a stake and a tie, freshly planted. */
export function staked(s: Sketch, x: number, gy: number, h: number) {
  s.layer();
  s.quad([x - h * 0.3, gy], [x, gy - h * 0.07], [x + h * 0.3, gy], 0.8);
  tree(s, x, gy - 1, h, { spread: 0.55, density: 0.85 });
  s.layer();
  s.wob([x + h * 0.1, gy + 2], [x + h * 0.09, gy - h * 0.62], 1.6, 0.2);
  s.wob([x + h * 0.09, gy - h * 0.42], [x + 2, gy - h * 0.4], 0.8, 0);
}

/* ------------------------------------------------------------------ */
/* Scenes                                                               */
/* ------------------------------------------------------------------ */

export const SCENE_NAMES = ["orchard", "workshop", "bg-endpaper"] as const;
export type SceneName = (typeof SCENE_NAMES)[number];

export type Scene = { w: number; h: number; layers: RenderedLayer[] };

const cache = new Map<SceneName, Scene>();

export function scene(name: SceneName): Scene {
  const hit = cache.get(name);
  if (hit) return hit;
  const built = build(name);
  cache.set(name, built);
  return built;
}

function build(name: SceneName): Scene {
  if (name === "orchard") {
    // A row of trees at every age, a small workshop among them.
    const s = new Sketch(11);
    const W = 1600;
    const gy = 380;
    treeLine(s, 0, W, 330, 26);
    tree(s, 1180, gy - 40, 150, { spread: 0.8, density: 0.7 });
    tree(s, 1520, gy - 10, 330, { spread: 1.15 });
    shed(s, 470, gy, 190, 170);
    tree(s, 760, gy, 230, { spread: 0.9 });
    tree(s, 960, gy, 150, { spread: 0.7, density: 0.9 });
    tree(s, 1090, gy, 95, { spread: 0.55, density: 0.9 });
    pot(s, 1215, gy, 22, "sprout");
    pot(s, 1275, gy, 17, "sprout");
    seed(s, 1330, gy + 9, 4);
    wateringCan(s, 690, gy, 18);
    tree(s, 220, gy + 6, 370, { spread: 1.2 });
    groundLine(s, 0, W, () => gy);
    fieldHatch(s, 0, W, gy, 440);
    return { w: W, h: 440, layers: s.render() };
  }
  if (name === "workshop") {
    // The workshop, a bench of seedlings, and a row of young trees planted out.
    const s = new Sketch(57);
    const W = 1600;
    const gy = 360;
    birds(s, 200, 700, 40, 120, 5);
    treeLine(s, 0, W, gy - 48, 24);
    fence(s, 1180, 1580, gy, 28);
    shed(s, 560, gy, 250, 205);
    bench(s, 330, gy, 170, 46);
    pot(s, 355, gy - 46, 12, "sprout");
    pot(s, 400, gy - 46, 15, "sprout");
    pot(s, 450, gy - 46, 14, "sapling");
    wateringCan(s, 840, gy, 20);
    staked(s, 960, gy, 90);
    staked(s, 1070, gy, 125);
    tree(s, 1200, gy, 165, { spread: 0.75 });
    tree(s, 1350, gy, 215, { spread: 0.9 });
    tree(s, 150, gy + 6, 340, { spread: 1.15 });
    groundLine(s, 0, W, () => gy);
    fieldHatch(s, 0, W, gy, 420);
    return { w: W, h: 420, layers: s.render() };
  }
  // An old book's endpaper: seeds, sprouts and sown dots in a loose lattice.
  const s = new Sketch(331);
  const g = 64;
  let row = 0;
  for (let y = 18; y < 920; y += g * 0.866, row++) {
    for (let x = (row % 2 ? g / 2 : 0) - 10; x < 1620; x += g) {
      const px = x + s.rand(-9, 9);
      const py = y + s.rand(-7, 7);
      const kind = s.rand();
      if (kind < 0.62) {
        const a = s.rand(0, Math.PI * 2);
        const L = s.rand(5, 7.5);
        const h = L * 0.62;
        const c = Math.cos(a);
        const sn = Math.sin(a);
        const at = (u: number, v: number): P => [px + u * c - v * sn, py + u * sn + v * c];
        s.quad(at(-L, 0), at(0, -h * 1.3), at(L, 0), 0.8);
        s.quad(at(-L, 0), at(0, h * 1.3), at(L, 0), 0.8);
        s.quad(at(-L * 0.55, 0), at(0, -h * 0.25), at(L * 0.55, h * 0.1), 0.45);
      } else if (kind < 0.86) {
        const h = s.rand(10, 15);
        s.quad([px, py + h / 2], [px - 2, py], [px, py - h / 2], 0.7);
        s.leaf(px, py - h / 2, -Math.PI / 2 - 0.9, h * 0.6);
        s.leaf(px, py - h / 2, -Math.PI / 2 + 0.9, h * 0.6);
      } else {
        for (let i = 0; i < 3; i++) {
          const dx = px - 5 + i * 5;
          const dy = py + s.rand(-1.5, 1.5);
          s.inkShape(`M${(dx - 1.1).toFixed(1)} ${dy.toFixed(1)}a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0Z`);
        }
      }
    }
  }
  return { w: 1600, h: 900, layers: s.render() };
}
