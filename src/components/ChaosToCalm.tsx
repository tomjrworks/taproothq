"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimationControls,
  animate,
  MotionValue,
  motionValue,
} from "framer-motion";

/* ── scattered business-tool icons ──
   Positions are in % offset from center of the container.
   Desktop (x/y) and mobile (mx/my) have separate positions to avoid clipping. */
const CHAOS_ITEMS = [
  { label: "Missed calls", icon: PhoneIcon, x: -38, y: -35, mx: -30, my: -32, rotate: -18 },
  { label: "Spreadsheets", icon: SheetIcon, x: 35, y: -30, mx: 28, my: -28, rotate: 14 },
  { label: "Sticky notes", icon: StickyIcon, x: -28, y: 30, mx: -25, my: 28, rotate: 22 },
  { label: "Manual emails", icon: EmailIcon, x: 30, y: 32, mx: 26, my: 30, rotate: -12 },
  { label: "Calendar chaos", icon: CalendarIcon, x: -10, y: -42, mx: -8, my: -38, rotate: 8 },
  { label: "Lost invoices", icon: InvoiceIcon, x: 12, y: -40, mx: 10, my: -36, rotate: -20 },
  { label: "Copy-paste", icon: ClipboardIcon, x: -42, y: 0, mx: -34, my: 0, rotate: 15 },
  { label: "Re-entering data", icon: EntryIcon, x: 40, y: 2, mx: 32, my: 2, rotate: -10 },
];

export default function ChaosToCalm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Single progress value driven by a timed animation, not scroll
  const [progress] = useState(() => motionValue(0));
  const [phase, setPhase] = useState<"idle" | "chaos" | "converging" | "calm">("idle");

  useEffect(() => {
    if (!isInView) return;

    // Kick off the timed sequence
    setPhase("chaos");

    // Hold on chaos for a beat, then animate to calm
    const timer = setTimeout(() => {
      setPhase("converging");
      animate(progress, 1, {
        duration: 2.5,
        ease: [0.25, 0.1, 0.25, 1], // smooth ease-out
        onComplete: () => setPhase("calm"),
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [isInView, progress]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden bg-cream-dark"
      aria-label="Business transformation animation"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />

      {/* Headings */}
      <div className="relative text-center px-6 mb-10 sm:mb-14">
        {/* Chaos heading — fades out as convergence starts */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={
            phase === "chaos"
              ? { opacity: 1, y: 0 }
              : phase === "idle"
                ? { opacity: 0, y: 12 }
                : { opacity: 0, y: -8 }
          }
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 top-0 px-6"
        >
          <p className="text-stone text-sm tracking-wide uppercase font-medium mb-2">
            Sound familiar?
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-bark tracking-tight">
            This is your business right now.
          </h2>
        </motion.div>

        {/* Calm heading — fades in during convergence */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={
            phase === "calm" || phase === "converging"
              ? { opacity: phase === "calm" ? 1 : 0.6, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.8, delay: phase === "converging" ? 1.2 : 0 }}
          className="absolute inset-x-0 top-0 px-6"
        >
          <p className="text-forest text-sm tracking-wide uppercase font-medium mb-2">
            After Main Loop
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-bark tracking-tight">
            Everything talks to everything.
          </h2>
        </motion.div>

        {/* Invisible spacer to hold height */}
        <div className="invisible">
          <p className="text-sm mb-2">&nbsp;</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">&nbsp;</h2>
        </div>
      </div>

      {/* Icon arena — tighter on mobile to prevent clipping */}
      <div className="relative w-[80vw] max-w-[500px] aspect-square mx-auto">
        {/* Connection lines */}
        <ConnectionLines total={CHAOS_ITEMS.length} progress={progress} />

        {/* Center hub */}
        <CenterHub progress={progress} />

        {/* Floating icons */}
        {CHAOS_ITEMS.map((item, i) => (
          <FloatingIcon
            key={item.label}
            item={item}
            index={i}
            total={CHAOS_ITEMS.length}
            progress={progress}
            isInView={isInView}
            staggerDelay={i * 0.06}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Center hub ── */
function CenterHub({ progress }: { progress: MotionValue<number> }) {
  const controls = useAnimationControls();

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      if (v > 0.55) {
        controls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        });
      }
    });
    return unsub;
  }, [progress, controls]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      style={{ x: "-50%", y: "-50%" }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-forest shadow-lg shadow-forest/20 flex items-center justify-center">
        <LogoIcon />
      </div>
      <p className="text-center text-forest font-display font-semibold text-[11px] sm:text-xs mt-2 whitespace-nowrap">
        Main Loop
      </p>
    </motion.div>
  );
}

/* ── SVG lines from center to each orbit slot ── */
function ConnectionLines({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  const controls = useAnimationControls();
  const [orbitR, setOrbitR] = useState(42);

  useEffect(() => {
    setOrbitR(window.innerWidth < 640 ? 34 : 42);
  }, []);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      if (v > 0.65) {
        controls.start({ opacity: 0.5, transition: { duration: 0.6 } });
      }
    });
    return unsub;
  }, [progress, controls]);

  const lines = Array.from({ length: total }, (_, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x2: 50 + Math.cos(angle) * orbitR,
      y2: 50 + Math.sin(angle) * orbitR,
    };
  });

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={50}
          y1={50}
          x2={l.x2}
          y2={l.y2}
          stroke="#1a5c32"
          strokeWidth="0.4"
          strokeDasharray="1.5 1"
        />
      ))}
    </motion.svg>
  );
}

