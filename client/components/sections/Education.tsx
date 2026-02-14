import { EDUCATION_TIMELINE, EducationEntry } from "@/data/portfolio"; // Import interface
import * as React from "react";
import Container from "@/components/ui/container";
import {
  animateLineDraw,
  animateEntrance,
  runAnime,
  // getAnimeLib removed
} from "@/lib/anime";

export const EducationSection = () => {
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const lineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  // animeAPI ref removed as it's no longer needed

  // Removed getAnimeLib useEffect

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
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!dots.length) return;

    // Observer for dots
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            animateEntrance(el, {
              translateY: 8,
              duration: 420,
              easing: "cubic-bezier(0.19, 1, 0.22, 1)",
            });
            dotObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    dots.forEach((d) => dotObserver.observe(d));

    // Observer for cards with stagger
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const index = cards.indexOf(el);
            // Stagger delay based on index (e.g., 100ms per item)
            const delay = index * 100;

            animateEntrance(el, {
              translateY: 20,
              duration: 600,
              delay,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            });
            cardObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((c) => {
      if (c) {
        // Set initial opacity to 0 to ensure fade-in works
        c.style.opacity = "0";
        cardObserver.observe(c);
      }
    });

    return () => {
      dotObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const handleCardHover = (index: number, enter = true) => {
    const dot = dotRefs.current[index] as HTMLElement | null;
    if (!dot) return;

    // Updated runAnime call to WAAPI signature
    // runAnime(el, keyframes, options)
    runAnime(
      dot,
      [{ transform: enter ? "scale(1.12) translateZ(0)" : "scale(1) translateZ(0)" }],
      {
        duration: 200,
        easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)", // easeOutQuad
        fill: "forwards"
      }
    );
  };

  return (
    <section id="education" className="bg-secondary/40 section-padding scroll-mt-24">
      <Container>
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="font-heading font-semibold tracking-tight text-foreground">
            Education
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/75">
            A progressive academic journey grounded in Computer Engineering,
            culminating in a doctoral degree focused on advancing intelligent
            video analytics.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Continuous vertical line for timeline (visible on md+) */}
          <div
            className="hidden md:block absolute left-8 top-6 bottom-6 z-0"
            ref={(el) => (lineContainerRef.current = el)}
          >
            <div
              ref={(el) => (lineRef.current = el)}
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
              aria-hidden
            />
          </div>

          {/* Timeline Entries - each row has a left column for dot/line and right column for content */}
          <div className="flex flex-col relative z-10">
            {EDUCATION_TIMELINE.map((entry, index) => {
              // const isLast = index === EDUCATION_TIMELINE.length - 1;
              const isCurrent = (entry as EducationEntry).current ?? index === 0;
              return (
                <div
                  key={entry.degree}
                  className="mb-12 last:mb-0 md:grid md:grid-cols-[64px_1fr] md:items-center md:gap-6 py-4"
                >
                  {/* Left column: dot and spacer (dot centered over the continuous line) */}
                  <div className="flex md:justify-center md:items-start">
                    <div className="flex flex-col items-center h-full">
                      <div
                        ref={(el) =>
                          (dotRefs.current[index] = el as HTMLDivElement)
                        }
                        className={
                          "z-20 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-300 " +
                          (isCurrent
                            ? "border-primary bg-background shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                            : "border-muted-foreground/30 bg-background")
                        }
                        role="presentation"
                        tabIndex={-1}
                        aria-hidden
                      >
                        {isCurrent && (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right column: content */}
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <div
                      ref={(el) =>
                        (cardRefs.current[index] = el as HTMLDivElement)
                      }
                      onMouseEnter={() => handleCardHover(index, true)}
                      onMouseLeave={() => handleCardHover(index, false)}
                      className="glass-card rounded-2xl bg-background p-6 md:p-8 shadow-md ring-1 ring-primary/10 transition-transform duration-200 card-elevate"
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
