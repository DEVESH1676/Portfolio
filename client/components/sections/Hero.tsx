import { CV_DOWNLOAD_URL, HERO_IMAGE_URL } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-secondary/40 pb-24 pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-background" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 md:flex-row md:items-start">
        <div className="w-full md:w-3/5">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Professional Academic Portfolio
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Dr. Chandrashekhar Arvind Ghuge (Dr. C. A. Ghuge)
          </h1>
          <p className="mt-4 text-lg font-medium text-primary md:text-xl">
            Associate Professor · Computer Vision Researcher · Ph.D., K L University (2023)
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Dr. C. A. Ghuge is an Associate Professor and researcher in computer vision and machine learning, focusing on video object retrieval and object tracking. He has published in peer-reviewed journals and leads research and student projects at P.E.S.’s Modern College of Engineering, Pune.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <a href="#publications">View Publications</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={CV_DOWNLOAD_URL} target="_blank" rel="noreferrer">
                Download CV
              </a>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-3xl border border-primary/20 bg-background shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
            <img
              src={HERO_IMAGE_URL}
              alt="Professional portrait of Dr. C. A. Ghuge"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent px-6 py-4 text-sm font-medium text-background">
              Dedicated to advancing intelligent vision systems
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
