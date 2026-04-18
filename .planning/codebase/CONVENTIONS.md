# Conventions

**Date:** 2026-04-18

## Coding Style
- **TypeScript:** Strict typing preferred (`tsc` used for typechecking).
- **Formatting:** Enforced mechanically using Prettier (`npm run format.fix`).
- **UI Components:** Shadcn/UI conventions employed given the heavy prevalence of `@radix-ui` dependencies, `clsx`, `tailwind-merge`, and `class-variance-authority`.
- **Icons:** `lucide-react` forms the icon system.
- **Routing:** React Router DOM standard file patterns per `pages/`.

## Architectural Patterns
- **Shared Code:** Types and endpoints shared manually rather than using a strict monorepo (`npm workspace`/lerna) or tRPC.
- **Build System:** Vite takes role of backend bundler as well as front-end builder. This aims to keep development environments fast.

## Error Handling
- Validation via Zod, which likely serves as the system boundary for client input requests in `/server/routes`.
