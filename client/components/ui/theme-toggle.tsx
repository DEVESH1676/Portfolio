import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";

const THEME_KEY = "site-theme";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
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
    <Button
      onClick={() => setIsDark((v) => !v)}
      size="sm"
      variant="ghost"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
