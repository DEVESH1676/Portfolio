import * as React from "react";
import { X, Smartphone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOBILE_NOTICE_KEY = "mobile-dev-notice-dismissed";

interface MobileDevNoticeProps {
  className?: string;
  onDismiss?: () => void;
  showOnDesktop?: boolean;
}

const MobileDevNotice: React.FC<MobileDevNoticeProps> = ({
  className,
  onDismiss,
  showOnDesktop = true,
}) => {
  // Check if we should show on initial render
  const shouldShow = React.useMemo(() => {
    if (typeof window === "undefined") return false;

    try {
      const stored = localStorage.getItem(MOBILE_NOTICE_KEY);
      if (stored) return false;

      // Only show on mobile devices
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;

      if (isMobile) {
        // Store that we've shown it
        localStorage.setItem(MOBILE_NOTICE_KEY, "true");
        return true;
      }
    } catch {
      // Ignore errors
    }
    return false;
  }, []);

  const [isVisible, setIsVisible] = React.useState(shouldShow);

  const dismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(MOBILE_NOTICE_KEY, "true");
      onDismiss?.();
    } catch {
      // Ignore
    }
  };

  // Always render content, but conditionally show
  if (!isVisible) {
    return null;
  }

  // SSR/SSG: Create container if it doesn't exist
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const existing = document.getElementById("mobile-dev-notice");
      if (!existing) {
        const container = document.createElement("div");
        container.id = "mobile-dev-notice";
        document.body.appendChild(container);
        // React will hydrate into this container
        setTimeout(() => {
          const root = document.getElementById("mobile-dev-notice");
          if (root) {
            // React will handle hydration automatically
            // No manual DOM manipulation needed
          }
        }, 0);
      }
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed z-[100] top-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-b border-primary/10",
        "transition-opacity duration-500 ease-spring",
        className
      )}
      role="alertdialog"
      aria-labelledby="mobile-dev-title"
      aria-describedby="mobile-dev-description"
    >
      <div className="max-w-4xl mx-auto flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <div
            className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
            style={{ boxShadow: "0 2px 8px rgba(var(--primary), 0.15)" }}
          >
            <Smartphone
              className="h-5 w-5 text-primary"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-2 mb-1"
            id="mobile-dev-title"
          >
            <AlertCircle className="h-4 w-4 text-primary/70" />
            <h3 className="text-sm font-semibold text-foreground">
              Mobile Experience Coming Soon
            </h3>
          </div>

          <p className="text-xs text-foreground/70 leading-relaxed mb-3">
            We're currently refining the mobile experience for our portfolio site. The desktop version is fully optimized, while the mobile interface is still under development. We'll be rolling out a polished mobile experience soon!
          </p>

          <div className="flex flex-wrap gap-2">
            {/* Primary action - dismiss */}
            <Button
              variant="ghost"
              size="sm"
              onClick={dismiss}
              className="text-xs h-8 px-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <X className="h-3 w-3" />
                <span>Dismiss</span>
              </span>
            </Button>

            {/* Secondary info */}
            <span
              className="text-xs text-foreground/50 flex items-center gap-1.5"
              id="mobile-dev-description"
            >
              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary/40" />
              <span>Optimized for desktop browsers</span>
            </span>
          </div>
        </div>

        {/* Dismiss button (desktop convenience) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={dismiss}
          className="h-8 w-8 flex-shrink-0 -mt-1 -mr-1"
          aria-label="Dismiss notice"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileDevNotice;
