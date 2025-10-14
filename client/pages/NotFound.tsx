import { useEffect } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-6 pt-24">
        <div className="max-w-lg rounded-3xl border border-primary/20 bg-primary/5 p-12 text-center shadow-xl">
          <h1 className="font-heading text-4xl font-semibold text-primary">
            Page not found
          </h1>
          <p className="mt-4 text-base text-foreground/80">
            The page you are looking for may have moved or is currently being curated. Please return to the homepage to explore Dr. Ghuge’s academic portfolio.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <a href="/">Go to Homepage</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
