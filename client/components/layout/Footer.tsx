import { NAV_ITEMS } from "@/data/portfolio";

export const Footer = () => {
  const footerLinks = NAV_ITEMS.filter((item) =>
    ["#home", "#about", "#publications", "#projects", "#contact"].includes(
      item.href,
    ),
  );

  return (
    <footer className="section-base text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-heading text-lg font-semibold">Devesh Ghuge</p>
          <p className="text-foreground/60 max-w-sm mt-4 leading-relaxed">
            Student at SKNCOE.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-foreground/70 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-foreground/60">
            © 2025 Devesh Ghuge — All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-foreground/60 font-medium">
            <span>Sinhgad College of Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
