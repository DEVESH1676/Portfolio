import * as React from "react";
import { Menu, X, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, DOWNLOAD_CV_URL } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/theme-toggle";

export const Navbar = () => {
  const [activeSection, setActiveSection] = React.useState<string>("#home");
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Active Indicator State
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = React.useRef<{ [key: string]: HTMLAnchorElement | null }>({});

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

  // Intersection Observer
  React.useEffect(() => {
    const sections = observerEntries
      .map((entry) => document.getElementById(entry.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const topMost = visible[0].target.getAttribute("id");
          const matched = observerEntries.find((entry) => entry.id === topMost);
          if (matched) setActiveSection(matched.href);
        }
      },
      { rootMargin: "-50% 0px -45% 0px", threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [observerEntries]);

  // Update Sliding Pill Position
  React.useEffect(() => {
    const activeEl = navRefs.current[activeSection];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeSection]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsSheetOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        // Mobile: Full width top bar
        "inset-x-0 top-0 border-b border-border/40 bg-background/80 backdrop-blur-md md:border-none md:bg-transparent md:backdrop-filter-none",
        // Desktop: Floating Glass Pill Position
        "md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-5xl",
        isScrolled ? "md:top-3" : "md:top-6" // Slight lift on scroll
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Desktop Container Style (The Morphing Object)
          "md:rounded-full md:border",
          isScrolled
            ? "py-2 md:bg-background/70 md:backdrop-blur-2xl md:shadow-2xl md:border-white/10" // Scrolled: Ultra Glass
            : "py-4 md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-transparent" // Top: Floating Air
        )}
      >
        {/* LOGO (Left) */}
        <a
          href="#home"
          className="font-heading text-lg font-bold tracking-tight text-foreground transition-all hover:text-primary md:ml-6 md:mr-8 whitespace-nowrap"
        >
          Dr. C. A. Ghuge
        </a>

        {/* DESKTOP NAV (Center - Sliding Pill) */}
        <nav className="hidden md:flex items-center relative gap-1 p-1">
          {/* Animated Active Pill (The Glide) */}
          <div
            className="absolute h-[calc(100%-8px)] top-1 bg-primary/10 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
          />

          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => (navRefs.current[item.href] = el)}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full",
                activeSection === item.href
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ACTIONS (Right) */}
        <div className="flex items-center gap-2 md:ml-4 lg:ml-8 md:mr-1">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-full text-foreground/70 hover:text-primary px-2 lg:px-4 h-9 hover:bg-primary/5 transition-all">
              <a href="#publications" className="flex items-center gap-2">
                <FileText className="h-4 w-4 opacity-70" />
                <span className="hidden lg:inline">Papers</span>
              </a>
            </Button>

            {/* Holographic CV Button (Compact on MD) */}
            <a
              href={DOWNLOAD_CV_URL}
              target="_blank"
              rel="noreferrer"
              className="relative group p-[1px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 hover:shadow-[0_0_24px_-8px_rgba(var(--primary),0.6)]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:400%_400%] animate-gradient-xy opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center bg-background/95 group-hover:bg-background/90 rounded-full px-4 lg:px-5 py-2 h-9 transition-colors">
                <span className="font-medium flex items-center gap-2 text-sm text-foreground/90 group-hover:text-primary transition-colors">
                  <Download className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  CV
                </span>
              </div>
            </a>
          </div>

          <div className="pl-2 border-l border-border/20 ml-2 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
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
