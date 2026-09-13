import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import {
  GraduationCap,
  Linkedin,
  Mail,
  Network,
  Github,
  Code,
  ArrowUpRight,
} from "lucide-react";

import { CONTACT_LINKS } from "@/data/portfolio";
import { animateEntrance } from "@/lib/anime";

const GoogleDevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 125"
    width="1.8em"
    height="1em"
    {...props}
    stroke="none"
    fill="none"
  >
    <path fill="currentColor" d="M184.315 67.704c13.469-7.736 26.902-15.535 40.417-23.19c12.828-7.269 27.92-.566 30.829 13.578c1.683 8.182-1.97 17.021-9.357 21.326c-24.218 14.113-48.471 28.17-72.845 42.012c-7.544 4.284-15.315 3.496-22.19-1.754c-6.984-5.33-9.185-12.682-7.547-21.239c1.87-6.514 6.15-10.869 11.987-14.127c9.65-5.386 19.145-11.056 28.706-16.606" />
    <path fill="currentColor" opacity="0.8" d="M194.203 62.079c-13.435-7.796-26.904-15.531-40.292-23.406c-12.709-7.476-14.449-23.898-3.655-33.49c6.244-5.547 15.725-6.804 23.147-2.559c24.332 13.917 48.632 27.893 72.806 42.08c7.482 4.391 10.684 11.516 9.577 20.095c-1.125 8.712-6.39 14.294-14.62 17.155c-6.577 1.638-12.488.108-18.228-3.318c-9.49-5.665-19.148-11.053-28.735-16.557" />
    <path fill="currentColor" opacity="0.9" d="M71.752 56.563c-8.621 4.898-17.247 9.787-25.86 14.7c-5.037 2.874-10.02 5.846-15.083 8.672c-10.203 5.695-22.325 2.357-28.11-7.674c-5.521-9.572-2.348-21.982 7.478-27.718C34.202 30.52 58.289 16.599 82.463 2.833c7.414-4.221 15.106-3.69 21.962 1.357c7.236 5.327 9.605 12.823 7.98 21.61c-1.008 2.127-1.61 4.62-3.12 6.295c-2.454 2.725-5.244 5.334-8.35 7.25c-9.612 5.927-19.44 11.505-29.183 17.218" />
    <path fill="currentColor" opacity="0.7" d="M61.867 62.057c8.553 5.016 17.1 10.043 25.661 15.045c5.007 2.926 10.072 5.755 15.051 8.726c10.034 5.99 13.205 18.156 7.41 28.181c-5.53 9.568-17.863 13.026-27.744 7.383c-24.157-13.795-48.256-27.693-72.264-41.746C2.618 75.336-.768 68.409.175 59.948c.995-8.931 6.302-14.73 14.725-17.717c2.345-.189 4.805-.915 7.011-.445c3.587.764 7.242 1.875 10.454 3.607c9.939 5.36 19.683 11.082 29.502 16.664" />
  </svg>
);

const iconMap = {
  linkedin: Linkedin,
  graduationCap: GraduationCap,
  network: Network,
  github: Github,
  mail: Mail,
  code: Code,
  google: GoogleDevIcon,
};

const emailRecipient = "contact@deveshg.dev";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      if (leftColumnRef.current)
        animateEntrance(leftColumnRef.current, { translateY: 30, delay: 0 });
      if (rightColumnRef.current)
        animateEntrance(rightColumnRef.current, { translateY: 30, delay: 200 });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-alt section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          
          {/* LEFT SIDE: Text and Email */}
          <div ref={leftColumnRef} className="opacity-0">
            <h2 className="font-mono uppercase text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Let's Connect
            </h2>
            <div className="mt-6 h-1 w-20 bg-primary rounded-full"></div>
            <p className="mt-8 text-lg leading-relaxed text-foreground/70">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
              Drop me a line and let's build something extraordinary together.
            </p>
            
            <div className="mt-12">
              <a
                href={`mailto:${emailRecipient}`}
                className="group relative flex w-max items-center gap-4 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5 px-8 py-4 transition-all hover:border-primary hover:shadow-[0_0_30px_rgba(var(--primary),0.2)]"
              >
                {/* Background Sweep */}
                <div className="absolute inset-0 -z-10 translate-y-[100%] bg-primary transition-transform duration-500 ease-out group-hover:translate-y-0" />
                
                <Mail className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                <span className="font-mono text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
                  {emailRecipient}
                </span>
                <ArrowUpRight className="h-5 w-5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Bento Grid */}
          <div ref={rightColumnRef} className="opacity-0 relative">
            {/* Ambient Background Glow for Bento Grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10">
              {CONTACT_LINKS.map((link) => {
                const IconComponent =
                  iconMap[link.icon as keyof typeof iconMap] ?? Mail;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex flex-col items-center justify-center gap-4 rounded-3xl border border-border/50 bg-background/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-card hover:shadow-xl"
                  >
                    <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-primary/60" />
                    </div>
                    
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                      <IconComponent className="h-7 w-7" aria-hidden />
                    </div>
                    
                    <span className="font-mono text-sm font-semibold text-foreground/80 transition-colors group-hover:text-primary">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
