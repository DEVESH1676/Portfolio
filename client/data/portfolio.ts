export const DOWNLOAD_CV_URL = "#";

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const QUICK_FACTS = [
  {
    title: "Education",
    items: [
      "B.E. IT — SKNCOE (Expected 2027)",
      "Higher Secondary (HSC) — MP International",
      "Secondary Education (SSC) — Millennium National School",
    ],
  },
  {
    title: "Current Status",
    items: [
      "3rd Year B.E. Information Technology",
      "Sinhgad College of Engineering (SKNCOE)",
    ],
  },
];

export const SKILLS = [
  "typescript",
  "react",
  "node.js",
  "gsap",
  "ui ux",
  "python",
  "sql",
  "bash",
  "zsh",
  "arch linux",
  "wsl",
  "hyprland",
  "devops",
  "sysadmin",
  "docker",
  "docker compose",
  "traefik",
  "cloudflare tunnels",
  "crowdsec",
  "networking",
  "git",
];

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  highlight: string;
  current?: boolean;
}

export const EDUCATION_TIMELINE: EducationEntry[] = [
  {
    degree: "Bachelor of Engineering (B.E.)",
    institution: "SKNCOE (Sinhgad College of Engineering)",
    year: "2024 - Present",
    highlight:
      "currently in 3rd year majoring in information technology (it). coursework heavily focused on software engineering, data structures, and computer networks.",
    current: true,
  },
  {
    degree: "Higher Secondary Education",
    institution: "MP International",
    year: "2022 - 2024",
    highlight: "completed higher secondary education with a core specialization in physics, chemistry, and mathematics (pcm), building a strong analytical foundation for engineering.",
  },
  {
    degree: "Secondary Education",
    institution: "Millennium National School",
    year: "2008 - 2022",
    highlight: "completed secondary education with a strong emphasis on foundational sciences, sparking an early interest in technology and systems architecture.",
  },
];

export const PROJECTS = [
  {
    title: "advanced self-hosted homelab",
    role: "DevOps & Sysadmin",
    description:
      "highly automated, secure infrastructure hosting 30+ microservices. built entirely on docker compose with traefik. features scale-to-zero optimization, zero-trust remote access via cloudflare tunnels, and real-time threat defense with crowdsec ips.",
  },

  {
    title: "dynamic hyprland desktop environment",
    role: "Linux Systems Architect",
    description:
      "heavily scripted, custom desktop environment built on arch linux and the hyprland compositor. features a real-time dual-color engine using pywal and matugen for system-wide theming. engineered custom ui components including a 60fps audio-visualizing waybar, modal rofi menus, and custom bash automation.",
  },

  {
    title: "interactive personal portfolio",
    role: "Full Stack Developer",
    description:
      "high-performance, full-stack portfolio engineered with react, typescript, and node.js. deployed natively on my self-hosted infrastructure, functioning as a continuous integration sandbox for web deployments and backend experiments.",
  },
];

export const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/devesh1676",
    icon: "github",
  },
  {
    label: "Google Developer",
    href: "https://g.dev/DeveshGhuge",
    icon: "google",
  },
  {
    label: "Email",
    href: "mailto:contact@deveshg.dev",
    icon: "mail",
  },
];

// Provide a placeholder image URL for now
export const HERO_IMAGE_URL = "/images/placeholder.jpg";

export const BIO_DATA = {
  name: "devesh",
  role: "student & developer · systems · web · linux",
  shortBio:
    "hey, i'm devesh — a third-year IT engineering student from pune. i focus heavily on full-stack web architectures and linux systems customization.",
  fullBio: [
    "hey, i'm devesh — a third-year IT engineering student at skncoe, pune.",
    "i operate at the intersection of systems architecture and full-stack web development. my core web stack is typescript, react, and node.js, often paired with gsap for highly fluid, physics-based user interfaces.",
    "my daily workflow is rooted entirely in open source. i use arch linux as my daily driver, where i've heavily customized and scripted my own wayland-based desktop environment (hyprland) using bash and dynamic theming engines.",
    "when i'm not writing frontend code or tweaking my system, i'm architecting my own self-hosted infrastructure. i have a deep passion for devops, networking, and server administration, utilizing tools like docker compose, traefik, and cloudflare tunnels to build secure, zero-trust environments.",
  ],
};

export const CONTENT_INTROS = {
  projects:
    "a showcase of the projects i am currently working on, ranging from full-stack web applications to deep system customizations.",
};
