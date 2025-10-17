import { EDUCATION_TIMELINE } from "@/data/portfolio";

export const EducationSection = () => {
  // Calculate proportional spacing based on years
  const maxGap = 10; // Maximum vertical space in rem (adjustable)
  const minGap = 4; // Minimum vertical space in rem (adjustable)
  
  // Get min and max year for normalization
  const years = EDUCATION_TIMELINE.map((e) => e.year);
  const numericYears = years.map((y) => parseInt(y) || 0);
  const minYear = Math.min(...numericYears);
  const maxYear = Math.max(...numericYears);

  const getSpacing = (year: number) => {
    if (!year || maxYear === minYear) return `${minGap}rem`;
    const ratio = (year - minYear) / (maxYear - minYear);
    return `${minGap + ratio * (maxGap - minGap)}rem`;
  };

  return (
    <section id="education" className="bg-secondary/40 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Heading */}
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
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 to-transparent" aria-hidden />

          {/* Timeline Entries */}
          {EDUCATION_TIMELINE.map((entry, index) => {
            const spacing = index === 0 ? "0rem" : getSpacing(numericYears[index] - 0); // spacing for previous gap

            return (
              <div
                key={entry.degree}
                className="relative flex items-start"
                style={{ marginBottom: spacing }}
              >
                {/* Dot + Ring */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary/20 ring-2 ring-primary/40 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Card */}
                <div className="ml-16 rounded-2xl bg-background p-6 shadow-lg ring-1 ring-primary/10 flex-1">
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
