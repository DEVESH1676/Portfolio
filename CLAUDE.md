# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Premium academic portfolio website for Dr. C. A. Ghuge (Associate Professor & Head, AI & ML, P.E.S.'s Modern COE, Pune). Built on the Fusion Starter template.

## Tech Stack

- **Package Manager**: PNPM (required, v10+)
- **Frontend**: React 18 + React Router 6 (SPA mode) + TypeScript + Vite 7
- **Backend**: Express 5 integrated with Vite dev server
- **Styling**: TailwindCSS 3 + Radix UI + shadcn/ui components + `cn()` utility (`clsx` + `tailwind-merge`)
- **Animation**: Framer Motion 12 + custom animation utilities (`client/lib/anime.ts`)
- **Icons**: Lucide React
- **Fonts**: Satoshi (headings via Fontshare CDN) + Inter (body via Google Fonts)
- **Testing**: Vitest (`.spec.ts` files)
- **Deployment**: GitHub Pages (via `gh-pages` branch)

## Architecture

```
client/                          # React SPA frontend
├── App.tsx                      # Entry point, routing, providers
├── global.css                   # Tailwind directives, theme tokens (HSL), global styles
├── pages/
│   ├── Index.tsx                # Home page (assembles all sections)
│   └── NotFound.tsx             # 404 page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Floating glass navbar with scroll spy, pill indicator
│   │   └── Footer.tsx           # Site footer
│   ├── sections/                # Page sections (each has its own id for scroll spy)
│   │   ├── Hero.tsx             # #home
│   │   ├── About.tsx            # #about
│   │   ├── Education.tsx        # #education (vertical timeline with animations)
│   │   ├── Research.tsx         # #research
│   │   ├── Publications.tsx     # #publications
│   │   ├── Projects.tsx         # #projects
│   │   └── Contact.tsx          # #contact
│   ├── ui/                      # Radix-based component library (shadcn/ui style)
│   └── ErrorBoundary.tsx        # Global error boundary
├── data/
│   └── portfolio.ts             # All static content (NAV_ITEMS, education, publications, etc.)
├── lib/
│   ├── anime.ts                 # Animation utilities (IntersectionObserver-based entrances)
│   ├── animations.ts            # Additional animation helpers
│   └── utils.ts                 # cn() utility
└── hooks/                       # Custom React hooks

server/                          # Express API backend
├── index.ts                     # Server setup, route registration
├── node-build.ts                # Production server entry
└── routes/
    ├── demo.ts                  # GET /api/demo
    └── analytics.ts             # POST /api/analytics

shared/                          # Types shared between client & server
└── api.ts                       # Shared API interfaces

netlify/functions/               # Netlify serverless functions
```

## Path Aliases

- `@/*` → `client/`
- `@shared/*` → `shared/`

## Development Commands

```bash
pnpm dev           # Start dev server (port 8080, client + server HMR)
pnpm build         # Production build (client + server)
pnpm start         # Start production server
pnpm typecheck     # TypeScript validation
pnpm test          # Run Vitest tests
pnpm format.fix    # Format code with Prettier
```

Run single test with verbose output:
```bash
pnpm test -- --reporter=verbose
```

## Server Routes

- `GET /api/ping` — Simple ping
- `GET /api/demo` — Demo endpoint
- `POST /api/analytics` — Analytics tracking

## Key Patterns

### API Design Principle

Only create API endpoints when strictly necessary — encapsulate logic that must remain on the server (e.g., private keys, sensitive DB operations).

### Adding Routes

**Client page**: Create component in `client/pages/MyPage.tsx`, add route in `client/App.tsx`:
```tsx
<Route path="/my-page" element={<MyPage />} />
```

**Server API**: Create handler in `server/routes/`, register in `server/index.ts`:
```tsx
app.get("/api/endpoint", handleEndpoint);
```

### Shared Types

Define shared interfaces in `shared/api.ts` for type-safe API communication:
```typescript
export interface DemoResponse { message: string; }
// Usage: import { DemoResponse } from '@shared/api';
```

### Styling

Use TailwindCSS 3 utilities with the `cn()` helper for conditional classes:
```tsx
className={cn("base-class", condition && "conditional-class", props.className)}
```

Theme tokens: add custom colors in `client/global.css` (HSL variables) and `tailwind.config.ts`.

## Design System

### Theme

- HSL-based color tokens in `client/global.css` (`:root` for light, `.dark` for dark)
- Key tokens: `--background`, `--foreground`, `--primary`, `--secondary`, `--border`, `--heading`
- Section alternation: `.section-base` and `.section-alt` classes for rhythm
- Typography: `font-heading` (Satoshi) and `font-body` (Inter)

