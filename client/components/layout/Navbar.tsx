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
  const [dateStr, setDateStr] = React.useState("");
  const [timeStr, setTimeStr] = React.useState("");

  // Scroll & Time Detection
  React.useEffect(() => {
    const updateTime = () => {
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
      setTimeStr(
        d.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
  };

  return (
    <header
      className={cn(
        "fixed z-50 inset-x-0 pointer-events-none transition-all duration-500 ease-spring hidden md:flex items-center justify-center",
        isScrolled ? "top-3" : "top-6",
      )}
    >
      {/* Far Left Date */}
      {dateStr && (
        <div
          className={cn(
            "absolute left-6 lg:left-10 pointer-events-auto transition-opacity duration-500 hidden md:block",
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          <span className="text-xs font-mono text-muted-foreground/50 tracking-[0.2em]">
            {dateStr}
          </span>
        </div>
      )}

      {/* Far Right Time */}
      {timeStr && (
        <div
          className={cn(
            "absolute right-6 lg:right-10 pointer-events-auto transition-opacity duration-500 hidden md:block",
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          <span className="text-xs font-mono text-muted-foreground/50 tracking-[0.2em]">
            {timeStr}
          </span>
        </div>
      )}

      {/* Floating Navbar Pill */}
      <div
        className={cn(
          "pointer-events-auto flex items-center px-4 lg:px-6 transition-all duration-500 ease-spring rounded-full border w-auto max-w-[95%] xl:max-w-7xl",
          isScrolled
            ? "py-2 bg-background/50 backdrop-blur-2xl backdrop-saturate-150 shadow-lg border-border/60" // Scrolled (Elite Glass)
            : "py-3 bg-transparent backdrop-blur-none shadow-none border-transparent", // Top
        )}
      >
        {/* LOGO (Left - Animated) */}
        <div className="flex-1 flex justify-start items-center">
          <motion.a
            href="#home"
            initial={{ letterSpacing: "-0.02em" }}
            whileHover={{
              letterSpacing: "0.05em",
              textShadow: "0 0 20px rgba(var(--primary), 0.5)",
            }}
            transition={{ duration: 0.3 }}
            className="font-mono uppercase text-lg font-bold tracking-widest text-foreground md:ml-4 md:mr-6 whitespace-nowrap cursor-pointer"
          >
            Devesh Ghuge
          </motion.a>
        </div>

        {/* DESKTOP NAV (Center - Framer Motion Pill) */}
        <div className="flex-none flex justify-center">
          <nav className="hidden md:flex items-center gap-1 p-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative group px-3 lg:px-5 py-2 text-xs font-mono uppercase transition-colors duration-300 rounded-full cursor-pointer",
                  activeSection === item.href
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:text-foreground font-medium",
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
                  initial={{ letterSpacing: "0.1em" }}
                  animate={{
                    letterSpacing:
                      activeSection === item.href ? "0.25em" : "0.1em",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              </a>
            ))}
          </nav>
        </div>

        {/* ACTIONS (Right) */}
        <div className="flex-1 flex justify-end items-center md:ml-4 lg:ml-6 md:mr-1">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile nav is handled by MobileHeader component */}
        </div>
      </div>
    </header>
  );
};
