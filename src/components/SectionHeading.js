export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 leading-relaxed text-base-content/70">{subtitle}</p>
      )}
    </div>
  );
}
