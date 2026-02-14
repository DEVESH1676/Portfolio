import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "site-theme";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored === "dark";
        return (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      }
      return false;
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        localStorage.setItem(THEME_KEY, "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem(THEME_KEY, "light");
      }
    } catch { }
  }, [isDark]);

  return (
    <div
      onClick={() => setIsDark(!isDark)}
      className="relative bg-muted/20 border border-primary/10 rounded-full h-9 w-[72px] cursor-pointer transition-colors hover:border-primary/30 hover:bg-muted/30"
      role="button"
      aria-label="Toggle theme"
    >
      {/* Sliding Pill Background */}
      <div
        className="absolute top-1 left-1 w-7 h-7 bg-background shadow-sm border border-border/50 rounded-full transition-all duration-500 ease-spring"
        style={{ transform: isDark ? "translateX(36px)" : "translateX(0px)" }}
      />

      {/* Sun Icon (Light Mode Position) */}
      <div className={cn("absolute top-1 left-1 z-10 h-7 w-7 flex items-center justify-center rounded-full transition-colors duration-300", !isDark ? "text-amber-500" : "text-muted-foreground/40")}>
        <Sun className="h-4 w-4" />
      </div>

      {/* Moon Icon (Dark Mode Position) */}
      <div className={cn("absolute top-1 right-1 z-10 h-7 w-7 flex items-center justify-center rounded-full transition-colors duration-300", isDark ? "text-blue-500" : "text-muted-foreground/40")}>
        <Moon className="h-4 w-4" />
      </div>

      <span className="sr-only">Toggle theme</span>
    </div>
  );
};

export default ThemeToggle;
