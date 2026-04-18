# Testing

**Date:** 2026-04-18

## Technology
- **Framework:** `vitest`

## Practices
- Unit tests run via `npm run test` (`vitest --run`).
- E2E or Integration framework (e.g., Playwright, Cypress) is absent from `package.json`, suggesting an emphasis purely on fast unit and functional specs.

## Execution
- To trigger specs: `pnpm test` or `npm run test`
