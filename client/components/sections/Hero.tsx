import { DOWNLOAD_CV_URL, BIO_DATA } from "@/data/portfolio";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { animateEntrance, ANIME } from "@/lib/anime";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { PixelName } from "@/components/ui/PixelName";

export const HeroSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
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
    setDateStr(
      d
        .toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase(),
    );

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
    <section
      ref={sectionRef}
      id="home"
      className="section-base relative flex min-h-[83vh] flex-col justify-center items-center overflow-hidden py-24"
    >
      {/* Date moved to Navbar to guarantee perfect vertical alignment */}

      <div className="hero-glow" />
      <NeuralBackground />

      <div className="relative z-10 w-full px-4 md:px-8 flex flex-col items-center">
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
        <div className="hidden md:flex flex-col items-center justify-center w-full">
          {/* Text Section */}
          <div className="w-full max-w-7xl flex flex-col items-center text-center">
            <div ref={titleRef} className="w-full flex justify-center">
              <PixelName />
            </div>
          </div>
        </div>

        {/* ─── Mobile Text Content (no animation refs — renders immediately) ─── */}
        <div className="md:hidden text-center w-full overflow-hidden">
          <div className="w-full flex justify-center scale-90 transform origin-center my-2">
            <PixelName />
          </div>
        </div>
      </div>
    </section>
  );
};
