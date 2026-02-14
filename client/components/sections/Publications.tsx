import React from "react";
import {
  ADDITIONAL_PUBLICATIONS,
  FEATURED_PUBLICATION,
  CONTENT_INTROS,
} from "@/data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const PublicationsSection = () => {
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const introRef = React.useRef<HTMLParagraphElement | null>(null);
  const featuredRef = React.useRef<HTMLDivElement | null>(null);
  const additionalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    import("@/lib/anime").then((mod) => {
      const { animateEntrance } = mod;
      // ... same animations
      if (headingRef.current)
        animateEntrance(headingRef.current, { translateY: 18, duration: 600 });
      if (introRef.current)
        animateEntrance(introRef.current, {
          translateY: 16,
          duration: 600,
          delay: 70,
        });
      if (featuredRef.current)
        animateEntrance(featuredRef.current, {
          translateY: 20,
          duration: 700,
          delay: 140,
        });
      if (additionalRef.current)
        animateEntrance(additionalRef.current, {
          translateY: 20,
          duration: 700,
          delay: 220,
        });
    });
  }, []);

  return (
    <section id="publications" className="section-base section-padding scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <h2
            ref={headingRef}
            className="font-heading font-semibold tracking-tight text-foreground"
          >
            Selected Publications
          </h2>
          <p
            ref={introRef}
            className="mt-4 text-foreground/75"
          >
            {CONTENT_INTROS.publications}
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Card
            ref={featuredRef}
            className="glass-card border border-primary/20 bg-background/95 shadow-xl p-6 md:p-10"
          >
            <CardHeader className="p-0 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-4">
                Featured
              </span>
              <CardTitle className="font-heading text-2xl text-foreground mt-2">
                {FEATURED_PUBLICATION.title}
              </CardTitle>
              <p className="text-sm font-medium text-foreground/70">
                {FEATURED_PUBLICATION.authors}
              </p>
              <p className="text-sm text-primary/80">
                {FEATURED_PUBLICATION.venue}
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <p className="text-sm leading-relaxed text-foreground/80">
                {FEATURED_PUBLICATION.abstract}
              </p>
              <Button asChild variant="outline" className="w-fit min-h-[48px] px-6">
                <a
                  href={FEATURED_PUBLICATION.doiUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {FEATURED_PUBLICATION.doiLabel}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card
            ref={additionalRef}
            className="glass-card border border-primary/10 bg-primary/5 p-6 md:p-8 shadow-lg"
          >
            <h3 className="font-heading text-xl font-semibold text-primary">
              Additional Publications
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-foreground/85">
              {ADDITIONAL_PUBLICATIONS.map((publication) => (
                <li
                  key={publication.title}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4"
                >
                  <span className="block leading-snug">
                    {publication.title}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary/80 border border-primary/10 whitespace-nowrap">
                    {publication.year}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-foreground/60">
              Full publication list available via Google Scholar.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
