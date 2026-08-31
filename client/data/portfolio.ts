export const DOWNLOAD_CV_URL = "#";

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
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
  "typescript", "react", "node.js",
  "gsap", "ui animations",
  "python", "sql", "bash", "zsh",
  "arch linux", "wsl", "hyprland",
  "server hosting", "aws", "cloudflare",
  "git", "neovim", "gnu toolchain"
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
    degree: "B.E. Information Technology",
    institution: "SKNCOE (Sinhgad College of Engineering)",
    year: "2024 - Present",
    highlight: "Currently in 3rd Year. Pursuing degree in Information Technology.",
    current: true,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "MP International",
    year: "Completed",
    highlight: "Focused on foundational sciences and mathematics.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Millennium National School",
    year: "Completed",
    highlight: "Primary and Secondary Education.",
  },
];

export const PROJECTS = [
  {
    title: "hyprland dotfiles",
    role: "System Customization",
    description:
      "highly customized arch linux wayland setup. features dual color engines (pywal & matugen), a live 60fps audio visualizer (cava) with gpu glsl shaders, and a fully riced notification center.",
  },
  {
    title: "mechanical movements",
    role: "Front-end Developer",
    description:
      "interactive, scroll-driven presentation of classical mechanical movements. built from scratch with react, gsap, and animated svgs.",
  },
  {
    title: "deveshg.dev",
    role: "Full Stack Developer",
    description:
      "full-stack portfolio and personal server environment. built with react and node.js. functions as a live sandbox for web deployments and server-side experiments.",
  }
];

export const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/devesh1676",
    icon: "github",
  },
  {
    label: "Email",
    href: "mailto:dcghuge167@gmail.com",
    icon: "mail",
  }
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
    "i spend most of my time building interactive web applications and working with systems customization. my core stack is typescript, react, and node.js, often paired with gsap and svgs for physics-based ui animations.",
    "my daily workflow lives entirely in open source — arch linux, hyprland, waybar, and the gnu/linux toolchain. when i'm not writing code, i'm usually ricing a linux box, writing custom glsl shaders, or experimenting with server hosting."
  ],
};

export const CONTENT_INTROS = {
  projects:
    "a showcase of the projects i am currently working on, ranging from full-stack web applications to deep system customizations.",
};
