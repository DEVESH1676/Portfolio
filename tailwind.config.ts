import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* 🌈 Semantic Colors with CSS Variables + Custom Palette */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* 🎨 Custom Flattened Portfolio Palette for direct Tailwind use */
        "light-background": "#F9FAFB",
        "light-card": "#FFFFFF",
        "light-primary-text": "#111827",
        "light-secondary-text": "#374151",
        "light-headings": "#1F2937",
        "light-timeline-line": "#E5E7EB",
        "light-timeline-dot-default": "#3B82F6",
        "light-timeline-dot-current": "#2563EB",
        "light-timeline-dot-halo": "rgba(59,130,246,0.15)",
        "light-button-default": "#10B981",
        "light-button-hover": "#059669",
        "light-button-text": "#FFFFFF",
        "light-secondary-default": "#3B82F6",
        "light-secondary-hover": "#1D4ED8",
        "light-tag-default": "#10B981",
        "light-tag-hover": "#059669",
        "light-border": "#D1D5DB",
        "light-divider": "#D1D5DB",
        "light-shadow": "rgba(0,0,0,0.05)",

        "dark-background": "#1F2937",
        "dark-card": "#283046",
        "dark-primary-text": "#F3F4F6",
        "dark-secondary-text": "#D1D5DB",
        "dark-headings": "#E5E7EB",
        "dark-timeline-line": "#334155",
        "dark-timeline-dot-default": "#60A5FA",
        "dark-timeline-dot-current": "#3B82F6",
        "dark-timeline-dot-halo": "rgba(96,165,250,0.15)",
        "dark-button-default": "#34D399",
        "dark-button-hover": "#10B981",
        "dark-button-text": "#FFFFFF",
        "dark-secondary-default": "#60A5FA",
        "dark-secondary-hover": "#3B82F6",
        "dark-tag-default": "#34D399",
        "dark-tag-hover": "#10B981",
        "dark-border": "#475569",
        "dark-divider": "#475569",
        "dark-shadow": "rgba(0,0,0,0.25)",
      },

      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        sans: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;