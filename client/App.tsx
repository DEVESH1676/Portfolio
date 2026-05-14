import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MobileDevNotice from "@/components/ui/mobile-dev-notice";

const queryClient = new QueryClient();

import { ErrorBoundary } from "@/components/ErrorBoundary";

const App = () => {
  // Only show mobile notice on mobile devices
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {/* Mobile development notice */}
          {isMobile && <MobileDevNotice showOnDesktop={false} />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

// Graceful fallback for SSR/SSG environments
if (typeof window !== "undefined") {
  // Check viewport on hydration
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  if (isMobile) {
    // Show notice only on first load
    const stored = localStorage.getItem(MOBILE_NOTICE_KEY);
    if (!stored) {
      const notice = document.createElement("div");
      notice.id = "mobile-dev-notice";
      document.body.appendChild(notice);
      // Notice will be rendered by React on next tick
      setTimeout(() => {
        document.getElementById("mobile-dev-notice")?.querySelector("#root").innerHTML = document.getElementById("root").innerHTML;
      }, 100);
    }
  }
}
