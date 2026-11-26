# Increment 09.1 Validation

Date: 2026-11-14

## Scope

Shared visual foundation only. No page-level redesign, business rule, API, authentication, database, schema, migration or fixture change.

## Current Build

- Production build was regenerated before browser validation.
- Audits used `next start` on `http://127.0.0.1:3010` and a fresh headless Chrome CDP session.
- Previous `after` captures were replaced because they matched old-server output.

## Results

- PASS: `npm run typecheck`.
- PASS: `npm run lint`.
- PASS: `npm run build`.
- PASS: isolated test infrastructure started from `compose.test.yml`: `lume-auth-integration-postgres-1` and `lume-auth-integration-mailpit-1` healthy. PostgreSQL is the expected tmpfs-only `lume_auth_test` service on `127.0.0.1:55432`; no other project compose file or local database was used.
- PASS: existing migrations applied only to that disposable test database. `DATABASE_URL=postgresql://lume_test:lume_test_only@127.0.0.1:55432/lume_auth_test npm run db:check` completed its application `select 1` query.
- PASS: `npm run test:auth` with 29 passed, 0 skipped.
- PASS: `npm run test:profiles` with 26 passed, 0 skipped.
- PASS: `npm run test:db` with 3 passed.
- PASS: `npm run audit:viewport`, 25 route/viewport combinations after fixing `provider-callout` grid shrinkage at 320x700.
- PASS: `npm run audit:auth`, 25 route/viewport combinations and three auth-flow assertions.
- PASS: `npm run audit:marketplace`, including 25 route/viewport combinations, combined filter search, URL sort preservation, mobile filter dialog availability and no JavaScript exceptions.
- PASS: `npm run audit` against the regenerated production build. In addition to document semantics, metadata, disclosure, desktop/mobile overflow, reduced motion, 404 navigation and JavaScript exception checks, the audit sent real CDP `Tab` and `Enter` key events and asserted `document.activeElement === document.querySelector("main#main")` after skip-link activation.
- PASS WITH LIMITATION: `node tests/audit-visual-foundation.mjs after` regenerated 40 captures and metrics. All measured pages, including provider, reported no horizontal document overflow and no visible text below 13px. The account capture remains anonymous/login presentation; authenticated account visual validation was not performed.

## Visual Review

- Typography: serif/sans hierarchy remains clear; compact measured text meets the 13px floor in audited pages.
- Contrast and legibility: navy/rose/light surfaces remain readable in inspected public, catalog, detail, auth and institutional captures.
- Controls: buttons and fields retain visible boundaries; global `:focus-visible` ring remains defined independently from shadows.
- Responsive behavior: inspected five target sizes. A real 320px callout overflow was corrected with grid item shrink containment.
- Surfaces: card and section elevation is reduced and semantic shadow counts remain bounded in the generated metrics.
- Motion: reduced-motion audit passes; decorative hover transforms are disabled under `prefers-reduced-motion: reduce`.
- Keyboard and zoom: keyboard events through Chrome CDP confirmed first focus and visible focus on the skip link, logical initial login sequence (`skip link`, brand, auth link, email, password, reveal-password button, remember checkbox, recovery link), and visible focus for every inspected login control. At 200% CDP page scale, `/ofertas` retained `main`, its heading and no document overflow. The skip-link failure is resolved: `Tab` focused `.skip-link`; `Enter` updated the fragment to `#main` and transferred real focus to `main#main`. Mobile menu and filter-dialog open/focus tests using programmatic focus remain inconclusive because `:focus-visible` intentionally does not apply to programmatic focus; layout/availability remain covered by `audit:marketplace`.
- Performance: CPU-headless cold-cache measurements were repeated with the same `.agents/skills/design-taste-frontend/scripts/perf.mjs` command, Chrome headless with GPU disabled/SwiftShader, cache disabled, 3 runs and 1440/390 widths. Host CPU was 27-32% in the rerun versus 8-11% in the baseline, below the tool's 50% busy-host threshold. JSON evidence was replaced with the rerun in `performance-home.json` and `performance-catalog.json`. LCP/CLS are synthetic lab values, not field/Core Web Vitals.
  - `/` at 1440x900: LCP 152 -> 160 ms, CLS 0.000 -> 0.000, transfer 496.3 -> 497.0 KiB. At 390x844: LCP 112 -> 120 ms, CLS 0.000 -> 0.000, transfer 418.3 -> 419.0 KiB.
  - `/ofertas` at 1440x900: LCP 100 -> 76 ms, CLS 0.000 -> 0.000, transfer 637.8 -> 638.6 KiB. At 390x844: LCP 192 -> 316 ms, CLS 0.000 -> 0.000, transfer 612.4 -> 613.2 KiB. Mobile spread was 204-960 ms while host CPU was 31-32%, so this synthetic regression remains visible rather than waived.
  - Image structure: Home 8 -> 0 and Catalog 12 -> 0 images without HTML `width`/`height`. All 20 affected renderings now emit intrinsic dimensions while CSS retains responsive `cover` sizing.
  - Loading: Catalog above-fold lazy warnings changed from 2 desktop/1 mobile to 0/0. First two Catalog cards are eager; remaining cards stay lazy. Home featured cards and both lower callouts stay lazy. Remaining tool warnings are one sticky-header logo classification on Home desktop, the sticky-header logo plus third hero card on Home mobile, and the second Catalog card on mobile; that card is above the fold and eager on desktop but falls below the fold in the single-column mobile layout.
  - JS parsed remains WARN at 673.7 KiB desktop and 629.1 KiB mobile. No performance FAIL, broken request, oversized image or layout shift was measured.

## Captures

Fresh captures are in `after/` for `home`, `explorar`, `catalogo`, `detalhe`, `perfil`, `entrar`, `institucional` and `conta` at:

- 1440x900
- 1024x768
- 768x1024
- 390x844
- 320x700

Comparison source remains in `before/`. Public-page comparison confirms foundation consolidation without page-composition redesign. Provider captures now use persisted profile data. Anonymous `conta` correctly resolves to the login presentation.

## Completion Blockers

- Perform a human-operated keyboard traversal for mobile menu/filter dialog and an authenticated account visual inspection. CDP keyboard coverage did not establish their visible focus behavior after programmatic focus.
- The requested skip-link, 20 image-dimension, above-fold Catalog loading, automated validation and performance rerun work is complete. Increment 09.1 still retains the human-only validation blocker above; Increment 09.2 has not started.
