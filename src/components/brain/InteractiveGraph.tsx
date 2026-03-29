"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";

interface GraphNode extends SimulationNodeDatum {
  id: string;
  label: string;
  category: "hub" | "topic" | "detail";
  size: number;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

const FOREST = { r: 46, g: 204, b: 113 };
const GOLD = { r: 201, g: 168, b: 76 };

const CATEGORY_STYLES = {
  hub: { color: FOREST, baseOpacity: 0.7, labelOpacity: 0.6 },
  topic: { color: FOREST, baseOpacity: 0.5, labelOpacity: 0.4 },
  detail: { color: FOREST, baseOpacity: 0.3, labelOpacity: 0.0 },
};

const NODES: Omit<GraphNode, keyof SimulationNodeDatum>[] = [
  // Hubs
  { id: "procedures", label: "Procedures", category: "hub", size: 14 },
  { id: "clients", label: "Client Intelligence", category: "hub", size: 14 },
  { id: "team", label: "Team Knowledge", category: "hub", size: 12 },
  { id: "vendors", label: "Vendor Network", category: "hub", size: 11 },

  // Topics
  { id: "onboarding", label: "Onboarding", category: "topic", size: 8 },
  { id: "compliance", label: "Compliance", category: "topic", size: 8 },
  { id: "billing", label: "Billing", category: "topic", size: 7 },
  { id: "intake", label: "Intake Process", category: "topic", size: 7 },
  { id: "service", label: "Service Delivery", category: "topic", size: 8 },
  { id: "reviews", label: "Quality Reviews", category: "topic", size: 6 },

  // Details
  { id: "contacts", label: "Key Contacts", category: "detail", size: 5 },
  { id: "partners", label: "Partners", category: "detail", size: 5 },
  { id: "referrals", label: "Referrals", category: "detail", size: 4 },
  { id: "templates", label: "Templates", category: "detail", size: 4 },
  { id: "faqs", label: "FAQs", category: "detail", size: 4 },
  { id: "pricing", label: "Pricing", category: "detail", size: 5 },
  { id: "history", label: "Client History", category: "detail", size: 5 },
  { id: "training", label: "Training Materials", category: "detail", size: 4 },
  { id: "policies", label: "Policies", category: "detail", size: 4 },
  { id: "meetings", label: "Meeting Notes", category: "detail", size: 4 },
  { id: "decisions", label: "Decisions Log", category: "detail", size: 4 },
  { id: "sops", label: "SOPs", category: "detail", size: 4 },
];

const LINKS: { source: string; target: string }[] = [
  { source: "procedures", target: "clients" },
  { source: "procedures", target: "compliance" },
  { source: "procedures", target: "onboarding" },
  { source: "procedures", target: "billing" },
  { source: "procedures", target: "intake" },
  { source: "procedures", target: "sops" },
  { source: "procedures", target: "service" },
  { source: "clients", target: "contacts" },
  { source: "clients", target: "history" },
  { source: "clients", target: "billing" },
  { source: "clients", target: "referrals" },
  { source: "clients", target: "service" },
  { source: "team", target: "onboarding" },
  { source: "team", target: "training" },
  { source: "team", target: "contacts" },
  { source: "team", target: "faqs" },
  { source: "team", target: "meetings" },
  { source: "vendors", target: "contacts" },
  { source: "vendors", target: "partners" },
  { source: "vendors", target: "pricing" },
  { source: "onboarding", target: "training" },
  { source: "onboarding", target: "templates" },
  { source: "onboarding", target: "sops" },
  { source: "compliance", target: "policies" },
  { source: "billing", target: "pricing" },
  { source: "intake", target: "templates" },
  { source: "reviews", target: "clients" },
  { source: "reviews", target: "team" },
  { source: "partners", target: "referrals" },
  { source: "meetings", target: "decisions" },
  { source: "meetings", target: "team" },
  { source: "decisions", target: "procedures" },
  { source: "decisions", target: "policies" },
  { source: "faqs", target: "procedures" },
  { source: "history", target: "decisions" },
  { source: "service", target: "sops" },
];

export default function InteractiveGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // Build adjacency for highlighting
  const adjacency = useRef<Map<string, Set<string>>>(new Map());
  useEffect(() => {
    const adj = new Map<string, Set<string>>();
    for (const l of LINKS) {
      if (!adj.has(l.source)) adj.set(l.source, new Set());
      if (!adj.has(l.target)) adj.set(l.target, new Set());
      adj.get(l.source)!.add(l.target);
      adj.get(l.target)!.add(l.source);
    }
    adjacency.current = adj;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: string | null = null;
      for (const node of nodesRef.current) {
        if (node.x == null || node.y == null) continue;
        const dx = node.x - mx;
        const dy = node.y - my;
        const hitRadius = node.size + 8;
        if (dx * dx + dy * dy < hitRadius * hitRadius) {
          found = node.id;
          break;
        }
      }
      if (found !== hoveredRef.current) setHovered(found);
    },
    []
  );

