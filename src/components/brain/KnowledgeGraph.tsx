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

const NODE_COLOR = { r: 45, g: 55, b: 50 };
const ACCENT = { r: 26, g: 92, b: 50 };

// Labeled nodes — these get fixed positions in a ring around center
const LABELED_NODES = [
  { label: "Procedures", size: 12 },
  { label: "Clients", size: 12 },
  { label: "Team Knowledge", size: 11 },
  { label: "Vendors", size: 10 },
  { label: "Onboarding", size: 8 },
  { label: "Compliance", size: 8 },
  { label: "Billing", size: 7 },
  { label: "Service", size: 7 },
  { label: "Contacts", size: 6 },
  { label: "Training", size: 6 },
  { label: "Templates", size: 5 },
  { label: "Policies", size: 5 },
  { label: "History", size: 5 },
  { label: "Meetings", size: 5 },
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
    const cx = w / 2;
    const cy = h / 2;

    // Exclusion zone — keep labeled nodes OUT of the text area
    const exHalfW = isMobile ? w * 0.42 : 320;
    const exHalfH = isMobile ? 200 : 220;

    // Place labeled nodes randomly in the outer areas (not a perfect ring)
    function randomOuterPosition(): { x: number; y: number } {
      // Keep trying until we get a position outside the exclusion zone
      for (let attempt = 0; attempt < 50; attempt++) {
        // Bias toward edges with padding from viewport edges
        const pad = 40;
        const x = pad + Math.random() * (w - pad * 2);
        const y = pad + Math.random() * (h - pad * 2);

        // Check if outside exclusion zone
        const dx = Math.abs(x - cx);
        const dy = Math.abs(y - cy);
        if (dx > exHalfW || dy > exHalfH) {
          return { x, y };
        }
      }
      // Fallback: place at a random edge
      const side = Math.floor(Math.random() * 4);
      if (side === 0) return { x: Math.random() * w, y: Math.random() * 80 };
      if (side === 1) return { x: Math.random() * w, y: h - Math.random() * 80 };
      if (side === 2) return { x: Math.random() * 100, y: Math.random() * h };
      return { x: w - Math.random() * 100, y: Math.random() * h };
    }

    const labeledNodes: Node[] = LABELED_NODES.map((n) => {
      const pos = randomOuterPosition();
      return {
        x: pos.x,
        y: pos.y,
        label: n.label,
        size: isMobile ? n.size * 0.6 : n.size,
        opacity: n.size >= 10 ? 0.3 : n.size >= 7 ? 0.2 : 0.12,
        isLabeled: true,
        vx: 0,
        vy: 0,
      };
    });

    // Scatter dots spread across the ENTIRE canvas
    const scatterCount = isMobile ? 30 : 80;
    const scatterNodes: Node[] = [];
    for (let i = 0; i < scatterCount; i++) {
      scatterNodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        label: "",
        size: 1 + Math.random() * 2.5,
        opacity: 0.04 + Math.random() * 0.06,
        isLabeled: false,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    const allNodes = [...labeledNodes, ...scatterNodes];

    // Build connections
    const connections: [number, number][] = [];

    // Connect labeled nodes in sequence (ring connections)
    for (let i = 0; i < labeledNodes.length; i++) {
      const next = (i + 1) % labeledNodes.length;
      connections.push([i, next]);
      // Also connect to node 2 spots away for cross-links
      if (i % 2 === 0) {
        connections.push([i, (i + 2) % labeledNodes.length]);
      }
    }
    // Cross-ring connections — create a web, not just a circle
    connections.push([0, 3]);  // Procedures → Vendors
    connections.push([0, 5]);  // Procedures → Compliance
    connections.push([0, 7]);  // Procedures → Service
    connections.push([0, 13]); // Procedures → Meetings
    connections.push([1, 4]);  // Clients → Onboarding
    connections.push([1, 8]);  // Clients → Contacts
    connections.push([1, 12]); // Clients → History
    connections.push([2, 6]);  // Team → Billing
    connections.push([2, 9]);  // Team → Training
    connections.push([2, 13]); // Team → Meetings
    connections.push([3, 8]);  // Vendors → Contacts
    connections.push([3, 11]); // Vendors → Policies
    connections.push([4, 9]);  // Onboarding → Training
    connections.push([4, 10]); // Onboarding → Templates
    connections.push([5, 11]); // Compliance → Policies
    connections.push([6, 12]); // Billing → History
    connections.push([7, 10]); // Service → Templates

    // Connect every scatter node to its 2-3 closest labeled nodes
    for (let si = 0; si < scatterNodes.length; si++) {
      const sIdx = labeledNodes.length + si;
      const sn = scatterNodes[si];

      // Sort labeled nodes by distance
      const byDist = labeledNodes
        .map((ln, li) => {
          const dx = sn.x - ln.x;
          const dy = sn.y - ln.y;
          return { idx: li, dist: Math.sqrt(dx * dx + dy * dy) };
        })
        .sort((a, b) => a.dist - b.dist);

      // Connect to closest 2 (or 3 for some variety)
      const connectCount = Math.random() < 0.4 ? 3 : 2;
      for (let c = 0; c < connectCount && c < byDist.length; c++) {
        connections.push([sIdx, byDist[c].idx]);
      }

      // Connect scatter nodes to nearby scatter nodes
      for (let sj = si + 1; sj < scatterNodes.length; sj++) {
        const sjIdx = labeledNodes.length + sj;
        const dx = sn.x - scatterNodes[sj].x;
        const dy = sn.y - scatterNodes[sj].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          connections.push([sIdx, sjIdx]);
        }
      }
    }

    // Pulse state
    let pulseTimer = 1500;
    let pulseIdx = -1;
    let pulseIntensity = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update scatter node positions (gentle drift)
      for (const node of scatterNodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Update pulse
      pulseTimer -= 16;
      if (pulseTimer <= 0) {
        pulseIdx = Math.floor(Math.random() * labeledNodes.length);
        pulseIntensity = 1;
        pulseTimer = 3000 + Math.random() * 4000;
      }
      if (pulseIntensity > 0) pulseIntensity -= 0.005;

      // Draw all connections
      for (const [ai, bi] of connections) {
        const a = allNodes[ai];
        const b = allNodes[bi];
        if (!a || !b) continue;

        const isLabeledConnection = ai < labeledNodes.length && bi < labeledNodes.length;
        const isPulsing =
          (ai === pulseIdx || bi === pulseIdx) && pulseIntensity > 0;

        const baseAlpha = isLabeledConnection ? 0.09 : 0.04;
        const alpha = baseAlpha + (isPulsing ? pulseIntensity * 0.07 : 0);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${alpha})`;
        ctx.lineWidth = isLabeledConnection ? 0.8 : 0.4;
        ctx.stroke();
      }

      // Draw nodes
      for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        const isPulsing = i === pulseIdx && pulseIntensity > 0;

        const alpha = node.opacity + (isPulsing ? pulseIntensity * 0.3 : 0);
        const r = node.size + (isPulsing ? pulseIntensity * 3 : 0);

        // Glow for labeled nodes
        if (node.isLabeled && (isPulsing || node.size >= 10)) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
          const glowA = (node.size >= 10 ? 0.02 : 0) + (isPulsing ? pulseIntensity * 0.04 : 0);
          ctx.fillStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${glowA})`;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${alpha})`;
        ctx.fill();

        // Labels — skip on very small mobile sizes
        if (node.isLabeled && node.size > 4) {
          const fontSize = isMobile ? 6 : node.size >= 10 ? 9 : 7;
          ctx.font = `${fontSize}px ui-monospace, monospace`;
          ctx.textAlign = "center";
          const labelAlpha = 0.2 + (isPulsing ? pulseIntensity * 0.2 : 0);
          ctx.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${labelAlpha})`;
          ctx.fillText(node.label.toUpperCase(), node.x, node.y + r + 12);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      setSize();
      // Reposition labeled nodes outside the new exclusion zone
      for (const node of labeledNodes) {
        const pos = randomOuterPosition();
        node.x = pos.x;
        node.y = pos.y;
      }
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
