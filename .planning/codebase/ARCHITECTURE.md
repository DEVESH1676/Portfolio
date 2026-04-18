# Architecture

**Date:** 2026-04-18

## High-Level Pattern
Monolithic repository with separate client and server applications, connected by a `shared` module. It uses Vite to build both, but the execution models differ.

## Boundaries
- **`/client`**: The React SPA frontend. Handled by Vite directly (`vite.config.ts`).
- **`/server`**: The Express server powering the backend, built using `vite.config.server.ts` and executed via `node dist/server/node-build.mjs`.
- **`/shared`**: Data models, schemas, and API definitions shared between the backend and the frontend (`shared/api.ts`).

## Data Flow
Frontend requests data from Express endpoints. The payloads are validated (likely using `zod` as specified in dependencies) according to `shared/api.ts` contracts.

## Entry Points
- Frontend: `index.html` → `client/App.tsx`.
- Backend: `server/index.ts` or `server/node-build.ts`.

## Key Abstractions
- `shared/api.ts` defines the types and potentially the API endpoint keys so client/server can be in sync without duplication.

## Areas for Improvement
- Lack of database abstraction in standard build. State might be stored in memory or another service not specified in `package.json`.
