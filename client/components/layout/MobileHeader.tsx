import * as React from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS, DOWNLOAD_CV_URL } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

/**
 * MobileHeader — The "Glassmorphic Sandwich"
 *
 * A two-layer fixed header for mobile screens only (< md / 768px).
 *
 * Layer 1 (Identity):  Name (left) + ThemeToggle (right)
 * Layer 2 (Navigator): Horizontally scrollable pill nav with animated active indicator
 *
 * Renders nothing on md+ screens via `md:hidden`.
 */
export const MobileHeader: React.FC = () => {
  const [activeSection, setActiveSection] = useActiveSection();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const navScrollRef = React.useRef<HTMLDivElement>(null);

  // Track scroll for visual intensity changes
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll the nav bar to keep the active item visible
  React.useEffect(() => {
    if (!navScrollRef.current) return;
    const activeEl = navScrollRef.current.querySelector(
      `[data-section="${activeSection}"]`,
    ) as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 md:hidden">
      {/* ─── Layer 1: Identity Bar ─── */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2.5",
          "bg-background/60 backdrop-blur-2xl backdrop-saturate-150",
          "border-b border-border/40",
          "transition-all duration-500",
          isScrolled && "bg-background/80 shadow-sm",
        )}
      >
        <a
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="font-heading text-[15px] font-bold tracking-tight text-foreground whitespace-nowrap"
        >
          Devesh Ghuge
        </a>

        <div className="flex items-center gap-3">
          {/* Compact CV button */}
          {/* <motion.a
            href={DOWNLOAD_CV_URL}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
              bg-primary/10 text-primary border border-primary/20
              active:bg-primary/20 transition-colors"
          >
            <Download className="h-3 w-3" />
            CV
          </motion.a> */}

          <ThemeToggle />
        </div>
      </div>

      {/* ─── Layer 2: Pill Navigator ─── */}
      <div
        className={cn(
          "relative",
          "bg-background/50 backdrop-blur-xl backdrop-saturate-125",
          "border-b border-border/30",
          "transition-all duration-500",
          isScrolled && "bg-background/70",
        )}
      >
        <div
          ref={navScrollRef}
          className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto scrollbar-hide"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-section={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "relative flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200",
                activeSection === item.href
                  ? "text-primary font-semibold"
                  : "text-foreground/55 active:text-foreground/80",
              )}
            >
              {/* Animated pill indicator */}
              {activeSection === item.href && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                  style={{
                    boxShadow: "0 0 8px hsl(var(--primary) / 0.15)",
                  }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
