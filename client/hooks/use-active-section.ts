import * as React from "react";
import { NAV_ITEMS } from "@/data/portfolio";

/**
 * Shared hook: tracks which section is currently in view based on scroll position.
 * Used by both Navbar (desktop) and MobileHeader (mobile).
 *
 * Detection uses a 35% viewport offset to determine the "active" section —
 * the section whose top edge has scrolled past 35% from the top of the screen.
 */
export function useActiveSection(): [string, (href: string) => void] {
  const [activeSection, setActiveSection] = React.useState<string>("#home");

  const observerEntries = React.useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        id: item.href.replace("#", ""),
        href: item.href,
      })),
    []
  );

  React.useEffect(() => {
    const handleActiveSection = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.35;

      let current = observerEntries[0]?.href ?? "#home";

      for (const entry of observerEntries) {
        const el = document.getElementById(entry.id);
        if (!el) continue;

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

  return [activeSection, setActiveSection];
}
