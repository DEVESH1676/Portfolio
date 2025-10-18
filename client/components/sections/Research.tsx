import React from "react";
import { RESEARCH_TAGS } from "@/data/portfolio";

export const ResearchSection = () => {
  const tagRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const introRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
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
          });
        });
      }
    });
  }, []);

  return (
    <section id="research" className="bg-background py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2
              ref={headingRef}
              className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Research Interests
            </h2>
            <p
              ref={introRef}
              className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg"
            >
              My research focuses on computer vision and video analytics —
              object detection and tracking across frames, query-based video
              retrieval, hybrid machine learning models, and practical
              deployment of intelligent vision systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {RESEARCH_TAGS.map((tag, i) => (
              <span
                key={tag}
                ref={(el) => (tagRefs.current[i] = el)}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40"
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
