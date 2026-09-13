import { SKILL_CATEGORIES } from "@/data/portfolio";
import * as React from "react";
import { useInView } from "framer-motion";
import { animateEntrance } from "@/lib/anime";

export const SkillsSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" });

  React.useEffect(() => {
    if (isInView) {
      if (headingRef.current)
        animateEntrance(headingRef.current, { translateY: 20 });
      if (wrapperRef.current) {
        const categories = wrapperRef.current.querySelectorAll(".skill-category");
        categories.forEach((cat, idx) => {
          animateEntrance(cat as HTMLElement, {
            translateY: 20,
            delay: 100 + idx * 100,
          });
        });
      }
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-base section-padding scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="opacity-0 mb-12">
          <h2 className="font-mono uppercase text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Skills
          </h2>
          <div className="mt-6 h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div ref={wrapperRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="skill-category opacity-0">
              <h3 className="text-lg font-semibold text-foreground mb-4 font-heading border-b border-border pb-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="glass-card flex items-center justify-center border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 rounded-md"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
