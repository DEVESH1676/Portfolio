import {
  ADDITIONAL_PUBLICATIONS,
  FEATURED_PUBLICATION,
} from "@/data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export const PublicationsSection = () => {
  return (
    <motion.section
      id="publications"
      className="bg-secondary/40 py-24 scroll-mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      custom={0}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Selected Publications
          </h2>
          <p className="mt-4 text-base text-foreground/75 md:text-lg">
            Below are selected peer-reviewed publications. For the complete and
            updated list, visit Dr. Ghuge’s Google Scholar profile.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-primary/20 bg-background/95 shadow-xl">
            <CardHeader>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                Featured
              </span>
              <CardTitle className="font-heading text-2xl text-foreground">
                {FEATURED_PUBLICATION.title}
              </CardTitle>
              <p className="text-sm font-medium text-foreground/70">
                {FEATURED_PUBLICATION.authors}
              </p>
              <p className="text-sm text-primary/80">
                {FEATURED_PUBLICATION.venue}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-relaxed text-foreground/80">
                {FEATURED_PUBLICATION.abstract}
              </p>
              <Button asChild variant="outline" className="w-fit">
                <a
                  href={FEATURED_PUBLICATION.doiUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {FEATURED_PUBLICATION.doiLabel}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-primary/5 p-6 shadow-lg">
            <h3 className="font-heading text-xl font-semibold text-primary">
              Additional Publications
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-foreground/85">
              {ADDITIONAL_PUBLICATIONS.map((publication) => (
                <li
                  key={publication.title}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="block leading-snug">
                    {publication.title}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
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
    </motion.section>
  );
};
