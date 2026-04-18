# Dr. C. A. Ghuge Portfolio

## What This Is

A premium, academic-grade portfolio website for Dr. C. A. Ghuge, designed to showcase publications, research, and professional Curriculum Vitae (CV). It blends a sleek, modern UI (glassmorphism, dark mode) with robust academic functionality.

## Core Value

A stunning first impression combined with frictionless access to academic credentials and research outputs.

## Requirements

### Validated

<!-- Shipped and confirmed valuable in existing codebase. -->

- ✓ React + Vite SPA frontend architecture
- ✓ Node/Express backend for API routing
- ✓ Shadcn UI component suite integration
- ✓ Anime.js animation system
- ✓ Responsive layout with functional sections (Hero, About, Education, Projects, Publications, Contact)

### Active

<!-- Current scope mapped from technical audits and feature requests. -->

- [ ] Fix critical bugs (hero image URL, dead code in `/data`, layout shifts)
- [ ] Implement Neural Network interconnected nodes canvas background
- [ ] Implement Magnetic hover effects on CTA buttons
- [ ] Implement robust SEO and OpenGraph metadata
- [ ] Add BibTeX quick-copy for academic citations
- [ ] Implement filterable/tag-based publications viewer

### Out of Scope

- Full database / ORM architecture (Hardcoded TS data objects are perfectly fine for an academic portfolio)
- Advanced User Auth (No login required for a portfolio)

## Context

- **Technical Environment:** Monorepo-style structure Node >= 22. React client on Vite, Express server. Standardized on TypeScript.
- **Current State:** The foundation is built, but it lacks rigorous SEO, has a few critical bugs (missing assets), and needs premium UI polish (animations) to elevate it to the "zenith" tier. 
- **Git Flow:** Moving toward a structural "Cultivation Flow" (Dao/Main, Zenith/Staging, Core/Dev).

## Constraints

- **Type**: Tech stack — **Why**: Keep it lightweight (React/Vite/Express) without heavy ORMs.
- **Type**: Performance — **Why**: Render-blocking assets must be minimized so the portfolio loads instantly.
- **Type**: Security — **Why**: CORS logic must be tightened before production deploy.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Anime.js over Framer Motion | Lighter weight and handles complex canvas background animations better for the neural net. | — Pending |
| Static Data Objects | A single academic doesn't need a heavy CMS database; TS objects in `client/data` are faster. | ✓ Good |

---
*Last updated: April 18, 2026 after GSD New Project initialization*
