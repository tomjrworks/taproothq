"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  icon: number;
  pulseOffset: number;
}

const ICONS = ["mail", "calendar", "check", "chart", "file", "chat", "gear", "bolt"] as const;

export default function HeroMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const COUNT = 8;
    const nodes: Node[] = [];
    let time = 0;
    let gatherProgress = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      nodes.length = 0;

      for (let i = 0; i < COUNT; i++) {
        // Start spread across the full canvas
        nodes.push({
          x: w * 0.08 + Math.random() * w * 0.84,
          y: h * 0.08 + Math.random() * h * 0.84,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          r: 20 + Math.random() * 6,
          icon: i % ICONS.length,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawIcon(x: number, y: number, r: number, iconIdx: number, alpha: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;

      // Shadow
      ctx!.shadowColor = "rgba(26, 92, 50, 0.08)";
      ctx!.shadowBlur = 15;
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fillStyle = "#faf9f6";
      ctx!.fill();
      ctx!.shadowBlur = 0;
      ctx!.strokeStyle = `rgba(26, 92, 50, ${alpha * 0.25})`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Icon
      ctx!.strokeStyle = `rgba(87, 83, 78, ${alpha * 0.6})`;
      ctx!.fillStyle = `rgba(87, 83, 78, ${alpha * 0.6})`;
      ctx!.lineWidth = 1.5;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      const s = r * 0.38;

      switch (ICONS[iconIdx]) {
        case "mail":
          ctx!.beginPath();
          ctx!.rect(x - s, y - s * 0.65, s * 2, s * 1.3);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x - s, y - s * 0.65);
          ctx!.lineTo(x, y + s * 0.15);
          ctx!.lineTo(x + s, y - s * 0.65);
          ctx!.stroke();
          break;
        case "calendar":
          ctx!.beginPath();
          ctx!.rect(x - s, y - s * 0.6, s * 2, s * 1.5);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x - s, y);
          ctx!.lineTo(x + s, y);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x - s * 0.5, y - s * 0.6);
          ctx!.lineTo(x - s * 0.5, y - s * 0.9);
          ctx!.moveTo(x + s * 0.5, y - s * 0.6);
          ctx!.lineTo(x + s * 0.5, y - s * 0.9);
          ctx!.stroke();
          break;
        case "check":
          ctx!.strokeStyle = `rgba(26, 92, 50, ${alpha * 0.65})`;
          ctx!.lineWidth = 2;
          ctx!.beginPath();
          ctx!.arc(x, y, s * 0.8, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x - s * 0.35, y + s * 0.05);
          ctx!.lineTo(x - s * 0.05, y + s * 0.35);
          ctx!.lineTo(x + s * 0.45, y - s * 0.3);
          ctx!.stroke();
          break;
        case "chart":
          ctx!.fillStyle = `rgba(26, 92, 50, ${alpha * 0.45})`;
          ctx!.fillRect(x - s * 0.7, y + s * 0.1, s * 0.35, s * 0.5);
          ctx!.fillStyle = `rgba(26, 92, 50, ${alpha * 0.6})`;
          ctx!.fillRect(x - s * 0.2, y - s * 0.3, s * 0.35, s * 0.9);
          ctx!.fillStyle = `rgba(26, 92, 50, ${alpha * 0.75})`;
          ctx!.fillRect(x + s * 0.3, y - s * 0.6, s * 0.35, s * 1.2);
          break;
        case "file":
          ctx!.beginPath();
          ctx!.moveTo(x - s * 0.6, y - s * 0.8);
          ctx!.lineTo(x + s * 0.2, y - s * 0.8);
          ctx!.lineTo(x + s * 0.6, y - s * 0.4);
          ctx!.lineTo(x + s * 0.6, y + s * 0.8);
          ctx!.lineTo(x - s * 0.6, y + s * 0.8);
          ctx!.closePath();
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x + s * 0.2, y - s * 0.8);
          ctx!.lineTo(x + s * 0.2, y - s * 0.4);
          ctx!.lineTo(x + s * 0.6, y - s * 0.4);
          ctx!.stroke();
          break;
        case "chat":
          ctx!.beginPath();
          ctx!.moveTo(x - s * 0.7, y - s * 0.5);
          ctx!.quadraticCurveTo(x - s * 0.7, y - s * 0.9, x, y - s * 0.9);
          ctx!.quadraticCurveTo(x + s * 0.7, y - s * 0.9, x + s * 0.7, y - s * 0.5);
          ctx!.quadraticCurveTo(x + s * 0.7, y + s * 0.1, x, y + s * 0.1);
          ctx!.lineTo(x - s * 0.2, y + s * 0.5);
          ctx!.lineTo(x - s * 0.3, y + s * 0.1);
          ctx!.quadraticCurveTo(x - s * 0.7, y + s * 0.1, x - s * 0.7, y - s * 0.5);
          ctx!.stroke();
          break;
        case "gear":
          const teeth = 6;
          const inner = s * 0.45;
          const outer = s * 0.75;
          ctx!.beginPath();
          for (let t = 0; t < teeth; t++) {
            const a1 = (t / teeth) * Math.PI * 2;
            const a2 = ((t + 0.35) / teeth) * Math.PI * 2;
            const a3 = ((t + 0.5) / teeth) * Math.PI * 2;
            const a4 = ((t + 0.85) / teeth) * Math.PI * 2;
            ctx!.lineTo(x + Math.cos(a1) * inner, y + Math.sin(a1) * inner);
            ctx!.lineTo(x + Math.cos(a2) * outer, y + Math.sin(a2) * outer);
            ctx!.lineTo(x + Math.cos(a3) * outer, y + Math.sin(a3) * outer);
            ctx!.lineTo(x + Math.cos(a4) * inner, y + Math.sin(a4) * inner);
          }
          ctx!.closePath();
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.arc(x, y, s * 0.2, 0, Math.PI * 2);
          ctx!.stroke();
          break;
        case "bolt":
          ctx!.strokeStyle = `rgba(201, 168, 76, ${alpha * 0.65})`;
          ctx!.lineWidth = 2;
          ctx!.beginPath();
          ctx!.moveTo(x + s * 0.1, y - s * 0.8);
          ctx!.lineTo(x - s * 0.3, y + s * 0.05);
          ctx!.lineTo(x + s * 0.1, y + s * 0.05);
          ctx!.lineTo(x - s * 0.1, y + s * 0.8);
          ctx!.stroke();
          break;
      }
      ctx!.restore();
    }

    // Draw a connection line that grows in from both ends
    function drawConnection(
      x1: number, y1: number, r1: number,
      x2: number, y2: number, r2: number,
      proximity: number, // 0-1 how close relative to max dist
      lineReveal: number, // 0-1 how revealed lines are overall
    ) {
      // Don't draw if lines aren't revealed yet
      const alpha = proximity * lineReveal * 0.3;
      if (alpha < 0.01) return;

      // Start line from edge of each node, not center
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return;
      const nx = dx / dist;
      const ny = dy / dist;

      const startX = x1 + nx * (r1 + 4);
      const startY = y1 + ny * (r1 + 4);
      const endX = x2 - nx * (r2 + 4);
      const endY = y2 - ny * (r2 + 4);

      // Line grows in: at low lineReveal, only draw partial line from each end
      const drawRatio = Math.min(1, lineReveal * 1.5) * proximity;

      if (drawRatio < 0.05) return;

      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.strokeStyle = "#1a5c32";
      ctx!.lineWidth = 1.2;
      ctx!.setLineDash([5, 4]);
      ctx!.lineDashOffset = -time * 20;

      if (drawRatio < 1) {
        // Draw from both ends toward middle
        const halfDraw = drawRatio / 2;
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // From start toward mid
        const s1x = startX;
        const s1y = startY;
        const e1x = startX + (midX - startX) * halfDraw * 2;
        const e1y = startY + (midY - startY) * halfDraw * 2;

        // From end toward mid
        const s2x = endX;
        const s2y = endY;
        const e2x = endX + (midX - endX) * halfDraw * 2;
        const e2y = endY + (midY - endY) * halfDraw * 2;

        ctx!.beginPath();
        ctx!.moveTo(s1x, s1y);
        ctx!.lineTo(e1x, e1y);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.moveTo(s2x, s2y);
        ctx!.lineTo(e2x, e2y);
        ctx!.stroke();
      } else {
        // Full line
        ctx!.beginPath();
        ctx!.moveTo(startX, startY);
        ctx!.lineTo(endX, endY);
        ctx!.stroke();
      }

      // Small dot at connection point on each node
      ctx!.setLineDash([]);
      ctx!.globalAlpha = alpha * 1.5;
      ctx!.fillStyle = "#1a5c32";
      ctx!.beginPath();
      ctx!.arc(startX, startY, 2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(endX, endY, 2, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();
    }

    function render() {
      time += 0.008;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      ctx!.clearRect(0, 0, w, h);

      // Gather: 0→1 over ~6 seconds with a slow start
      if (gatherProgress < 1) {
        gatherProgress = Math.min(1, gatherProgress + 0.002);
      }
      // Ease-in: stays disconnected longer, then accelerates
      const ease = gatherProgress * gatherProgress * gatherProgress;

      // Line reveal trails behind gather — lines don't appear until nodes are somewhat close
      const lineReveal = Math.max(0, (gatherProgress - 0.3) / 0.7);
      const lineEase = lineReveal * lineReveal;

      const gravity = ease * 0.01;
      const LINE_DIST = 140 + (1 - ease) * 60; // tighter threshold as they gather

      for (const n of nodes) {
        // Random wander (fades out)
        const wander = 1 - ease;
        n.vx += (Math.random() - 0.5) * 0.06 * wander;
        n.vy += (Math.random() - 0.5) * 0.06 * wander;

        // Gravity toward loose orbit
        const dx = cx - n.x;
        const dy = cy - n.y;
        const distToCenter = Math.sqrt(dx * dx + dy * dy);
        const targetDist = Math.min(w, h) * 0.25;

        if (distToCenter > targetDist * 0.5) {
          const pull = gravity * Math.max(0, distToCenter - targetDist * 0.6) * 0.04;
          n.vx += (dx / distToCenter) * pull;
          n.vy += (dy / distToCenter) * pull;
        }

        // Mouse repulsion
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mdx = n.x - mx;
        const mdy = n.y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100 && mdist > 0) {
          const force = (100 - mdist) / 100 * 0.35;
          n.vx += (mdx / mdist) * force;
          n.vy += (mdy / mdist) * force;
        }

        // Node-node repulsion
        for (const other of nodes) {
          if (other === n) continue;
          const ndx = n.x - other.x;
          const ndy = n.y - other.y;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
          const minDist = n.r + other.r + 20;
          if (ndist < minDist && ndist > 0) {
            const push = (minDist - ndist) / minDist * 0.4;
            n.vx += (ndx / ndist) * push;
            n.vy += (ndy / ndist) * push;
          }
        }

        // Soft bounds
        const pad = n.r + 8;
        if (n.x < pad) n.vx += 0.25;
        if (n.x > w - pad) n.vx -= 0.25;
        if (n.y < pad) n.vy += 0.25;
        if (n.y > h - pad) n.vy -= 0.25;

        // Dampen
        const damp = 0.96 - ease * 0.03;
        n.vx *= damp;
        n.vy *= damp;

        n.x += n.vx;
        n.y += n.vy;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const proximity = 1 - dist / LINE_DIST;
            drawConnection(
              nodes[i].x, nodes[i].y, nodes[i].r,
              nodes[j].x, nodes[j].y, nodes[j].r,
              proximity,
              lineEase,
            );
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(time * 2 + n.pulseOffset) * 0.03;
        drawIcon(n.x, n.y, n.r * pulse, n.icon, 0.75 + ease * 0.2);
      }

      animId = requestAnimationFrame(render);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    init();
    render();

    canvas!.addEventListener("mousemove", onMouseMove);
    canvas!.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", () => { resize(); init(); gatherProgress = 0.4; });

    return () => {
      canvas!.removeEventListener("mousemove", onMouseMove);
      canvas!.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}
