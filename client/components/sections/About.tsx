import { QUICK_FACTS, BIO_DATA } from "@/data/portfolio";
import { Card } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <section id="about" className="section-alt section-padding scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 className="font-heading font-semibold tracking-tight text-foreground">
              About {BIO_DATA.name}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              {BIO_DATA.fullBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:sticky lg:top-32">
              {QUICK_FACTS.map((fact) => (
                <Card
                  key={fact.title}
                  className="glass-card border border-primary/10 bg-primary/5 p-6 shadow-lg backdrop-blur-sm"
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
