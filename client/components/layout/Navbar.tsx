import * as React from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, DOWNLOAD_CV_URL } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useActiveSection();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Scroll Detection
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
  };


  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 ease-spring",
        // Hidden on mobile (MobileHeader handles it)
        "hidden md:block",
        // Desktop: Floating Glass Pill Position (Refined)
        "inset-x-0 top-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-[95%] xl:max-w-7xl",
        isScrolled ? "md:top-3" : "md:top-6"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 lg:px-6 transition-all duration-500 ease-spring",
          // Desktop Container Style (The Morphing Object)
          "md:rounded-full md:border",
          isScrolled
            ? "py-2 md:bg-background/50 md:backdrop-blur-2xl md:backdrop-saturate-150 md:shadow-lg md:border-border/60" // Scrolled (Elite Glass)
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
          Devesh Ghuge
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
            {/* Holographic CV Button (Compact on MD) */}
            {/* <motion.a
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
            </motion.a> */}
          </div>

          <div className="pl-2 border-l border-border/20 ml-2 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile nav is handled by MobileHeader component */}
        </div>
      </div>
    </header>
  );
};
