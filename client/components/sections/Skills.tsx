import { SKILLS } from "@/data/portfolio";
import * as React from "react";
import { animateEntrance } from "@/lib/anime";

export const SkillsSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (headingRef.current) animateEntrance(headingRef.current, { translateY: 20 });
          if (gridRef.current) {
            const badges = gridRef.current.children;
            Array.from(badges).forEach((badge, i) => {
              // Staggered entrance for the badges
              animateEntrance(badge as HTMLElement, { translateY: 15, delay: 50 + (i * 30) });
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-base section-padding scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 ref={headingRef} className="font-heading font-semibold tracking-tight text-foreground opacity-0 mb-8">
          Skills & Stack
        </h2>
        
        <div ref={gridRef} className="flex flex-wrap gap-4">
          {SKILLS.map((skill) => {
            return (
              <div
                key={skill}
                className="glass-card flex items-center justify-center border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur-sm opacity-0 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
