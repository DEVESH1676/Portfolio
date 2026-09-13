import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { HeroSection } from "@/components/sections/Hero";

// Lazy-load below-the-fold sections for faster initial paint
const AboutSection = React.lazy(() =>
  import("@/components/sections/About").then((m) => ({
    default: m.AboutSection,
  })),
);
const SkillsSection = React.lazy(() =>
  import("@/components/sections/Skills").then((m) => ({
    default: m.SkillsSection,
  })),
);

const ProjectsSection = React.lazy(() =>
  import("@/components/sections/Projects").then((m) => ({
    default: m.ProjectsSection,
  })),
);
const ContactSection = React.lazy(() =>
  import("@/components/sections/Contact").then((m) => ({
    default: m.ContactSection,
  })),
);

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      <MobileHeader />
      <Navbar />
      <main id="main-content" className="flex flex-col">
        <HeroSection />
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center text-primary/50">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        }>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