/* ── Icon that floats from chaos position → orbit ── */
function FloatingIcon({
  item,
  index,
  total,
  progress,
  isInView,
  staggerDelay,
}: {
  item: (typeof CHAOS_ITEMS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  isInView: boolean;
  staggerDelay: number;
}) {
  const Icon = item.icon;
  const ref = useRef<HTMLDivElement>(null);

  // Detect mobile for tighter positions
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // Use mobile-specific scatter positions and orbit radius
  const startX = isMobile ? item.mx : item.x;
  const startY = isMobile ? item.my : item.y;
  const orbitR = isMobile ? 34 : 42;

  // Orbit target
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const targetX = Math.cos(angle) * orbitR;
  const targetY = Math.sin(angle) * orbitR;

  // Drive position from progress MotionValue
  const [pos, setPos] = useState({ left: `${50 + startX}%`, top: `${50 + startY}%`, rotate: item.rotate });

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const x = startX + (targetX - startX) * v;
      const y = startY + (targetY - startY) * v;
      const r = item.rotate * (1 - v);
      setPos({ left: `${50 + x}%`, top: `${50 + y}%`, rotate: r });
    });
    return unsub;
  }, [progress, startX, startY, item.rotate, targetX, targetY]);

  // Label fades out during convergence
  const [labelOpacity, setLabelOpacity] = useState(1);
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      setLabelOpacity(Math.max(0, 1 - v * 2.5));
    });
    return unsub;
  }, [progress]);

  // Border color shifts
  const [borderColor, setBorderColor] = useState("rgba(61, 53, 41, 0.12)");
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      if (v > 0.6) {
        setBorderColor("rgba(26, 92, 50, 0.4)");
      } else {
        setBorderColor("rgba(61, 53, 41, 0.12)");
      }
    });
    return unsub;
  }, [progress]);

  return (
    <motion.div
      ref={ref}
      className="absolute z-[5] flex flex-col items-center gap-1"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: staggerDelay, ease: "easeOut" }}
      style={{
        left: pos.left,
        top: pos.top,
        rotate: pos.rotate,
        x: "-50%",
        y: "-50%",
      }}
    >
      <div
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md flex items-center justify-center transition-colors duration-300"
        style={{ borderWidth: 1.5, borderStyle: "solid", borderColor }}
      >
        <Icon />
      </div>
      <span
        className="hidden sm:block text-stone text-[11px] font-medium whitespace-nowrap transition-opacity duration-300"
        style={{ opacity: labelOpacity }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

/* ── SVG Icons ── */
function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      <line x1="17" y1="1" x2="22" y2="6" stroke="#c9a84c" strokeWidth="2"/>
      <line x1="22" y1="1" x2="17" y2="6" stroke="#c9a84c" strokeWidth="2"/>
    </svg>
  );
}

function SheetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
      <line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  );
}

function StickyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"/>
      <polyline points="14 3 14 9 21 9"/>
      <line x1="7" y1="13" x2="13" y2="13" stroke="#c9a84c" strokeWidth="1.5"/>
      <line x1="7" y1="17" x2="11" y2="17" stroke="#c9a84c" strokeWidth="1.5"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="22,4 12,13 2,4"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <circle cx="8.5" cy="15.5" r="1.5" fill="#c9a84c" stroke="none"/>
      <circle cx="15.5" cy="15.5" r="1.5" fill="#c9a84c" stroke="none"/>
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="12" y2="17"/>
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="8" y1="16" x2="13" y2="16"/>
    </svg>
  );
}

function EntryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="10" y1="3" x2="10" y2="21"/>
      <path d="M14 13l2 2-2 2" stroke="#c9a84c" strokeWidth="1.5"/>
      <path d="M6 15h10" stroke="#c9a84c" strokeWidth="1.5"/>
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M8 16c0-2.8 2.2-5 5-5 1.8 0 3.4 1 4.2 2.4L19 16l-1.8 2.6c-.8 1.4-2.4 2.4-4.2 2.4-2.8 0-5-2.2-5-5z"
        stroke="#faf9f6"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M24 16c0 2.8-2.2 5-5 5-1.8 0-3.4-1-4.2-2.4L13 16l1.8-2.6c.8-1.4 2.4-2.4 4.2-2.4 2.8 0 5 2.2 5 5z"
        stroke="#faf9f6"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
