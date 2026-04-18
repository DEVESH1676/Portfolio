# Repository Guidelines

## Project Structure & Module Organization
This TypeScript app is split by runtime. `client/` holds the React UI, with pages in `client/pages/`, reusable UI in `client/components/`, hooks in `client/hooks/`, and browser utilities in `client/lib/`. `server/` contains the Express API. Shared contracts live in `shared/`, ambient types in `types/`, and static assets in `public/`. Generated output goes to `dist/`.

## Build, Test, and Development Commands
Use Node `>=22` as declared in `package.json`.

- `npm run dev`: starts the Vite dev server on port `8080` and mounts the Express app for local API work.
- `npm run build`: builds both the SPA and server bundles.
- `npm run build:client`: builds the frontend into `dist/spa`.
- `npm run build:server`: builds the Node server bundle.
- `npm run start`: runs the built server from `dist/server/node-build.mjs`.
- `npm run test`: runs Vitest once.
- `npm run typecheck`: runs strict TypeScript checks.
- `npm run format.fix`: formats the repo with Prettier.

## Coding Style & Naming Conventions
Prettier is the formatting source of truth: 2-space indentation, no tabs, trailing commas enabled. Prefer strict TypeScript and keep shared schemas in `shared/` when both client and server use them. Use `PascalCase` for React components, `camelCase` for variables and functions, and colocate tests as `*.spec.ts` or `*.spec.tsx`. Import app code via `@/` for `client/` and `@shared/` for `shared/`.

## Testing Guidelines
Vitest is the active test runner. Add focused unit tests next to the code they cover, following `client/lib/utils.spec.ts`. Run `npm run test` before opening a PR, and run `npm run typecheck` for any API, schema, or route change. There is no published coverage gate yet, so add tests for new logic and bug fixes instead of relying on manual checks.

## Cultivation Branch Workflow & Commits
This project strictly follows the "Cultivation Branch Flow" to protect production code:
1. **`dao` (Production):** The live site. Never push directly here.
2. **`zenith` (Staging):** Polish and pre-release. 
3. **`core` (Dev Base):** The central development branch. All features merge here. Do not code directly on `core`.
4. **`qi-*` (Feature Branches):** Always branch off `core` into a `qi-[feature]` branch to write code.
**Merge Path:** `qi-[feature]` → `core` → `zenith` → `dao`.
**Commits:** Never use timestamp-only messages. Use short imperative messages (e.g., `feat: add contact form`, `fix: correct image URL`, `chore: update config`).

## Configuration & Security Tips
Do not commit secrets from `.env`. The dev server blocks direct access to `.env`, certificate files, `.git`, and `server/**`; keep that boundary intact when editing Vite config. When adding API inputs, validate them in shared Zod schemas before they reach route logic.
