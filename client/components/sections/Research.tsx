import React from "react";
import { RESEARCH_TAGS, CONTENT_INTROS } from "@/data/portfolio";

export const ResearchSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const tagRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const introRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const tags = tagRefs.current.filter(Boolean) as HTMLElement[];
          import("@/lib/anime").then((mod) => {
            const { animateEntrance } = mod;
            if (headingRef.current)
              animateEntrance(headingRef.current, { translateY: 18, duration: 600 });
            if (introRef.current)
              animateEntrance(introRef.current, {
                translateY: 16,
                duration: 600,
                delay: 70,
              });
            if (tags.length) {
              tags.forEach((el, i) => {
                animateEntrance(el, {
                  translateY: 12,
                  duration: 480,
                  delay: i * 60 + 140,
                  blur: true,
                });
              });
            }
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="research" className="section-alt section-padding scroll-mt-24">

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2
              ref={headingRef}
              className="font-heading font-semibold tracking-tight text-foreground opacity-0"
            >
              Research Interests
            </h2>
            <p
              ref={introRef}
              className="mt-4 text-foreground/80 opacity-0"
            >
              {CONTENT_INTROS.research}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {RESEARCH_TAGS.map((tag, i) => (
              <span
                key={tag}
                ref={(el) => (tagRefs.current[i] = el)}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-sans bg-primary/10 text-primary border border-primary/20 mb-2 mr-2 whitespace-nowrap transition-colors duration-300 hover:bg-primary/25 hover:border-primary/40 hover:text-primary-hover opacity-0"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
