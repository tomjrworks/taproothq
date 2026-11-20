import Engraving from "./Engraving";

const fade = "linear-gradient(to bottom, #000 50%, transparent 100%)";

/** The home hero's seed endpaper: drawn in ink at low strength, fading out before the contact section. */
export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ color: "var(--ink)", WebkitMaskImage: fade, maskImage: fade }}
    >
      <div className="absolute inset-0" style={{ opacity: 0.14 }}>
        <Engraving
          name="bg-endpaper"
          fade={false}
          preserve="xMidYMid slice"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
