import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "site-theme";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored === "dark";
        // Default to system preference if no preference is stored
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
    } catch {}
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative flex shrink-0 items-center justify-between bg-muted/20 border border-primary/10 rounded-full h-9 w-[96px] p-[3px] cursor-pointer transition-colors hover:border-primary/30 hover:bg-muted/30"
      aria-label="Toggle theme"
    >
      {/* Dynamic Sliding Box (Segmented Control) */}
      <div
        className={cn(
          "absolute top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] bg-background shadow-sm border border-border/50 rounded-full transition-all duration-500 ease-spring",
          isDark ? "left-[50%]" : "left-[3px]",
        )}
      />

      {/* Sun Icon */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-1 items-center justify-center rounded-full transition-colors duration-300",
          !isDark ? "text-amber-500" : "text-muted-foreground/40",
        )}
      >
        <Sun className="h-4 w-4" />
      </div>

      {/* Moon Icon */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-1 items-center justify-center rounded-full transition-colors duration-300",
          isDark ? "text-blue-500" : "text-muted-foreground/40",
        )}
      >
        <Moon className="h-4 w-4" />
      </div>
    </button>
  );
};

export default ThemeToggle;
