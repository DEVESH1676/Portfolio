import { NAV_ITEMS } from "@/data/portfolio";

export const Footer = () => {
  const footerLinks = NAV_ITEMS.filter((item) =>
    [
      "#home",
      "#about",
      "#publications",
      "#projects",
      "#cv",
      "#contact",
    ].includes(item.href),
  );

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-heading text-lg font-semibold">
            Dr. Chandrashekhar A. Ghuge
          </p>
          <p className="max-w-lg text-sm text-background/80">
            Associate Professor &amp; Computer Vision Researcher — advancing
            video object retrieval and intelligent vision systems at P.E.S.’s
            Modern College of Engineering, Pune.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-background/80 transition hover:text-background"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-background/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-background/70 md:flex-row md:items-center md:justify-between">
          <span>© 2025 Dr. C. A. Ghuge — All rights reserved.</span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-6 w-6 rounded-full bg-background/20"
              aria-hidden
            />
            <span>P.E.S.’s Modern College of Engineering</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
