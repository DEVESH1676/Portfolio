import React from "react";
import { useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PROJECTS, CONTENT_INTROS } from "@/data/portfolio";
import { animateEntrance, animateStaggeredChildren } from "@/lib/anime";

export const ProjectsSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const introRef = React.useRef<HTMLParagraphElement | null>(null);
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" });

  React.useEffect(() => {
    if (isInView) {
          if (headingRef.current)
            animateEntrance(headingRef.current, { translateY: 24, blur: true });

          if (introRef.current)
            animateEntrance(introRef.current, {
              translateY: 20,
              staggerIndex: 1,
              blur: true,
            });

          if (gridRef.current) {
            animateStaggeredChildren(gridRef.current, ".project-card", {
              translateY: 40,
              baseDelay: 200, // Wait for intro
            });
          }
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-base section-padding scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <div ref={headingRef} className="opacity-0">
            <h2 className="font-mono uppercase text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Projects
            </h2>
            <div className="mt-6 h-1 w-20 bg-primary rounded-full"></div>
          </div>
          <p ref={introRef} className="mt-4 text-foreground/75 opacity-0">
            {CONTENT_INTROS.projects}
          </p>
        </div>
        <div
          ref={gridRef}
          className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <Card
              key={project.title}
              className="project-card glass-card flex h-full flex-col justify-between border border-primary/15 bg-primary/5 p-6 md:p-8 shadow-premium opacity-0 group"
            >
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {project.role}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {project.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
