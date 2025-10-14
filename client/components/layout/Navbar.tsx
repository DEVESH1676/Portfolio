import * as React from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/data/portfolio";

export const Navbar = () => {
  const [activeSection, setActiveSection] = React.useState<string>("#home");
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const observerEntries = React.useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        id: item.href.replace("#", ""),
        href: item.href,
      })),
    [],
  );

  React.useEffect(() => {
    const sections = observerEntries
      .map((entry) => document.getElementById(entry.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const topMost = visible[0].target.getAttribute("id");
          const matched = observerEntries.find((entry) => entry.id === topMost);
          if (matched) {
            setActiveSection(matched.href);
          }
        }
      },
      {
        rootMargin: "-50% 0px -45% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [observerEntries]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsSheetOpen(false);
  };

  const NavLinks = ({
    orientation = "horizontal",
  }: {
    orientation?: "horizontal" | "vertical";
  }) => (
    <div
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-8"
          : "flex flex-col space-y-4",
      )}
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => handleNavClick(item.href)}
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            orientation === "horizontal"
              ? "text-foreground/80 hover:text-foreground"
              : "text-base text-foreground",
            activeSection === item.href &&
              "text-primary font-semibold",
          )}
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-heading text-lg font-semibold tracking-tight text-primary"
        >
          Dr. C. A. Ghuge
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <a href="#publications">View Publications</a>
          </Button>
          <Button asChild size="sm">
            <a href="#cv">Download CV</a>
          </Button>

          <div className="flex lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 text-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  {isSheetOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
                  <span className="sr-only">Toggle navigation</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l border-border bg-background/95 backdrop-blur">
                <div className="mt-12 flex flex-col gap-8">
                  <NavLinks orientation="vertical" />
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" size="lg">
                      <a href="#publications" onClick={() => setIsSheetOpen(false)}>
                        View Publications
                      </a>
                    </Button>
                    <Button asChild size="lg">
                      <a href="#cv" onClick={() => setIsSheetOpen(false)}>
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
