import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/About";
import { ContactSection } from "@/components/sections/Contact";
import { EducationSection } from "@/components/sections/Education";
import { HeroSection } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { PublicationsSection } from "@/components/sections/Publications";
import { ResearchSection } from "@/components/sections/Research";

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ResearchSection />
        <PublicationsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
