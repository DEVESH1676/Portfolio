import * as React from "react";
import { animateEntrance } from "@/lib/anime";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { PixelName } from "@/components/ui/PixelName";

export const HeroSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const titleRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Premium Academic Staggered Entrance
    if (titleRef.current)
      animateEntrance(titleRef.current, {
        translateY: 32,
        staggerIndex: 1, // 100ms
        blur: true,
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-base relative flex min-h-[90vh] flex-col justify-center items-center overflow-hidden py-24"
    >
      <h1 className="sr-only">Devesh Ghuge — Portfolio</h1>
      {/* Date moved to Navbar to guarantee perfect vertical alignment */}

      <div className="hero-glow" />
      <NeuralBackground />

      <div className="relative z-10 w-full px-4 md:px-8 flex flex-col items-center">
        {/* ─── Mobile Hero Action Row ─── */}
        <div className="flex md:hidden items-center justify-center gap-4 mb-6">
          {/* Action Buttons — Stacked */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
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
