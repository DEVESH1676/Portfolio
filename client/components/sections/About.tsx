import { QUICK_FACTS, BIO_DATA } from "@/data/portfolio";
import { Card } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <section id="about" className="bg-background section-padding scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 className="font-heading font-semibold tracking-tight text-foreground">
              About Dr. C. A. Ghuge
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              {BIO_DATA.fullBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {QUICK_FACTS.map((fact) => (
              <Card
                key={fact.title}
                className="glass-card border border-primary/20 bg-primary/5 p-6 shadow-lg"
              >
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {fact.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
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
    </section>
  );
};
