# Integrations

**Date:** 2026-04-18

No explicit proprietary 3rd-party services identified in package.json at present (e.g. Stripe, AWS S3, Postmark, etc). The application relies entirely on open-source libraries. Database integration seems to be missing or decoupled (no ORM like Prisma or Drizzle detected in dependencies).

Dependencies indicative of some abstractions but no hard backend dependencies:
- **`date-fns`** for time mapping.
- **`dotenv`** for secrets loading.

## Key Paths
- `server/index.ts`
- `shared/api.ts`
