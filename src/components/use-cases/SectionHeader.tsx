export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="inline-block">
        <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-forest-dark leading-tight tracking-tight">
          {title}
        </p>
        <span className="block h-px w-full bg-forest-dark mt-3 md:mt-4" />
      </div>
    </div>
  );
}
