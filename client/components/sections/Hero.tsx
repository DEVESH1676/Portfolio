import {
  DOWNLOAD_CV_URL,
  BIO_DATA,
} from "@/data/portfolio";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { animateEntrance, ANIME } from "@/lib/anime";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { PixelName } from "@/components/ui/PixelName";

export const HeroSection = () => {
  const titleRef = React.useRef<HTMLDivElement | null>(null);
  const subtitle1Ref = React.useRef<HTMLParagraphElement | null>(null);
  const subtitle2Ref = React.useRef<HTMLParagraphElement | null>(null);

  const ctasRef = React.useRef<HTMLDivElement | null>(null);
  const badgeRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLDivElement | null>(null);

  // Mobile refs (separate to avoid conflict with desktop)
  const mobileImgRef = React.useRef<HTMLDivElement | null>(null);

  const [dateStr, setDateStr] = React.useState("");

  React.useEffect(() => {
    // Date Init
    const d = new Date();
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase());

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



    if (ctasRef.current)
      animateEntrance(ctasRef.current, {
        translateY: 12,
        staggerIndex: 5,
        blur: false, // Buttons better sharp
      });

    // Desktop image: Intelligent Fade + Subtle Scale
    if (imgRef.current) {
      animateEntrance(imgRef.current, {
        translateY: 40,
        opacity: 1,
        duration: 1200,
        delay: 200,
        scale: 1,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      });
    }

    // Mobile image entrance
    if (mobileImgRef.current) {
      animateEntrance(mobileImgRef.current, {
        translateY: 20,
        opacity: 1,
        duration: 800,
        delay: 100,
        scale: 1,
        easing: ANIME.premiumEasing,
      });
    }
  }, []);

  return (
    <section id="home" className="section-base relative flex min-h-[92vh] flex-col justify-center items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
      {/* Date moved to Navbar to guarantee perfect vertical alignment */}

      <div className="hero-glow" />
      <NeuralBackground />

      <Container className="relative z-10">
        {/* ─── Mobile Hero Action Row ─── */}
        <div className="flex md:hidden items-center justify-center gap-4 mb-6">

          {/* Action Buttons — Stacked */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* <motion.a
              href={DOWNLOAD_CV_URL}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                bg-background/70 backdrop-blur-md border border-border text-foreground/90
                shadow-sm active:shadow-none transition-all"
            >
              <Download className="h-3.5 w-3.5 text-primary" />
              Download CV
            </motion.a> */}
          </div>
        </div>

        {/* ─── Desktop Layout ─── */}
        <div className="hidden md:flex flex-col items-center justify-center">
          {/* Text Section */}
          <div className="w-full max-w-3xl flex flex-col items-center text-center">
            <span
              ref={badgeRef}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-10 opacity-0"
            >
              Portfolio
            </span>

            <div ref={titleRef} className="w-full flex justify-center">
              <PixelName />
            </div>

            <p
              ref={subtitle1Ref}
              className="mt-2 text-lg font-medium text-primary md:text-xl opacity-0"
            >
              {BIO_DATA.role}
            </p>

            <p
              ref={subtitle2Ref}
              className="mt-4 max-w-2xl text-foreground/80 md:text-lg opacity-0 leading-relaxed"
            >
              {BIO_DATA.shortBio}
            </p>

            <div
              ref={ctasRef}
              className="mt-10 flex flex-wrap items-center gap-4 justify-center opacity-0"
            >
              <Button asChild size="lg" className="h-auto py-3 px-6 md:h-11 md:px-8 text-base">
                <a href="#projects" className="btn-cta">
                  View Projects
                </a>
              </Button>
              {/* <Button asChild variant="outline" size="lg" className="h-auto py-3 px-6 md:h-11 md:px-8 text-base">
                <a
                  href={DOWNLOAD_CV_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-cta"
                >
                  Download CV
                </a>
              </Button> */}
            </div>
          </div>
        </div>

        {/* ─── Mobile Text Content (no animation refs — renders immediately) ─── */}
        <div className="md:hidden text-center w-full overflow-hidden">
          <span
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
          >
            Portfolio
          </span>

          <div className="w-full flex justify-center scale-90 transform origin-center my-2">
            <PixelName />
          </div>

          <p className="mt-2 text-base font-medium text-primary">
            {BIO_DATA.role}
          </p>

          <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
            {BIO_DATA.shortBio}
          </p>
        </div>
      </Container>
    </section>
  );
};
