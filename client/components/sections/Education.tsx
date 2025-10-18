import { EDUCATION_TIMELINE } from "@/data/portfolio";
import * as React from "react";
import Container from "@/components/ui/container";
import {
  animateLineDraw,
  animateEntrance,
  animatePulse,
  getAnimeLib,
  runAnime,
} from "@/lib/anime";

export const EducationSection = () => {
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const lineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const animeAPI = React.useRef<any>(null);

  React.useEffect(() => {
    let mounted = true;
    getAnimeLib().then((lib) => {
      if (mounted) animeAPI.current = lib;
    });
    return () => {
      mounted = false;
    };
  }, []);

  // 🧩 Animate line when in view
  React.useEffect(() => {
    const lineEl = lineRef.current;
    const container = lineContainerRef.current;
    if (!container || !lineEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

  // 🎞️ Timeline animation for cards + dots
  React.useEffect(() => {
    const dots = dotRefs.current.filter(Boolean) as HTMLElement[];
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!dots.length || !cards.length || !animeAPI.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anime = animeAPI.current;

            // 👇 Create Anime.js Timeline
            const tl = anime.timeline({
              easing: "easeOutExpo",
              duration: 700,
            });

            // Animate each dot + card in sequence
            dots.forEach((dot, i) => {
              const card = cards[i];
              tl.add({
                targets: dot,
                opacity: [0, 1],
                scale: [0.8, 1],
                translateY: [20, 0],
                duration: 500,
              })
              .add({
                targets: card,
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 600,
              }, "-=400"); // overlap slightly
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    if (cards[0]) observer.observe(cards[0]); // trigger when section visible
    return () => observer.disconnect();
  }, []);

  const handleCardHover = (index: number, enter = true) => {
    const dot = dotRefs.current[index] as HTMLElement | null;
    if (!dot) return;
    runAnime({
      targets: dot,
      scale: enter ? 1.12 : 1,
      duration: 200,
      easing: "easeOutQuad",
      translateZ: 0,
    }).catch(() => {});
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
          <div
            className="hidden md:block absolute left-14 top-6 bottom-6 z-0"
            ref={(el) => (lineContainerRef.current = el)}
          >
            <div
              ref={(el) => (lineRef.current = el)}
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
              className="absolute left-1/2 top-0 bottom-0 w-px timeline-line"
              aria-hidden
            />
          </div>

          <div className="flex flex-col relative z-10">
            {EDUCATION_TIMELINE.map((entry, index) => {
              const isCurrent = (entry as any).current ?? index === 0;
              return (
                <div
                  key={entry.degree}
                  className="mb-12 last:mb-0 md:grid md:grid-cols-[64px_1fr] md:items-center md:gap-6 py-4"
                >
                  {/* Dot */}
                  <div className="flex md:justify-center md:items-start">
                    <div className="flex flex-col items-center h-full">
                      <div
                        ref={(el) =>
                          (dotRefs.current[index] = el as HTMLDivElement)
                        }
                        className={`timeline-dot z-20 ${
                          isCurrent ? "current" : "inactive"
                        }`}
                        aria-hidden
                      >
                        <div className="inner" />
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <div
                      ref={(el) =>
                        (cardRefs.current[index] = el as HTMLDivElement)
                      }
                      onMouseEnter={() => handleCardHover(index, true)}
                      onMouseLeave={() => handleCardHover(index, false)}
                      className="rounded-2xl bg-background p-6 shadow-md ring-1 ring-primary/10 transition-transform duration-200 opacity-0 translate-y-8"
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
