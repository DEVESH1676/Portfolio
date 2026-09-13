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
  const isManualRef = React.useRef(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const observerEntries = React.useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        id: item.href.replace("#", ""),
        href: item.href,
      })),
    [],
  );

  const setSectionManual = React.useCallback((href: string) => {
    setActiveSection(href);
    isManualRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isManualRef.current = false;
    }, 1000);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
            break;
          }
        }
      },
      { rootMargin: "-35% 0px -65% 0px" }
    );

    observerEntries.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [observerEntries]);

  return [activeSection, setSectionManual];
}
