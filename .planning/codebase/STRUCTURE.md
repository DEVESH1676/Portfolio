# Directory Structure

**Date:** 2026-04-18

The workspace is organized into a React SPA, a Node/Express backend, and a shared module.

## Root Directories

- `/client` — Frontend React application
  - `/components` — Reusable UI elements (Radix primitives, pages)
  - `/data` — Mock data or client-side storage abstractions
  - `/hooks` — Custom React hooks
  - `/lib` — Utility functions 
  - `/pages` — Route-level views
- `/server` — Express backend
  - `/routes` — API endpoint handlers
- `/shared` — Code shared between client and server
- `/public` — Static assets (images, fonts, raw HTML)
- `/netlify` — Configuration or functions specific to Netlify deployment

## Build Output
- `/dist/spa` — Client build artifacts (configured in `package.json` pkg)
- `/dist/server` — Server build artifacts

## Configuration Files
- `vite.config.ts` — Client bundler config
- `vite.config.server.ts` — Server bundler config
- `tailwind.config.ts` — Styling configuration
- `tsconfig.json` — TypeScript root config
- `netlify.toml` — Netlify settings
