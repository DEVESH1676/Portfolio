import * as React from "react";
import { Menu, X, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, DOWNLOAD_CV_URL } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [activeSection, setActiveSection] = React.useState<string>("#home");
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);



  const observerEntries = React.useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        id: item.href.replace("#", ""),
        href: item.href,
      })),
    []
  );

  // Scroll Detection
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-based active section detection (handles tall sections)
  React.useEffect(() => {
    const handleActiveSection = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.35; // Detection point at 35% from top

      let current = observerEntries[0]?.href ?? "#home";

      for (const entry of observerEntries) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        
        // Use getBoundingClientRect for more reliable top calculation relative to viewport
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        
        if (top - offset <= scrollY) {
          current = entry.href;
        }
      }

      setActiveSection(current);
    };

    handleActiveSection(); // Run once on mount
    window.addEventListener("scroll", handleActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, [observerEntries]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsSheetOpen(false);
  };


  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 ease-spring",
        // Mobile: Full width top bar
        "inset-x-0 top-0 border-b border-white/10 dark:border-white/5 bg-background/50 backdrop-blur-2xl backdrop-saturate-150 md:border-none md:bg-transparent md:backdrop-filter-none",
        // Desktop: Floating Glass Pill Position (Refined)
        "md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-[95%] xl:max-w-7xl",
        isScrolled ? "md:top-3" : "md:top-6"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 lg:px-6 transition-all duration-500 ease-spring",
          // Desktop Container Style (The Morphing Object)
          "md:rounded-full md:border",
          isScrolled
            ? "py-2 md:bg-background/50 md:backdrop-blur-2xl md:backdrop-saturate-150 md:shadow-lg md:border-white/10 dark:md:border-white/5" // Scrolled (Elite Glass)
            : "py-3 md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-transparent" // Top
        )}
      >
        {/* LOGO (Left - Animated) */}
        <motion.a
          href="#home"
          initial={{ letterSpacing: "-0.02em" }}
          whileHover={{
            letterSpacing: "0.02em",
            textShadow: "0 0 20px rgba(var(--primary), 0.5)"
          }}
          transition={{ duration: 0.3 }}
          className="font-heading text-lg font-bold tracking-tight text-foreground md:ml-4 md:mr-6 whitespace-nowrap cursor-pointer"
        >
          Dr. C. A. Ghuge
        </motion.a>

        {/* DESKTOP NAV (Center - Framer Motion Pill) */}
        <nav className="hidden md:flex items-center gap-1 p-1">


          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "relative group px-3 lg:px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full cursor-pointer",
                activeSection === item.href
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {activeSection === item.href && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10 shadow-[0_0_10px_rgba(var(--primary),0.2)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {/* Text Expansion Effect */}
              <motion.span
                initial={{ letterSpacing: "0em" }}
                animate={{ letterSpacing: activeSection === item.href ? "0.15em" : "0em" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-block whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </a>
          ))}
        </nav>

        {/* ACTIONS (Right) */}
        <div className="flex items-center gap-2 md:ml-4 lg:ml-6 md:mr-1">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-full text-foreground/70 hover:text-primary px-2 text-xs lg:text-sm h-9 hover:bg-primary/5 transition-all">
              <a href="#publications" className="flex items-center gap-2">
                <FileText className="h-4 w-4 opacity-70" />
                <span className="hidden xl:inline">Papers</span>
              </a>
            </Button>

            {/* Holographic CV Button (Compact on MD) */}
            <motion.a
              href={DOWNLOAD_CV_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group p-[1px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-[0_0_24px_-8px_rgba(var(--primary),0.6)] cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:400%_400%] animate-gradient-xy opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center bg-background/95 group-hover:bg-background/90 rounded-full px-3 lg:px-5 py-2 h-9 transition-colors">
                <span className="font-medium flex items-center gap-2 text-sm text-foreground/90 group-hover:text-primary transition-colors">
                  <Download className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  CV
                </span>
              </div>
            </motion.a>
          </div>

          <div className="pl-2 border-l border-border/20 ml-2 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Toggle & Menu */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background/50 text-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  {isSheetOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle navigation</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l border-border bg-background/95 backdrop-blur-xl">
                {/* ... Mobile Menu Content ... */}
                <div className="mt-12 flex flex-col gap-6">
                  <div className="flex flex-col space-y-2">
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "px-4 py-3 text-lg font-medium transition-colors rounded-lg",
                          activeSection === item.href
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-foreground/80 hover:bg-muted"
                        )}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                  <div className="h-px bg-border/50 my-2" />
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" size="lg" className="w-full justify-start">
                      <a href="#publications" onClick={() => setIsSheetOpen(false)}>
                        <FileText className="h-4 w-4 mr-3" />
                        View Publications
                      </a>
                    </Button>
                    <Button asChild size="lg" className="w-full justify-start bg-primary text-primary-foreground">
                      <a href={DOWNLOAD_CV_URL} target="_blank" rel="noreferrer" onClick={() => setIsSheetOpen(false)}>
                        <Download className="h-4 w-4 mr-3" />
                        Download CV
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
