"use client";

import { useEffect, useRef } from "react";

interface KnowledgeGraphProps {
  className?: string;
}

interface Node {
  x: number;
  y: number;
  label: string;
  size: number;
  opacity: number;
  isLabeled: boolean;
  vx: number;
  vy: number;
}

const NODE_COLOR = { r: 90, g: 105, b: 95 }; // Darker gray-green
const LABEL_COLOR = { r: 100, g: 120, b: 108 };

const LABELED_NODES = [
  { label: "Procedures", size: 5 },
  { label: "Clients", size: 5 },
  { label: "Team Knowledge", size: 4.5 },
  { label: "Vendors", size: 4 },
  { label: "Onboarding", size: 3.5 },
  { label: "Compliance", size: 3.5 },
  { label: "Billing", size: 3 },
  { label: "Service", size: 3 },
  { label: "Contacts", size: 3 },
  { label: "Training", size: 2.5 },
  { label: "Templates", size: 2.5 },
  { label: "Policies", size: 2.5 },
];

export default function KnowledgeGraph({ className }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    let w = parent.clientWidth;
    let h = parent.clientHeight;

    const setSize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const isMobile = w < 768;

    // Exclusion zone — generous clear space for text
    const exW = isMobile ? w * 0.9 : 550;
    const exH = isMobile ? 380 : 320;
    const exL = w / 2 - exW / 2;
    const exR = w / 2 + exW / 2;
    const exT = h / 2 - exH / 2 - 20; // offset up slightly since text is centered high
    const exB = exT + exH;

    function isInExclusion(x: number, y: number): boolean {
      return x > exL && x < exR && y > exT && y < exB;
    }

    function randomOuterPos(): { x: number; y: number } {
      for (let i = 0; i < 100; i++) {
        const x = 20 + Math.random() * (w - 40);
        const y = 20 + Math.random() * (h - 40);
        if (!isInExclusion(x, y)) return { x, y };
      }
      // Fallback to corners
      const corners = [
        { x: w * 0.1, y: h * 0.1 },
        { x: w * 0.9, y: h * 0.1 },
        { x: w * 0.1, y: h * 0.9 },
        { x: w * 0.9, y: h * 0.9 },
      ];
      return corners[Math.floor(Math.random() * 4)];
    }

    // On mobile: fewer labeled nodes, no labels, just dots
    const labelCount = isMobile ? 6 : LABELED_NODES.length;
    const labeledNodes: Node[] = LABELED_NODES.slice(0, labelCount).map((n) => {
      const pos = randomOuterPos();
      return {
        ...pos,
        label: n.label,
        size: isMobile ? n.size * 0.6 : n.size,
        opacity: 0.22,
        isLabeled: true,
        vx: 0,
        vy: 0,
      };
    });

    // Scatter dots — small, subtle, everywhere
    const scatterCount = isMobile ? 25 : 60;
    const scatterNodes: Node[] = [];
    for (let i = 0; i < scatterCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      scatterNodes.push({
        x, y,
        label: "",
        size: 0.8 + Math.random() * 1.2,
        opacity: 0.06 + Math.random() * 0.05,
        isLabeled: false,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
      });
    }

    const allNodes = [...labeledNodes, ...scatterNodes];

    // Connections — sparse and light
    const connections: [number, number][] = [];

    // Connect labeled nodes to their nearest 1-2 labeled neighbors only
    for (let i = 0; i < labeledNodes.length; i++) {
      const dists = labeledNodes
        .map((n, j) => ({
          j,
          d: Math.hypot(n.x - labeledNodes[i].x, n.y - labeledNodes[i].y),
        }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.d - b.d);
      // Connect to 1 or 2 closest
      const count = Math.random() < 0.5 ? 1 : 2;
      for (let c = 0; c < count && c < dists.length; c++) {
        const pair: [number, number] = [
          Math.min(i, dists[c].j),
          Math.max(i, dists[c].j),
        ];
        if (!connections.some(([a, b]) => a === pair[0] && b === pair[1])) {
          connections.push(pair);
        }
      }
    }

    // Connect each scatter dot to its closest labeled node only
    for (let si = 0; si < scatterNodes.length; si++) {
      const sIdx = labeledNodes.length + si;
      const sn = scatterNodes[si];
      let closestDist = Infinity;
      let closestIdx = 0;
      for (let li = 0; li < labeledNodes.length; li++) {
        const d = Math.hypot(sn.x - labeledNodes[li].x, sn.y - labeledNodes[li].y);
        if (d < closestDist) { closestDist = d; closestIdx = li; }
      }
      // Only connect if reasonably close
      if (closestDist < (isMobile ? 250 : 400)) {
        connections.push([closestIdx, sIdx]);
      }
    }

    // Pulse
    let pulseTimer = 2000;
    let pulseIdx = -1;
    let pulseIntensity = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Drift scatter nodes
      for (const node of scatterNodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }

      // Pulse update
      pulseTimer -= 16;
      if (pulseTimer <= 0) {
        pulseIdx = Math.floor(Math.random() * labeledNodes.length);
        pulseIntensity = 1;
        pulseTimer = 4000 + Math.random() * 5000;
      }
      if (pulseIntensity > 0) pulseIntensity -= 0.004;

      // Draw connections — very thin and subtle
      for (const [ai, bi] of connections) {
        const a = allNodes[ai];
        const b = allNodes[bi];
        if (!a || !b) continue;

        const isPulsing = (ai === pulseIdx || bi === pulseIdx) && pulseIntensity > 0;
        const alpha = isPulsing ? 0.06 + pulseIntensity * 0.05 : 0.05;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw nodes
      for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        const isPulsing = i === pulseIdx && pulseIntensity > 0;

        const alpha = node.opacity + (isPulsing ? pulseIntensity * 0.15 : 0);
        const r = node.size + (isPulsing ? pulseIntensity * 1.5 : 0);

        // Soft glow on pulse
        if (isPulsing && pulseIntensity > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${pulseIntensity * 0.03})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${alpha})`;
        ctx.fill();

        // Labels — desktop only, very subtle
        if (node.isLabeled && !isMobile) {
          ctx.font = "7px ui-monospace, monospace";
          ctx.textAlign = "center";
          const labelAlpha = 0.2 + (isPulsing ? pulseIntensity * 0.12 : 0);
          ctx.fillStyle = `rgba(${LABEL_COLOR.r}, ${LABEL_COLOR.g}, ${LABEL_COLOR.b}, ${labelAlpha})`;
          ctx.fillText(node.label.toUpperCase(), node.x, node.y + r + 10);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      setSize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
