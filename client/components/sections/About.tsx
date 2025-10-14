import { QUICK_FACTS } from "@/data/portfolio";
import { Card } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <section id="about" className="bg-background py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              About Dr. C. A. Ghuge
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              <p>
                Dr. Chandrashekhar Arvind Ghuge completed his Ph.D. from K L University in 2023. He holds an M.E. from D. Y. Patil, Akurdi, and a B.E. from a college in Dhule. He currently serves as Associate Professor and Head of AI &amp; Machine Learning (Information Technology) at P.E.S.’s Modern College of Engineering, Pune.
              </p>
              <p>
                His research interests include Computer Vision, Video Retrieval, Object Tracking, and Machine Learning. He collaborates with multidisciplinary teams to deliver impactful research outcomes and to mentor the next generation of engineers and scientists.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {QUICK_FACTS.map((fact) => (
              <Card key={fact.title} className="border border-primary/20 bg-primary/5 p-6 shadow-lg">
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
