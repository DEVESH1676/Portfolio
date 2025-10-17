import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
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
    <Button asChild size="sm" variant="ghost" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <motion.button
        onClick={() => setIsDark((v) => !v)}
        className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted/40 p-1"
        aria-pressed={isDark}
        initial={false}
        animate={{ backgroundColor: isDark ? "rgba(59,130,246,0.18)" : "rgba(0,0,0,0.04)" }}
        transition={{ duration: 0.35 }}
      >
        <motion.span
          className="absolute left-1 top-1 h-6 w-6 rounded-full bg-background shadow-sm flex items-center justify-center"
          layout
          animate={{ x: isDark ? 22 : 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 40 }}
        >
          {isDark ? <Sun className="h-3 w-3 text-yellow-300" /> : <Moon className="h-3 w-3 text-gray-600" />}
        </motion.span>
      </motion.button>
    </Button>
  );
};

export default ThemeToggle;
