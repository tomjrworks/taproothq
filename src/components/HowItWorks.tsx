import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import RevealOnScroll from "./RevealOnScroll";

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream-dark">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3 text-center">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight text-center">
            Simple process. Real results.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-cream flex items-center justify-center font-display font-bold text-lg mx-auto">
                  {step.number}
                </div>
                <h3 className="font-display text-xl font-semibold text-bark mt-5 mb-2">
                  {step.title}
                </h3>
                <p className="text-stone leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
