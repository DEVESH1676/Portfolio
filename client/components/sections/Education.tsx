import { EDUCATION_TIMELINE, EducationEntry } from "@/data/portfolio";
import * as React from "react";
import Container from "@/components/ui/container";
import { animateLineDraw, animateEntrance, runAnime } from "@/lib/anime";
import { cn } from "@/lib/utils";

export const EducationSection = () => {
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const lineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const lineEl = lineRef.current;
    const container = lineContainerRef.current;
    if (!container || !lineEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateLineDraw(lineEl, { duration: 1200 });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -15% 0px" },
    );

    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const dots = dotRefs.current.filter(Boolean) as HTMLElement[];
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!dots.length) return;

    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateEntrance(entry.target as HTMLElement, {
              scale: 1,
              opacity: 1,
              duration: 400,
              easing: "cubic-bezier(0.19, 1, 0.22, 1)",
            });
            dotObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateEntrance(entry.target as HTMLElement, {
              translateY: 24,
              opacity: 1,
              duration: 700,
              easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    dots.forEach((d) => {
      if (d) {
        d.style.opacity = "0";
        d.style.transform = "scale(0)";
        dotObserver.observe(d);
      }
    });

    cards.forEach((c) => {
      if (c) {
        c.style.opacity = "0"; // Initial state for entrance
        cardObserver.observe(c);
      }
    });

    return () => {
      dotObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section id="education" className="section-base relative section-padding scroll-mt-24">
      {/* Background accent removed for strict semantic compliance */}

      <Container>
        <div className="mb-16 text-center md:mb-24">
          <h2 className="font-heading font-bold tracking-tight text-foreground">
            Academic Milestones
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/75 text-lg">
            A continuous journey of specialization in Computer Vision and Intelligent Systems.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl" ref={lineContainerRef}>
          {/* Vertical Line: Left on mobile, Center on desktop */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-border/40 md:transform-none">
            <div
              ref={lineRef}
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-0">
            {EDUCATION_TIMELINE.map((entry, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = (entry as any).current ?? index === 0; // Fallback if type not fully updated yet

              return (
                <div
                  key={entry.degree}
                  className={cn(
                    "relative flex items-center md:justify-between",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* Empty half for desktop spacing */}
                  <div className="hidden md:block md:w-5/12" />

                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 w-8 h-8">
                    <div
                      ref={(el) => (dotRefs.current[index] = el)}
                      className={cn(
                        "relative flex items-center justify-center rounded-full transition-all duration-500",
                        isCurrent ? "h-6 w-6" : "h-4 w-4",
                        isCurrent ? "bg-primary" : "bg-muted-foreground/30"
                      )}
                    >
                      {isCurrent && (
                        <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 animate-[pulse_2s_ease-in-out_infinite] scale-150" />
                      )}
                      {isCurrent && (
                        <span className="absolute inset-0 -z-10 rounded-full bg-primary/20 animate-[pulse_3s_ease-in-out_infinite] scale-[2]" />
                      )}

                      <div className={cn("rounded-full bg-background", isCurrent ? "h-2 w-2" : "h-0 w-0")} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={cn(
                      "pl-20 md:pl-0 w-full md:w-5/12",
                      isEven ? "md:text-right" : "md:text-left"
                    )}
                  >
                    <div
                      ref={(el) => (cardRefs.current[index] = el)}
                      className="glass-card p-6 md:p-8 rounded-2xl border-primary/10 hover:border-primary/30 transition-colors duration-300 card-elevate group"
                    >
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/10">
                        {entry.year}
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {entry.degree}
                      </h3>
                      <p className="text-lg font-medium text-foreground/80 mt-1">
                        {entry.institution}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-foreground/70">
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
