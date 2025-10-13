import { RESEARCH_TAGS } from "@/data/portfolio";

export const ResearchSection = () => {
  return (
    <section id="research" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Research Interests
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              My research focuses on computer vision and video analytics — object detection and tracking across frames, query-based video retrieval, hybrid machine learning models, and practical deployment of intelligent vision systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {RESEARCH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
