import { FormEvent, useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Linkedin,
  Mail,
  Network,
  Loader2,
  Github,
  Code,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_LINKS } from "@/data/portfolio";
import { animateEntrance } from "@/lib/anime";
import { toast } from "@/hooks/use-toast";

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
    <path fill="#fabc05" d="M184.315 67.704c13.469-7.736 26.902-15.535 40.417-23.19c12.828-7.269 27.92-.566 30.829 13.578c1.683 8.182-1.97 17.021-9.357 21.326c-24.218 14.113-48.471 28.17-72.845 42.012c-7.544 4.284-15.315 3.496-22.19-1.754c-6.984-5.33-9.185-12.682-7.547-21.239c1.87-6.514 6.15-10.869 11.987-14.127c9.65-5.386 19.145-11.056 28.706-16.606"/>
    <path fill="#109d58" d="M194.203 62.079c-13.435-7.796-26.904-15.531-40.292-23.406c-12.709-7.476-14.449-23.898-3.655-33.49c6.244-5.547 15.725-6.804 23.147-2.559c24.332 13.917 48.632 27.893 72.806 42.08c7.482 4.391 10.684 11.516 9.577 20.095c-1.125 8.712-6.39 14.294-14.62 17.155c-6.577 1.638-12.488.108-18.228-3.318c-9.49-5.665-19.148-11.053-28.735-16.557"/>
    <path fill="#e94436" d="M71.752 56.563c-8.621 4.898-17.247 9.787-25.86 14.7c-5.037 2.874-10.02 5.846-15.083 8.672c-10.203 5.695-22.325 2.357-28.11-7.674c-5.521-9.572-2.348-21.982 7.478-27.718C34.202 30.52 58.289 16.599 82.463 2.833c7.414-4.221 15.106-3.69 21.962 1.357c7.236 5.327 9.605 12.823 7.98 21.61c-1.008 2.127-1.61 4.62-3.12 6.295c-2.454 2.725-5.244 5.334-8.35 7.25c-9.612 5.927-19.44 11.505-29.183 17.218"/>
    <path fill="#4385f3" d="M61.867 62.057c8.553 5.016 17.1 10.043 25.661 15.045c5.007 2.926 10.072 5.755 15.051 8.726c10.034 5.99 13.205 18.156 7.41 28.181c-5.53 9.568-17.863 13.026-27.744 7.383c-24.157-13.795-48.256-27.693-72.264-41.746C2.618 75.336-.768 68.409.175 59.948c.995-8.931 6.302-14.73 14.725-17.717c2.345-.189 4.805-.915 7.011-.445c3.587.764 7.242 1.875 10.454 3.607c9.939 5.36 19.683 11.082 29.502 16.664"/>
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
// IMPORTANT: Get a free key from https://web3forms.com for contact@deveshg.dev and paste it below
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      subject: formData.get("subject")?.toString().trim() ?? "",
      message: formData.get("message")?.toString().trim() ?? "",
    };

    try {
      // 1. Attempt to send email silently via Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: payload.name,
          email: payload.email,
          subject: payload.subject || "Portfolio Enquiry",
          message: payload.message,
          from_name: "Devesh's Portfolio",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message Sent Successfully!",
          description:
            "Thank you for reaching out. Devesh will get back to you soon.",
        });
        (event.target as HTMLFormElement).reset();
        setIsSubmitting(false);
        return; // Exit early if successful
      } else {
        throw new Error(result.message || "Failed to send via Web3Forms");
      }
    } catch (error) {
      console.warn("API submission failed, falling back to mailto", error);

      // 2. Fallback to mailto link if API fails or key is missing
      const mailSubject = payload.subject || "Portfolio Enquiry";
      const bodyLines = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        payload.message,
      ];
      const mailto = `mailto:${emailRecipient}?subject=${encodeURIComponent(
        mailSubject,
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      setTimeout(() => {
        window.location.href = mailto;
        toast({
          title: "Opening Email Client",
          description:
            "We couldn't send the message silently. Opening your default email app instead.",
        });
        setIsSubmitting(false);
        (event.target as HTMLFormElement).reset();
      }, 500);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-alt section-padding scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2
              ref={headingRef}
              className="font-mono uppercase text-3xl font-bold tracking-tight text-foreground md:text-4xl opacity-0"
            >
              Contact
            </h2>
            <p
              ref={textRef}
              className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg opacity-0"
            >
              For collaboration,
              please contact:{" "}
              <a
                href={`mailto:${emailRecipient}`}
                className="text-primary underline underline-offset-4"
              >
                {emailRecipient}
              </a>
              .
            </p>
            <div ref={iconsRef} className="mt-8 flex gap-3 opacity-0">
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
                  placeholder="How can Devesh help?"
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
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
