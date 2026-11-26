# Tasks: Redesign Lume Premium Editorial

Increment 09.1 is limited to baseline and shared visual foundations. Page redesign tasks remain pending for Increment 09.2.

## Phase 0: Direction Approval

- [ ] Review `DESIGN.md` and visual audit.
- [ ] Approve Gallery, Salon and Desk visual worlds.
- [ ] Approve restrained tactile clay materiality.
- [ ] Approve photography-led Home hero direction.
- [ ] Approve typography evaluation constraints.
- [ ] Approve photography sourcing and licensing process.
- [ ] Approve rollout order.
- [ ] Record explicit authorization to begin implementation.

## Phase 1: Baseline And Foundations

- [x] Capture desktop/tablet/mobile baselines for representative route families at 1440x900, 1024x768, 768x1024, 390x844 and 320x700.
- [x] Record current route-level JS, image transfer, LCP and CLS baselines.
- [x] Define semantic color, type, spacing, radius, elevation and motion foundation tokens.
- [x] Consolidate shared flat/editorial and clay foundation rules without intended behavior changes.
- [ ] Define image manifest fields and asset acceptance workflow.
- [ ] Confirm font licenses, loading strategy and payload.
- [x] Add representative visual regression capture matrix before changing page composition.

### Increment 09.1 Validation

- [x] Run typecheck, lint and production build successfully.
- [x] Pass `audit:viewport` at the five Increment 09.1 viewports after correcting 320px callout overflow.
- [x] Pass `audit:auth` at the five Increment 09.1 viewports.
- [x] Pass `audit:marketplace` with isolated PostgreSQL/Mailpit healthy; 25 route/viewport checks, filter assertions and JavaScript exception check passed.
- [x] Pass complete `audit` after updating its obsolete 404 navigation expectation.
- [x] Regenerate 40 representative `after` captures from the current production build and inspect public, catalog, detail, auth and institutional pages.
- [x] Verify skip-link activation with real `Tab` and `Enter` events and assert focus transfer to `main`.
- [x] Add intrinsic dimensions to the 8 Home and 12 Catalog image renderings and repeat image/loading performance checks.
- [x] Repeat Home and Catalog CPU-headless performance measurements at 1440x900 and 390x844 with three cold-cache runs.
- [ ] Validate provider and authenticated account visuals with required local services running.
- [ ] Complete manual keyboard traversal, 200% zoom, LCP/CLS and route-transfer baselines.

## Phase 2: Global Chrome And Primitives

- [ ] Redesign header with unambiguous anonymous/authenticated states.
- [ ] Redesign mobile navigation with announced state and 44px targets.
- [ ] Refine footer and demonstration disclosure hierarchy.
- [ ] Implement button, link, field, chip, card and dialog states from approved system.
- [ ] Add contained overscroll and focus restoration to modal filters.
- [ ] Replace broad property transitions with explicit performant transitions.
- [ ] Validate skip link, focus visibility, reduced motion and 200% zoom.

## Phase 3: Home And Explorar

- [ ] Implement approved Home hero composition with verified imagery.
- [ ] Differentiate category treatments without repetitive cards.
- [ ] Establish section rhythm across Gallery and Salon worlds.
- [ ] Reframe Explorar as inspiration-led discovery distinct from Home and Catalog.
- [ ] Preserve search destinations and existing route behavior.
- [ ] Validate LCP image, responsive crops and first-screen composition.

## Phase 4: Catalog And Offer Cards

- [ ] Implement compact catalog entry and tactile filter system.
- [ ] Redesign offer card while preserving comparable facts and links.
- [ ] Preserve all URL-backed query, filter and sort behavior.
- [ ] Improve active-filter labels, empty state and loading treatment.
- [ ] Validate mobile dialog keyboard/focus/overscroll behavior.
- [ ] Validate long titles, names, locations and prices.

## Phase 5: Offer Detail And Profiles

- [ ] Implement offer media story using licensed, role-specific assets.
- [ ] Implement single foreground transaction rail without behavior changes.
- [ ] Expand provider trust module using existing data only.
- [ ] Redesign provider profile as professional portfolio page.
- [ ] Redesign client profile around trust and privacy.
- [ ] Keep real and demo profile quality floors aligned.
- [ ] Validate sticky behavior and mobile action treatment with keyboard and safe areas.

## Phase 6: Auth And Account

- [ ] Apply Salon/Desk direction to login, signup, recovery, reset and verification.
- [ ] Add correct autocomplete, spellcheck and input metadata.
- [ ] Move validation focus to first invalid field while retaining security behavior.
- [ ] Refine account hierarchy and reserve elevation for editable/high-impact regions.
- [ ] Preserve authentication, profile and capability API contracts.
- [ ] Run existing auth/profile integration and UI tests.

## Phase 7: Institutional Pages

- [ ] Give `Como funciona` mechanism-led composition.
- [ ] Give `Para clientes` comparison/confidence composition.
- [ ] Give `Para prestadores` professional-presentation composition.
- [ ] Preserve future-feature disclosures and avoid unsupported promises.
- [ ] Validate shared image grade without repeated source imagery.

## Phase 8: Finish Gate

- [ ] Audit every page at 1440x900, 1024x768, 820x1180, 768x1024, 390x844 and 320x700.
- [ ] Test complete keyboard paths and visible focus.
- [ ] Test reduced motion, 200% zoom and long-content stress cases.
- [ ] Verify all image sources and licenses.
- [ ] Verify heading hierarchy, labels, status announcements and contrast.
- [ ] Compare LCP, CLS, JS and image transfer to approved budgets.
- [ ] Run typecheck, lint, build and all existing audits/tests.
- [ ] Capture final route screenshots and document known limitations.
- [ ] Obtain final visual approval before release.

## Explicitly Excluded

- [ ] Do not change business rules.
- [ ] Do not implement real offers, contact, proposal or transaction features.
- [ ] Do not change APIs, authentication behavior, schema or migrations.
- [ ] Do not modify fixtures or original prototype assets.
- [ ] Do not add production dependencies without separate approval.
- [ ] Do not use imagery with unknown license or origin.
