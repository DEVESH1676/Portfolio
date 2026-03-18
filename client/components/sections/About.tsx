import { QUICK_FACTS, BIO_DATA } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import * as React from "react";
import { animateEntrance } from "@/lib/anime";

export const AboutSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (headingRef.current) animateEntrance(headingRef.current, { translateY: 20 });
          if (contentRef.current) animateEntrance(contentRef.current, { translateY: 20, delay: 100 });
          if (cardsRef.current) {
            const cards = cardsRef.current.children;
            Array.from(cards).forEach((card, i) => {
              animateEntrance(card as HTMLElement, { translateY: 20, delay: 200 + i * 100 });
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
    <section ref={sectionRef} id="about" className="section-alt section-padding scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 ref={headingRef} className="font-heading font-semibold tracking-tight text-foreground opacity-0">
              About {BIO_DATA.name}
            </h2>
            <div ref={contentRef} className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg opacity-0">
              {BIO_DATA.fullBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:sticky lg:top-32">
              {QUICK_FACTS.map((fact) => (
                <Card
                  key={fact.title}
                  className="glass-card border border-primary/10 bg-primary/5 p-6 shadow-lg backdrop-blur-sm opacity-0"
                >
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-primary mb-3">
                    {fact.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                    {fact.items.map((item) => (
                      <li key={item} className="leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

