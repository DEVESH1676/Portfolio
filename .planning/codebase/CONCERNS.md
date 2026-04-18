# Concerns

**Date:** 2026-04-18

## 1. Data Persistence Pattern
- The app lacks an obvious database ORM or driver (no Prisma, Drizzle, pg, etc.). The backend might be using in-memory stores, file systems, or interacting via remote HTTP services that lack dedicated SDKs in the stack.

## 2. Shared Types Linkage
- With both frontend and backend built via varying Vite configurations and TypeScript, the module resolution across `/shared` might present complications or require particular IDE alias setups to respect the boundaries.

## 3. Server Deployment Target
- Using Vite to bundle the backend (`vite build --config vite.config.server.ts`) is non-standard but gaining traction. Care must be taken to ensure runtime secrets are not statically ingested by Vite via `import.meta.env` in backend modules unless expected. The `pkg` target indicates potential binary packaging (pkg tool) may be planned.

## 4. Netlify vs Serverless HTTP
- `serverless-http` is a dependency, and the `/netlify` folder indicates deployment to serverless environments. Ensure that state isn't held problematically in Express considering serverless lifecycle constraints.
