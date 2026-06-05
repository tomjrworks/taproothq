/**
 * Shared demo-video player. Native HTML5 controls with a poster — the demo has
 * narration audio and runs 3:17, so it must NOT autoplay/loop/mute (unlike the
 * ambient GraphPayoff loop). `preload="metadata"` keeps the 12.6MB mp4 from
 * downloading until the visitor actually plays it. Server component (no client
 * JS) so it can be reused on the homepage section and the standalone /demo page.
 */
export default function DemoPlayer({ className = "" }: { className?: string }) {
  return (
    <video
      controls
      preload="metadata"
      playsInline
      poster="/images/demo-poster.jpg"
      className={`block w-full rounded-sm bg-bark/5 shadow-[0_12px_36px_-12px_rgba(61,53,41,0.22)] ${className}`}
    >
      <source src="/videos/demo.mp4" type="video/mp4" />
      Your browser doesn&rsquo;t support embedded video.{" "}
      <a href="/videos/demo.mp4" className="text-forest-dark underline">
        Download the demo
      </a>
      .
    </video>
  );
}
