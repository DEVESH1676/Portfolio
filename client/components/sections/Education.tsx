import { EDUCATION_TIMELINE } from "@/data/portfolio";

export const EducationSection = () => {
  return (
    <section id="education" className="bg-secondary/40 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Education
          </h2>
          <p className="mt-4 max-w-2xl text-base text-foreground/75 md:text-lg">
            A progressive academic journey grounded in Computer Engineering, culminating in a doctoral degree focused on advancing intelligent video analytics.
          </p>
        </div>
        <div className="relative ml-2 border-l-2 border-primary/30 pl-8">
          <div className="absolute left-[-0.3rem] top-0 h-4 w-4 rounded-full bg-primary" aria-hidden />
          {EDUCATION_TIMELINE.map((entry, index) => (
            <div key={entry.degree} className="relative pb-12 last:pb-0">
              <div className="absolute -left-[2.3rem] top-2 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-[0_0_0_6px] shadow-primary/20" />
              <div className="rounded-2xl bg-background p-6 shadow-lg ring-1 ring-primary/10">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-heading text-2xl font-semibold text-primary">
                    {entry.degree}
                  </h3>
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
                    {entry.year}
                  </span>
                </div>
                <p className="mt-2 text-lg font-medium text-foreground">
                  {entry.institution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {entry.highlight}
                </p>
              </div>
              {index === EDUCATION_TIMELINE.length - 1 ? null : (
                <div className="absolute left-[-0.05rem] top-full h-full w-[2px] bg-gradient-to-b from-primary/40 to-transparent" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
