import { EDUCATION_TIMELINE } from "@/data/portfolio";
import * as React from "react";
import Container from "@/components/ui/container";
import { animateLineDraw, animateEntrance, animatePulse, getAnimeLib } from "@/lib/anime";

export const EducationSection = () => {
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const lineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const animeAPI = React.useRef<any>(null);

  React.useEffect(() => {
    // load anime helper once
    let mounted = true;
    getAnimeLib().then((lib) => {
      if (mounted) animeAPI.current = lib;
    });
    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    const lineEl = lineRef.current;
    const container = lineContainerRef.current;
    if (!container || !lineEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use centralized helper to draw the line
            animateLineDraw(lineEl, { duration: 900 });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -10% 0px" },
    );

    obs.observe(container);

    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const dots = dotRefs.current.filter(Boolean) as HTMLElement[];
    if (!dots.length) return;

    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const i = dots.indexOf(el);
          if (entry.isIntersecting) {
            // Entrance animation for the dot
            animateEntrance(el, { translateY: 8, duration: 420, easing: "easeOutExpo" });

            // If it's current, add subtle pulsing (loop)
            if ((EDUCATION_TIMELINE[i] as any).current ?? i === 0) {
              animatePulse(el, { scale: [1, 1.06], duration: 1200 });
            }

            dotObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    dots.forEach((d) => dotObserver.observe(d));

    return () => dotObserver.disconnect();
  }, []);

  const handleCardHover = (index: number, enter = true) => {
    const dot = dotRefs.current[index] as HTMLElement | null;
    if (!dot) return;
    // use cached anime lib if available for quick pop; otherwise fallback to CSS scale
    const a = animeAPI.current;
    if (a) {
      a({ targets: dot, scale: enter ? 1.12 : 1, duration: 200, easing: "easeOutQuad" });
    }
  };

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
        <div className="relative">
          {/* Continuous vertical line for timeline (visible on md+) */}
          <div
            className="hidden md:block absolute left-14 top-6 bottom-6 z-0"
            ref={(el) => (lineContainerRef.current = el)}
          >
            <div
              ref={(el) => (lineRef.current = el)}
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
              className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent timeline-line"
              aria-hidden
            />
          </div>

          {/* Timeline Entries - each row has a left column for dot/line and right column for content */}
          <div className="flex flex-col relative z-10">
            {EDUCATION_TIMELINE.map((entry, index) => {
              const isLast = index === EDUCATION_TIMELINE.length - 1;
              const isCurrent = (entry as any).current ?? index === 0;
              return (
                <div
                  key={entry.degree}
                  className="mb-12 last:mb-0 md:grid md:grid-cols-[64px_1fr] md:items-center md:gap-6 py-4"
                >
                  {/* Left column: dot and spacer (dot centered over the continuous line) */}
                  <div className="flex md:justify-center md:items-start">
                    <div className="flex flex-col items-center h-full">
                      <div
                        ref={(el) => (dotRefs.current[index] = el as HTMLDivElement)}
                        className={
                          "flex items-center justify-center rounded-full transition-transform duration-200 transform-gpu z-20 " +
                          (isCurrent
                            ? "h-7 w-7 bg-primary/60 ring-2 ring-primary/70 shadow-[0_8px_24px_rgba(59,130,246,0.12)]"
                            : "h-6 w-6 bg-primary/10 ring-2 ring-primary/30")
                        }
                        aria-hidden
                      >
                        <div
                          className={
                            "rounded-full " +
                            (isCurrent
                              ? "h-3 w-3 bg-primary/90"
                              : "h-3 w-3 bg-primary/60")
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right column: content */}
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <div
                      ref={(el) => (cardRefs.current[index] = el as HTMLDivElement)}
                      onMouseEnter={() => handleCardHover(index, true)}
                      onMouseLeave={() => handleCardHover(index, false)}
                      className="rounded-2xl bg-background p-6 shadow-md ring-1 ring-primary/10 transition-transform duration-200 hover:-translate-y-1"
                    >
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