  const handleMouseLeave = useCallback(() => setHovered(null), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    let w = parent.clientWidth;
    const h = 500;

    const setSize = () => {
      w = parent.clientWidth;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const nodes: GraphNode[] = NODES.map((n) => ({ ...n }));
    const links: GraphLink[] = LINKS.map((l) => ({ ...l }));
    nodesRef.current = nodes;
    linksRef.current = links;

    const sim = forceSimulation(nodes)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(70)
          .strength(0.4)
      )
      .force("charge", forceManyBody().strength(-200))
      .force("center", forceCenter(w / 2, h / 2))
      .force("collide", forceCollide<GraphNode>().radius((d) => d.size + 15))
      .force("x", forceX(w / 2).strength(0.05))
      .force("y", forceY(h / 2).strength(0.05))
      .alphaDecay(0.008)
      .velocityDecay(0.4);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const hov = hoveredRef.current;
      const neighbors = hov ? adjacency.current.get(hov) : null;

      // Draw links
      for (const link of links) {
        const s = link.source as GraphNode;
        const t = link.target as GraphNode;
        if (s.x == null || s.y == null || t.x == null || t.y == null) continue;

        const isHighlighted =
          hov && (s.id === hov || t.id === hov);
        const isDimmed = hov && !isHighlighted;

        const alpha = isDimmed ? 0.02 : isHighlighted ? 0.25 : 0.06;
        const width = isHighlighted ? 1.5 : 0.5;
        const col = isHighlighted ? GOLD : FOREST;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        if (node.x == null || node.y == null) continue;

        const style = CATEGORY_STYLES[node.category];
        const isHovered = node.id === hov;
        const isNeighbor = neighbors?.has(node.id);
        const isDimmed = hov && !isHovered && !isNeighbor;

        const opacity = isDimmed
          ? style.baseOpacity * 0.2
          : isHovered
          ? 0.95
          : isNeighbor
          ? style.baseOpacity + 0.25
          : style.baseOpacity;

        const r = isHovered ? node.size + 4 : isNeighbor ? node.size + 1 : node.size;
        const col = isHovered || isNeighbor ? GOLD : style.color;

        // Glow
        if (isHovered || node.category === "hub") {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
          const glowAlpha = isHovered ? 0.15 : 0.04;
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${glowAlpha})`;
          ctx.fill();
        }

        // Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${opacity})`;
        ctx.fill();

        // Labels
        const showLabel =
          isHovered ||
          isNeighbor ||
          node.category === "hub" ||
          (node.category === "topic" && !hov);

        if (showLabel) {
          const labelAlpha = isDimmed
            ? 0.05
            : isHovered
            ? 0.9
            : isNeighbor
            ? 0.6
            : style.labelOpacity;

          const fontSize = node.category === "hub" ? 11 : 9;
          ctx.font = `${fontSize}px ui-monospace, 'Geist Mono', monospace`;
          ctx.textAlign = "center";
          const labelCol = isHovered || isNeighbor ? GOLD : FOREST;
          ctx.fillStyle = `rgba(${labelCol.r}, ${labelCol.g}, ${labelCol.b}, ${labelAlpha})`;
          ctx.fillText(node.label.toUpperCase(), node.x, node.y + r + 14);
        }
      }

      // Subtle edge vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.55);
      grad.addColorStop(0, "rgba(22, 27, 24, 0)");
      grad.addColorStop(1, "rgba(22, 27, 24, 0.7)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      w = parent.clientWidth;
      setSize();
      sim.force("center", forceCenter(w / 2, h / 2));
      sim.force("x", forceX(w / 2).strength(0.05));
      sim.alpha(0.3).restart();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      sim.stop();
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: 500 }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-crosshair rounded-lg"
        style={{ width: "100%", height: "100%" }}
      />
      {hovered && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded text-xs font-mono uppercase tracking-widest text-gold pointer-events-none">
          {hovered.replace(/-/g, " ")}
        </div>
      )}
    </div>
  );
}
