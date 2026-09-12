import { BIO_DATA, EDUCATION_TIMELINE } from "@/data/portfolio";
import * as React from "react";
import { animateEntrance, animateLineDraw, ANIME } from "@/lib/anime";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Timeline Refs
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const connectorRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const edCardRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // About Me Animations
          if (headingRef.current)
            animateEntrance(headingRef.current, { translateY: 20 });
          if (contentRef.current)
            animateEntrance(contentRef.current, { translateY: 20, delay: 100 });

          // Education Timeline Animations
          const lineDuration = 1800;
          if (lineRef.current) {
            animateLineDraw(lineRef.current, {
              duration: lineDuration,
              delay: 300,
              easing: "linear",
            });
          }

          const baseDelay = 300;
          const interval = lineDuration / EDUCATION_TIMELINE.length;

          EDUCATION_TIMELINE.forEach((_, index) => {
            const delay = baseDelay + interval * index;
            const dot = dotRefs.current[index];
            if (dot) {
              animateEntrance(dot, {
                scale: 1,
                opacity: 1,
                delay: delay,
                duration: 500,
                easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                blur: true,
              });
              dot.animate(
                [
                  {
                    transform: "scale(1)",
                    backgroundColor: "hsl(var(--background))",
                  },
                  {
                    transform: "scale(1.5)",
                    backgroundColor: "hsl(var(--primary))",
                    offset: 0.5,
                  },
                  {
                    transform: "scale(1)",
                    backgroundColor: "hsl(var(--background))",
                  },
                ],
                { duration: 600, delay: delay + 200, easing: "ease-out" },
              );
            }

            const connector = connectorRefs.current[index];
            if (connector) {
              connector.animate(
                [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
                {
                  duration: 400,
                  delay: delay + 100,
                  easing: ANIME.premiumEasing,
                  fill: "forwards",
                },
              );
            }

            const card = edCardRefs.current[index];
            if (card) {
              animateEntrance(card, {
                translateY: 20,
                opacity: 1,
                delay: delay + 150,
                duration: 800,
                blur: true,
              });
            }
          });

          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-alt section-padding scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          {/* Left Column: About Me Text */}
          <div>
            <h2
              ref={headingRef}
              className="font-mono uppercase text-3xl font-bold tracking-tight text-foreground opacity-0"
            >
              About Me
            </h2>
            <div
              ref={contentRef}
              className="mt-8 space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg opacity-0"
            >
              {BIO_DATA.fullBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Education Timeline */}
          <div className="relative pt-2 flex flex-col h-full">
            <h3 className="font-mono uppercase tracking-tight text-3xl font-bold text-foreground mb-8 shrink-0">
              Education
            </h3>
            <div className="relative flex-1 pb-4">
              {/* Vertical Line */}
              <div className="absolute left-4 top-4 bottom-4 w-[2px] -translate-x-1/2">
                <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-border/20 to-transparent" />
                <div
                  ref={lineRef}
                  className="absolute inset-0 w-full origin-top scale-y-0 bg-[linear-gradient(to_bottom,transparent,hsl(var(--primary))_15%,hsl(var(--primary))_85%,transparent)] opacity-80 dark:opacity-100 dark:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                />
              </div>

              <div className="flex flex-col justify-between h-full gap-10">
                {EDUCATION_TIMELINE.map((entry, index) => {
                  const isCurrent = entry.current ?? false;
                  return (
                    <div
                      key={entry.degree}
                      className="relative flex items-start group"
                    >
                      {/* Dot */}
                      <div className="absolute left-4 -translate-x-1/2 mt-1.5 flex items-center justify-center z-10 w-8 h-8">
                        <div
                          ref={(el) => (dotRefs.current[index] = el)}
                          className={cn(
                            "relative flex items-center justify-center rounded-full transition-all duration-500 opacity-0",
                            isCurrent
                              ? "h-5 w-5 bg-primary shadow-[0_0_12px_-2px_rgba(var(--primary),0.6)]"
                              : "h-3.5 w-3.5 bg-background border-2 border-primary/20 group-hover:border-primary group-hover:scale-110",
                          )}
                        >
                          {isCurrent && (
                            <>
                              <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 animate-[pulse_2s_ease-in-out_infinite] scale-150" />
                              <span className="absolute inset-0 -z-10 rounded-full bg-primary/20 animate-[pulse_3s_ease-in-out_infinite] scale-[2]" />
                            </>
                          )}
                          <div
                            className={cn(
                              "rounded-full transition-all duration-300",
                              isCurrent
                                ? "h-1.5 w-1.5 bg-background"
                                : "h-1.5 w-1.5 bg-primary/20 group-hover:bg-primary",
                            )}
                          />
                        </div>
                        {/* Connector */}
                        <div
                          ref={(el) => (connectorRefs.current[index] = el)}
                          className="absolute left-1/2 top-1/2 -translate-y-1/2 h-[2px] bg-primary/30 w-8 -z-10 origin-left scale-x-0"
                        />
                      </div>

                      {/* Content Card */}
                      <div className="pl-14 w-full">
                        <div
                          ref={(el) => (edCardRefs.current[index] = el)}
                          className="opacity-0"
                        >
                          <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/10">
                            {entry.year}
                          </span>
                          <h4 className="font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {entry.degree}
                          </h4>
                          <p className="text-sm font-medium text-foreground/70 mt-1">
                            {entry.institution}
                          </p>
                          {entry.highlight && (
                            <p className="text-xs text-foreground/50 mt-3 leading-relaxed border-l-2 border-primary/20 pl-3">
                              {entry.highlight}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
