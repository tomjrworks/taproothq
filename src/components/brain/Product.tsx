"use client";

import InteractiveGraph from "./InteractiveGraph";

export default function Product() {
  return (
    <section id="product" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark">
          The Product
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-bark mt-4">
          Your firm&apos;s knowledge, always available.
        </h2>

        <p className="text-stone mt-4 max-w-2xl leading-relaxed">
          Built from your existing context &mdash; SOPs, client files,
          procedures, history &mdash; and connected so your workflows actually
          know your business.
        </p>

        {/* Interactive graph in a dark card */}
        <div className="mt-16 rounded-xl border border-bark/10 overflow-hidden bg-night shadow-lg">
          <InteractiveGraph />
          <div className="px-6 py-4 border-t border-ivory/5">
            <p className="font-mono text-xs uppercase tracking-widest text-stone text-center">
              Hover to explore connections &mdash; this is what your firm&apos;s
              knowledge looks like when it&apos;s connected
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
