export const DOWNLOAD_CV_URL = "#";

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
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
  {
    title: "Interests",
    items: [
      "Software Development",
      "Web Technologies",
      "Server Hosting & Administration",
    ],
  },
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
    title: "Personal Portfolio & Server",
    role: "Full Stack Developer",
    description:
      "Hosted on deveshg.dev. Built using React, Vite, and Node.js. Used for multiple purposes including showcasing projects and server hosting.",
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
  name: "Devesh Ghuge",
  role: "Student & Developer · Information Technology (B.E.)",
  shortBio:
    "I'm Devesh Ghuge, a 3rd-year Information Technology student at SKNCOE. I have a strong interest in software development, building web applications, and server hosting.",
  fullBio: [
    "I began my academic journey at Millennium National School, completing my primary and secondary education. I subsequently pursued my Higher Secondary Certificate (HSC) at MP International, establishing a strong foundation in science and mathematics.",
    "Currently, I am in my third year of the Bachelor of Engineering (B.E.) program in Information Technology at Sinhgad College of Engineering (SKNCOE), having commenced my engineering studies in 2024.",
    "I am deeply passionate about modern web technologies and server administration. I leverage my domain, deveshg.dev, as a live portfolio and a sandbox for deploying full-stack web applications and server-side experiments."
  ],
};

export const CONTENT_INTROS = {
  projects:
    "A showcase of the projects I am currently working on, including web development and server hosting experiments.",
};
