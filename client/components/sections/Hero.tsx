import {
  DOWNLOAD_CV_URL,
  HERO_IMAGE_URL,
  BIO_DATA,
  RESEARCH_SUMMARY_URL,
} from "@/data/portfolio";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { animateEntrance } from "@/lib/anime"; // removing fadeInUp import

export const HeroSection = () => {
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const subtitle1Ref = React.useRef<HTMLParagraphElement | null>(null);
  const subtitle2Ref = React.useRef<HTMLParagraphElement | null>(null);
  const descRef = React.useRef<HTMLParagraphElement | null>(null);
  const ctasRef = React.useRef<HTMLDivElement | null>(null);
  const badgeRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLDivElement | null>(null); // New ref for image

  React.useEffect(() => {
    // animate hero entrance with anime.js staggered sequence
    // Note: dynamic import removed since we are using native WAAPI directly
    // based on previous refactor of anime.ts which exports directly

    if (titleRef.current)
      animateEntrance(titleRef.current, {
        translateY: 24,
        duration: 700,
        delay: 80,
      });
    if (subtitle1Ref.current)
      animateEntrance(subtitle1Ref.current, {
        translateY: 18,
        duration: 600,
        delay: 180,
      });
    if (subtitle2Ref.current)
      animateEntrance(subtitle2Ref.current, {
        translateY: 12,
        duration: 600,
        delay: 280,
      });
    if (descRef.current)
      animateEntrance(descRef.current, {
        translateY: 8,
        duration: 600,
        delay: 360,
      });
    if (ctasRef.current)
      animateEntrance(ctasRef.current, {
        translateY: 4,
        duration: 600,
        delay: 440,
      });
    if (badgeRef.current)
      animateEntrance(badgeRef.current, {
        scale: 1.2,
        opacity: 1,
        duration: 500,
        delay: 520,
      });

    // Image animation (formerly framer-motion)
    if (imgRef.current) {
      animateEntrance(imgRef.current, {
        translateY: 24,
        opacity: 1, // Explicitly animate to opacity 1
        duration: 800, // slightly longer for image
        delay: 600, // delay to match previous custom={5} roughly (5 * 0.1s + base?)
        // Previous was custom={5}. fadeInUp delay is i * 0.12. So 0.6s.
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-secondary/40 pb-12 pt-24 md:pb-24 md:pt-36 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-background" />

      <Container className="flex flex-col-reverse items-center gap-12 md:gap-16 lg:flex-row lg:items-start">
        {/* Text Section */}
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span
            ref={badgeRef}
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            Professional Academic Portfolio
          </span>

          <h1
            ref={titleRef}
            className="font-heading font-semibold text-foreground"
          >
            {BIO_DATA.name}
          </h1>

          <p
            ref={subtitle1Ref}
            className="mt-4 text-lg font-medium text-primary md:text-xl"
          >
            {BIO_DATA.role}
          </p>

          <p
            ref={subtitle2Ref} // New reference for the second subtitle
            className="mt-6 max-w-2xl text-foreground/80 md:text-lg"
          >
            {BIO_DATA.shortBio}
          </p>

          <div
            ref={ctasRef}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start"
          >
            <Button asChild size="lg" className="min-h-[48px] px-6">
              <a href="#publications" className="btn-cta">
                View Publications
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-[48px] px-6">
              <a
                href={DOWNLOAD_CV_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-cta"
              >
                Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-[48px] px-6">
              <a
                href={RESEARCH_SUMMARY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-cta"
              >
                Research Summary
              </a>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imgRef}
          className="w-full max-w-sm lg:w-2/5 flex justify-center lg:justify-end opacity-0" // Start hidden for animation
        >
          <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-3xl border border-primary/20 bg-background shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
            <img
              src={HERO_IMAGE_URL}
              alt={`Professional portrait of ${BIO_DATA.name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent px-6 py-4 text-sm font-medium text-background">
              Dedicated to advancing intelligent vision systems
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
