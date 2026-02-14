import { EDUCATION_TIMELINE } from "@/data/portfolio";
import * as React from "react";
import Container from "@/components/ui/container";
import { animateLineDraw, animateEntrance, ANIME } from "@/lib/anime";
import { cn } from "@/lib/utils";

export const EducationSection = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // 1. Heading Entrance
          if (headingRef.current) {
            animateEntrance(headingRef.current, { translateY: 24, blur: true });
          }

          // 2. Line Draw "The Academic Journey Axis"
          // Starts after heading (100ms)
          const lineDuration = 2500; // Narrative pace (Slower)
          if (lineRef.current) {
            animateLineDraw(lineRef.current, {
              duration: lineDuration,
              delay: 100,
              easing: "linear" // Linear progress feels most natural for a timeline
            });
          }

          // 3. Sequential Narrative
          // Item 1 triggers at 100ms (start of line)
          // Item 2 triggers at 100ms + (2500 * 1/N)
          // ... 
          const baseDelay = 100;
          const interval = lineDuration / EDUCATION_TIMELINE.length;

          EDUCATION_TIMELINE.forEach((_, index) => {
            const delay = baseDelay + (interval * index);

            // Dot Pulse (Sync with line arrival)
            const dot = dotRefs.current[index];
            if (dot) {
              animateEntrance(dot, {
                scale: 1,
                opacity: 1,
                delay: delay,
                duration: 500,
                easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Pop
                blur: true,
              });
            }

            // Card Directional Slide (Sync slightly after dot)
            const card = cardRefs.current[index];
            if (card) {
              const isEven = index % 2 === 0;
              const isDesktop = window.matchMedia("(min-width: 768px)").matches;

              if (isDesktop) {
                // Even (Left) -> Slide from Left (-50px)
                // Odd (Right) -> Slide from Right (50px)
                const startX = isEven ? -50 : 50;

                card.animate(
                  [
                    { opacity: 0, transform: `translate3d(${startX}px, 0, 0)`, filter: "blur(6px)" },
                    { opacity: 1, transform: `translate3d(0, 0, 0)`, filter: "blur(0px)" }
                  ],
                  {
                    duration: 800,
                    delay: delay + 150, // Card 150ms after dot
                    easing: ANIME.premiumEasing,
                    fill: "forwards"
                  }
                );
              } else {
                // Mobile: Standard Slide Up
                animateEntrance(card, {
                  translateY: 30,
                  opacity: 1,
                  delay: delay + 150,
                  duration: 800,
                  blur: true,
                });
              }
            }
          });

          observer.disconnect();
        }
      },
      { threshold: 0.15 } // Trigger when 15% visible
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section-base relative section-padding scroll-mt-24">
      {/* Background accent removed for strict semantic compliance */}

      <Container>
        <div ref={containerRef} className="relative">
          {/* Main Container Wrapper for IntersectionObserver */}

          <div className="mb-16 text-center md:mb-24">
            <h2
              ref={headingRef}
              className="font-heading font-bold tracking-tight text-foreground opacity-0"
            >
              Academic Milestones
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/75 text-lg opacity-0" ref={(el) => {
              // Quick inline animation for subtitle if desired, or just let it inherit visibility
              if (el) animateEntrance(el, { translateY: 16, delay: 100, blur: true });
            }}>
              A continuous journey of specialization in Computer Vision and Intelligent Systems.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Vertical Line: Left on mobile, Center on desktop */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 md:transform-none">
              {/* Background Track (Faint) */}
              <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-border/20 to-transparent" />

              {/* Animated Progress Line */}
              <div
                ref={lineRef}
                className="absolute inset-0 w-full origin-top scale-y-0 bg-[linear-gradient(to_bottom,transparent,hsl(var(--primary))_15%,hsl(var(--primary))_85%,transparent)] opacity-80 dark:opacity-100 dark:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
              />
            </div>

            <div className="flex flex-col gap-8 md:gap-0">
              {EDUCATION_TIMELINE.map((entry, index) => {
                const isEven = index % 2 === 0;
                const isCurrent = (entry as any).current ?? index === 0;

                return (
                  <div
                    key={entry.degree}
                    className={cn(
                      "relative flex items-center md:justify-between group", // Group for hover effects
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    )}
                  >
                    {/* Empty half for desktop spacing */}
                    <div className="hidden md:block md:w-5/12" />

                    {/* LEVEL 3 REFINED: Dot Micro-interactions */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 w-8 h-8">
                      <div
                        ref={(el) => (dotRefs.current[index] = el)}
                        className={cn(
                          "relative flex items-center justify-center rounded-full transition-all duration-500 opacity-0",
                          isCurrent
                            ? "h-6 w-6 bg-primary shadow-[0_0_12px_-2px_rgba(var(--primary),0.6)]" // Active: Glow + Grenade
                            : "h-4 w-4 bg-background border-2 border-primary/20 group-hover:border-primary group-hover:scale-110", // Inactive: Matte + Subtle Hover
                        )}
                      >
                        {/* Active Grenade Pulse */}
                        {isCurrent && (
                          <>
                            <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 animate-[pulse_2s_ease-in-out_infinite] scale-150" />
                            <span className="absolute inset-0 -z-10 rounded-full bg-primary/20 animate-[pulse_3s_ease-in-out_infinite] scale-[2]" />
                          </>
                        )}

                        {/* Inner Dot */}
                        <div className={cn(
                          "rounded-full transition-all duration-300",
                          isCurrent
                            ? "h-2 w-2 bg-background"
                            : "h-1.5 w-1.5 bg-primary/20 group-hover:bg-primary" // Clean Matte Inner
                        )} />
                      </div>
                    </div>

                    {/* Content Card (Level 2 Elevation) */}
                    <div
                      className={cn(
                        "pl-20 md:pl-0 w-full md:w-5/12",
                        isEven ? "md:text-right" : "md:text-left"
                      )}
                    >
                      <div
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="glass-card p-6 md:p-8 rounded-2xl border-primary/10 hover:border-primary/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 card-elevate group opacity-0"
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

                        {/* Level 7: Subtle Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent my-3" />

                        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                          {entry.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
