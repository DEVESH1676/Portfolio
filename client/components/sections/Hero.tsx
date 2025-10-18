import { CV_DOWNLOAD_URL, HERO_IMAGE_URL } from "@/data/portfolio";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import { fadeInUp } from "@/lib/animations";

export const HeroSection = () => {
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement | null>(null);
  const descRef = React.useRef<HTMLParagraphElement | null>(null);
  const ctasRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // animate hero entrance with anime.js staggered sequence
    import("@/lib/anime").then((mod) => {
      const { animateEntrance } = mod;
      if (titleRef.current)
        animateEntrance(titleRef.current, {
          translateY: 24,
          duration: 700,
          delay: 80,
        });
      if (subtitleRef.current)
        animateEntrance(subtitleRef.current, {
          translateY: 18,
          duration: 600,
          delay: 180,
        });
      if (descRef.current)
        animateEntrance(descRef.current, {
          translateY: 12,
          duration: 600,
          delay: 280,
        });
      if (ctasRef.current)
        animateEntrance(ctasRef.current, {
          translateY: 8,
          duration: 600,
          delay: 360,
        });
    });
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-secondary/40 pb-24 pt-36 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-background" />

      <Container className="flex flex-col items-center gap-16 md:flex-row md:items-start">
        {/* Text Section */}
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-start">
          <span
            ref={subtitleRef}
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Professional Academic Portfolio
          </span>

          <h1
            ref={titleRef}
            className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl text-center md:text-left"
          >
            Dr. Chandrashekhar Arvind Ghuge
          </h1>

          <p
            ref={subtitleRef}
            className="mt-4 text-lg font-medium text-primary md:text-xl text-center md:text-left"
          >
            Associate Professor · Computer Vision Researcher · Ph.D., K L
            University (2023)
          </p>

          <p
            ref={descRef}
            className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg text-center md:text-left"
          >
            Dr. C. A. Ghuge is an Associate Professor and researcher in computer
            vision and machine learning, focusing on video object retrieval and
            object tracking. He has published in peer-reviewed journals and
            leads research and student projects at P.E.S.’s Modern College of
            Engineering, Pune.
          </p>

          <div
            ref={ctasRef}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <Button asChild size="lg">
              <a
                href="#publications"
                className="btn-cta"
              >
                View Publications
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={CV_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="transform transition-all duration-200 hover:scale-105"
              >
                Download CV
              </a>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <motion.div
          custom={5}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          className="w-full md:w-2/5 flex justify-center md:justify-end"
        >
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
        </motion.div>
      </Container>
    </section>
  );
};
