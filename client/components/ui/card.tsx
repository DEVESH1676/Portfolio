import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const localRef = React.useRef<HTMLDivElement | null>(null);

  // support forwarded refs
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  React.useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    let observer: IntersectionObserver | null = null;
    // animate entrance on scroll into view
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("@/lib/anime").then((mod) => {
              mod.animateEntrance(el as HTMLElement, { translateY: 14, duration: 600 });
            });
            observer?.disconnect();
          }
        });
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer?.disconnect();
  }, []);

  const handleMouseEnter = () => {
    const el = localRef.current;
    if (!el) return;
    import("animejs").then((mod) => {
      const a = (mod as any).default ?? mod;
      a({ targets: el, scale: 1.02, boxShadow: ["0 4px 6px rgba(0,0,0,0.06)", "0 12px 30px rgba(0,0,0,0.12)"], duration: 220, easing: "easeOutQuad" });
    });
  };

  const handleMouseLeave = () => {
    const el = localRef.current;
    if (!el) return;
    import("animejs").then((mod) => {
      const a = (mod as any).default ?? mod;
      a({ targets: el, scale: 1, boxShadow: ["0 12px 30px rgba(0,0,0,0.12)", "0 4px 6px rgba(0,0,0,0.06)"], duration: 220, easing: "easeOutQuad" });
    });
  };

  return (
    <div
      ref={localRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
