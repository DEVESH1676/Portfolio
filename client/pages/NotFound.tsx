import { useEffect } from "react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [location] = useLocation();

  useEffect(() => {
    console.warn(
      "404 Warning: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="max-w-lg rounded-3xl border border-primary/20 bg-primary/5 p-12 text-center shadow-xl">
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Page not found
        </h1>
        <p className="mt-4 text-base text-foreground/80">
          The page you are looking for may have moved or is currently being
          curated. Please return to the homepage to explore Devesh's academic
          portfolio.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
