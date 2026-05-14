import React, { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/Hero";

// Lazy-load below-the-fold sections for faster initial paint
const AboutSection = React.lazy(() => import("@/components/sections/About").then(m => ({ default: m.AboutSection })));
const EducationSection = React.lazy(() => import("@/components/sections/Education").then(m => ({ default: m.EducationSection })));
const ResearchSection = React.lazy(() => import("@/components/sections/Research").then(m => ({ default: m.ResearchSection })));
const PublicationsSection = React.lazy(() => import("@/components/sections/Publications").then(m => ({ default: m.PublicationsSection })));
const ProjectsSection = React.lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.ProjectsSection })));
const ContactSection = React.lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.ContactSection })));

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <EducationSection />
          <ResearchSection />
          <PublicationsSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
