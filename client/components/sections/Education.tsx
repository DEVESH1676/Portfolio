import { EDUCATION_TIMELINE } from "@/data/portfolio";

export const EducationSection = () => {
  return (
    <section id="education" className="bg-secondary/40 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Education
          </h2>
          <p className="mt-4 max-w-2xl text-base text-foreground/75 md:text-lg">
            A progressive academic journey grounded in Computer Engineering,
            culminating in a doctoral degree focused on advancing intelligent
            video analytics.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative ml-4 pl-8">
          {/* Vertical Line */}
          <div
            className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 to-transparent"
            aria-hidden
          />

          {EDUCATION_TIMELINE.map((entry, index) => {
            const isCurrent = index === 0; // assume first item (Ph.D.) is current
            return (
              <div key={entry.degree} className="relative pb-12 last:pb-0">
                {/* Dot + shadow */}
                <div className="absolute left-0 top-6 flex h-6 w-6 -translate-x-1/2 items-center justify-center">
                  <div
                    className={`h-6 w-6 rounded-full ${
                      isCurrent ? "bg-transparent ring-2 ring-primary" : "bg-primary/20 ring-2 ring-primary/40"
                    }`}
                  />
                  <div
                    className={`absolute h-3 w-3 rounded-full ${
                      isCurrent ? "bg-primary" : "bg-primary"
                    }`}
                  />
                </div>

                {/* Content Card */}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