### Navbar Architecture

- **Desktop**: Floating glass pill, centered, with morphing scroll behavior
- **Mobile**: Full-width glass header with slide-out sheet menu
- **Scroll Spy**: Custom scroll-position detector (NOT IntersectionObserver) for reliable tall-section detection
- **Active Indicator**: Framer Motion `layoutId="navbar-pill"` for smooth sliding pill
- **Text Expansion**: Active section label expands letter-spacing to `0.1em`
- **Glass Effect**: `bg-background/50 backdrop-blur-2xl backdrop-saturate-150 border-white/10`

### Animation System

- `client/lib/anime.ts`: `animateEntrance()` and `animateStaggeredChildren()` using IntersectionObserver
- Supports: translateY, opacity, blur, staggered delays
- Education timeline has sequential dot → card → connector animations
- Framer Motion used for Navbar pill, logo hover, CV button

## Key Conventions

1. **Static data lives in `client/data/portfolio.ts`** — all content centralized here
2. **Section IDs must match NAV_ITEMS hrefs** — e.g., `<section id="education">` maps to `{ href: "#education" }`
3. **API routes prefixed with `/api/`** — only create when strictly necessary
4. **Use `cn()` for conditional classes** — never inline ternaries for className strings
5. **TailwindCSS 3 only** — no Tailwind v4. Config in `tailwind.config.ts`
6. **Framer Motion for interactive animations** — layout animations, hover states, spring physics
7. **Custom anime.ts for entrance animations** — scroll-triggered, IntersectionObserver-based

## Dark Mode

- Class-based toggling (`darkMode: ["class"]` in tailwind config)
- Theme toggle component: `client/components/ui/theme-toggle.tsx`
- Deep midnight navy dark palette with carefully tuned contrast ratios

## Deployment

- **Platform**: Netlify (config in `netlify.toml`)
- **Build command**: `npm run build:client`
- **Functions**: `netlify/functions`
- **Publish directory**: `dist/spa`
- **Full build**: `pnpm build` produces `dist/spa/` (client) and `dist/server/` (server)

## Agent Rules

### Environment

- **OS**: Arch Linux (Rolling) via WSL
- **Engine**: Claude Code v2.1+
- **Secondary Brain**: Gemini CLI (`gemini` command) — **PRO SUBSCRIPTION ACTIVE**
- **Hardware**: HP Omen 16 (i7-14th, RTX 5060)

### Terminal

- **Always use WSL** (Arch Linux) for all terminal commands. Prefix commands with `wsl` when running from a Windows shell.
- Never use PowerShell or CMD directly for project commands.

### Documentation Lookup

- **Use Context7 MCP** to fetch up-to-date library documentation before implementing unfamiliar APIs or when uncertain about a library's current syntax.
- Resolve the library ID first via `resolve-library-id`, then query with `query-docs`.
- Prioritize Context7 over guessing or relying on potentially outdated training data for: React, Framer Motion, TailwindCSS, Radix UI, Vite, Express, and any other dependency in `package.json`.

### The Gemini Protocol (ULTRA CRITICAL)

You have access to the `gemini` CLI tool. Use it to offload tasks that exceed your context or require live data.
Refer to `.agents/gemini-analyzer.md` for sub-agent execution patterns.

#### How to Invoke Gemini (Step-by-Step)

> **ALWAYS use interactive (graphical) mode. NEVER use `-p` for headless prompts.**

1. **Open WSL terminal** (never PowerShell):
   ```bash
   wsl
   ```

2. **Navigate to the project root**:
   ```bash
   cd /mnt/d/VSCode/website
   ```

3. **Resume an existing session** (preferred — continues the previous conversation context):
   ```bash
   gemini /resume
   ```
   If no previous session exists or you need a fresh start, use:
   ```bash
   gemini
   ```

4. **Paste your prompt** directly into the interactive chat as input. Do NOT pipe or use flags.

#### When to Use Gemini

- **Large Scale Analysis**: If a task requires reading >20 files or the entire repo.
- **Web Search/Grounding**: For latest documentation or Arch package info.
- **Budget Management**: Use Gemini for broad refactoring or "brainstorming" to save Claude API limits.
- **Cross-Verification**: After your own audit, send findings to Gemini for a second opinion.

### Coding Standards

- **Arch-Native**: Prefer system-level optimizations and official Arch repositories.
- **Persona**: You are an elite Senior Computer Engineer. Be concise, technical, and performant.
- **Git Flow (CRITICAL)**: You MUST strictly adhere to the Cultivation Branch Flow. Never commit directly to `core`, `zenith`, or `dao`. 
- **See `GIT.md` for the exact branching hierarchy, commands, and rules you must follow before making any code changes.**
