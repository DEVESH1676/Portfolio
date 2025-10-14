import { Button } from "@/components/ui/button";
import { CV_DOWNLOAD_URL, RESEARCH_SUMMARY_URL } from "@/data/portfolio";

export const CurriculumVitaeSection = () => {
  return (
    <section id="cv" className="bg-background py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 px-8 py-12 shadow-xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Curriculum Vitae
          </h2>
          <p className="mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
            Download CV (PDF) — updated 2025. Explore a consolidated summary of academic milestones, teaching experience, research supervision, and collaborations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href={CV_DOWNLOAD_URL} target="_blank" rel="noreferrer">
                Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={RESEARCH_SUMMARY_URL} target="_blank" rel="noreferrer">
                Research Summary
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
