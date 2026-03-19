import {
  DOWNLOAD_CV_URL,
  HERO_IMAGE_URL,
  BIO_DATA,
  RESEARCH_SUMMARY_URL,
} from "@/data/portfolio";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { animateEntrance, ANIME } from "@/lib/anime";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

export const HeroSection = () => {
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const subtitle1Ref = React.useRef<HTMLParagraphElement | null>(null);
  const subtitle2Ref = React.useRef<HTMLParagraphElement | null>(null);
  const descRef = React.useRef<HTMLParagraphElement | null>(null);
  const ctasRef = React.useRef<HTMLDivElement | null>(null);
  const badgeRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Premium Academic Staggered Entrance

    if (badgeRef.current)
      animateEntrance(badgeRef.current, {
        scale: 1, // Start small handled by CSS or generic entrance? Entrance default is 0.8->1 if scale provided.
        // Actually animateEntrance logic: if scale provided, it animates from 0.8 to scale.
        // Let's just use defaults mostly.
        duration: 800,
        delay: 0,
        easing: ANIME.premiumEasing,
      });

    if (titleRef.current)
      animateEntrance(titleRef.current, {
        translateY: 32,
        staggerIndex: 1, // 100ms
        blur: true,
      });

    if (subtitle1Ref.current)
      animateEntrance(subtitle1Ref.current, {
        translateY: 24,
        staggerIndex: 2, // 200ms
        blur: true,
      });

    if (subtitle2Ref.current)
      animateEntrance(subtitle2Ref.current, {
        translateY: 20,
        staggerIndex: 3,
        blur: true,
      });

    if (descRef.current)
      animateEntrance(descRef.current, {
        translateY: 16,
        staggerIndex: 4,
        blur: true,
      });

    if (ctasRef.current)
      animateEntrance(ctasRef.current, {
        translateY: 12,
        staggerIndex: 5,
        blur: false, // Buttons better sharp
      });

    // Image: Intelligent Fade + Subtle Scale
    if (imgRef.current) {
      animateEntrance(imgRef.current, {
        translateY: 40,
        opacity: 1,
        duration: 1200,
        delay: 200,
        scale: 1, // Triggers 0.8 -> 1
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      });
    }
  }, []);

  return (
    <section id="home" className="section-base relative flex min-h-[90vh] flex-col justify-center overflow-hidden section-padding pt-32 lg:pt-40">
      <div className="hero-glow" />
      <NeuralBackground />

      <Container className="flex flex-col-reverse items-center gap-12 md:gap-16 lg:flex-row lg:items-start">
        {/* Text Section */}
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span
            ref={badgeRef}
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 opacity-0"
          >
            Professional Academic Portfolio
          </span>

          <h1
            ref={titleRef}
            className="font-heading font-semibold text-foreground opacity-0"
          >
            {BIO_DATA.name}
          </h1>

          <p
            ref={subtitle1Ref}
            className="mt-4 text-lg font-medium text-primary md:text-xl opacity-0"
          >
            {BIO_DATA.role}
          </p>

          <p
            ref={subtitle2Ref}
            className="mt-6 max-w-2xl text-foreground/80 md:text-lg opacity-0"
          >
            {BIO_DATA.shortBio}
          </p>

          <p
            ref={descRef}
            className="mt-4 max-w-2xl text-foreground/70 hidden"
          >
            {/* Reserved for extra bio logic if needed, currently reusing shortBio logic above */}
          </p>

          <div
            ref={ctasRef}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start opacity-0"
          >
            <Button asChild size="lg" className="h-auto py-4 px-6 md:h-11 md:px-8 text-base">
              <a href="#publications" className="btn-cta">
                View Publications
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 px-6 md:h-11 md:px-8 text-base">
              <a
                href={DOWNLOAD_CV_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-cta"
              >
                Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 px-6 md:h-11 md:px-8 text-base">
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
          className="w-full lg:w-2/5 flex justify-center lg:justify-end opacity-0"
        >
          <div className="relative mx-auto aspect-square w-48 h-48 lg:w-auto lg:h-auto lg:aspect-[3/4] overflow-hidden rounded-full lg:rounded-3xl border border-primary/20 bg-background shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
            <img
              src={HERO_IMAGE_URL}
              alt={`Professional portrait of ${BIO_DATA.name}`}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
