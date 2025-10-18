import React from "react";
import { Card } from "@/components/ui/card";
import { PROJECTS } from "@/data/portfolio";

export const ProjectsSection = () => {
  const headingRef = React.useRef<HTMLElement | null>(null);
  const introRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
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
    });
  }, []);

  return (
    <section id="projects" className="bg-background py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2
            ref={headingRef}
            className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Projects &amp; Supervision
          </h2>
          <p
            ref={introRef}
            className="mt-4 text-base text-foreground/75 md:text-lg"
          >
            Guiding research projects and final-year students in the domains of
            machine learning, deep learning, and computer vision. Past works
            include hybrid tracking systems, object recognition models, and
            intelligent video analysis tools.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <Card
              key={project.title}
              className="flex h-full flex-col justify-between border border-primary/15 bg-primary/5 p-6 shadow-lg"
            >
              <div>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground/70">
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
