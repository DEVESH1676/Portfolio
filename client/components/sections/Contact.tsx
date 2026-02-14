import { FormEvent, useEffect, useRef } from "react";
import { GraduationCap, Linkedin, Mail, Network } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_LINKS } from "@/data/portfolio";
import { animateEntrance } from "@/lib/anime";

const iconMap = {
  linkedin: Linkedin,
  graduationCap: GraduationCap,
  network: Network,
};

const emailRecipient = "chandrashekar.ghuge@moderncoe.edu.in";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (headingRef.current)
            animateEntrance(headingRef.current, { translateY: 20, delay: 0 });
          if (textRef.current)
            animateEntrance(textRef.current, { translateY: 20, delay: 100 });
          if (iconsRef.current)
            animateEntrance(iconsRef.current, { translateY: 20, delay: 200 });
          if (formRef.current)
            animateEntrance(formRef.current, { translateY: 30, delay: 300 });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const subject = formData.get("subject")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    const mailSubject = subject || "Portfolio Enquiry";
    const bodyLines = [`Name: ${name}`, `Email: ${email}`, "", message];
    const mailto = `mailto:${emailRecipient}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    event.currentTarget.reset();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-base py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2
              ref={headingRef}
              className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl opacity-0"
            >
              Contact
            </h2>
            <p
              ref={textRef}
              className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg opacity-0"
            >
              For collaboration, student supervision, or speaking engagements,
              please contact:{" "}
              <a
                href={`mailto:${emailRecipient}`}
                className="text-primary underline underline-offset-4"
              >
                {emailRecipient}
              </a>
              .
            </p>
            <div
              ref={iconsRef}
              className="mt-8 flex gap-3 opacity-0"
            >
              {CONTACT_LINKS.map((link) => {
                const IconComponent =
                  iconMap[link.icon as keyof typeof iconMap] ?? Mail;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary transition hover:-translate-y-1 hover:border-primary/70 hover:bg-primary/10"
                    aria-label={link.label}
                  >
                    <IconComponent className="h-5 w-5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
          <div
            ref={formRef}
            className="rounded-3xl border border-primary/20 bg-primary/5 p-8 shadow-xl opacity-0"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-foreground/80"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can Dr. Ghuge help?"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-foreground/80"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Share details about your collaboration or enquiry"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
