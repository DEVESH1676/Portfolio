import { EDUCATION_TIMELINE } from "@/data/portfolio";
import Container from "@/components/ui/container";

export const EducationSection = () => {
  return (
    <section id="education" className="bg-secondary/40 py-24 scroll-mt-24">
      <Container>
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
        <div className="">
          {/* Timeline Entries - each row has a left column for dot/line and right column for content */}
          <div className="flex flex-col">
            {EDUCATION_TIMELINE.map((entry, index) => {
              const isLast = index === EDUCATION_TIMELINE.length - 1;
              return (
                <div
                  key={entry.degree}
                  className="mb-12 last:mb-0 md:grid md:grid-cols-[64px_1fr] md:items-start"
                >
                  {/* Left column: dot and connecting line */}
                  <div className="flex md:justify-center">
                    <div className="flex flex-col items-center">
                      <div
                        className="h-6 w-6 rounded-full bg-primary/20 ring-2 ring-primary/40 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                        aria-hidden
                      >
                        <div className="h-3 w-3 rounded-full bg-primary" />
                      </div>
                      {/* connecting line */}
                      <div
                        className={
                          "hidden md:block w-px bg-gradient-to-b from-primary/40 to-transparent mt-2 flex-1 " +
                          (isLast ? "opacity-0" : "opacity-80")
                        }
                        aria-hidden
                      />
                    </div>
                  </div>

                  {/* Right column: content */}
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <div className="rounded-2xl bg-background p-6 shadow-md ring-1 ring-primary/10 transition-transform duration-200 hover:-translate-y-1">
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
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
