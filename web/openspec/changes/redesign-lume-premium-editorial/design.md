# Design: Premium Editorial Experience

## Context

Lume is a Next.js marketplace prototype with public discovery, catalog filtering, offer detail, public provider/client profiles, auth, account and institutional routes. Current system centralizes color and tokens but combines an earlier flat editorial layer with later clay-style overrides in one global stylesheet.

This change defines future visual architecture. Increment 09.1 implements only shared tokens and visual foundations; page-level composition remains future Increment 09.2 work.

## Design Decisions

### 1. Evolve Existing Product

Keep route structure, content model, business logic and shared components. Refactor presentation incrementally around page families rather than reconstructing application.

Rationale: product flows, responsive audits and accessibility foundation already work. Rebuilding increases behavior risk without improving direction quality.

### 2. Use Three Visual Worlds

- Gallery for discovery, work and editorial storytelling.
- Salon for curation, trust and professional identity.
- Desk for filters, forms, account and transaction detail.

Rationale: surface changes create page rhythm and context while preserving one brand system.

### 3. Restrict Clay Materiality

Clay depth applies to actions, selections, filter controls, transaction rail and occasional spotlight. Most content remains flat or photograph-led.

Rationale: universal elevation erases hierarchy and resembles generic UI kits.

### 4. Keep Brand Anchors

Preserve `#111B40`, `#27345D`, `#C91A6E`, `#EC2184`, `#FFFFFF` and `#AAB3CA`. Clarify semantic roles and accessible combinations instead of expanding decorative color.

### 5. Preserve Editorial Type Concept

Retain display-serif/functional-sans model. Exact font files are a later approved decision with two-family/four-file maximum.

Rationale: current typography is strongest identity asset; replacement needs evidence, license and performance budget.

### 6. Photography Carries Richness

Use verified photography of result, work, process, environment and provider. Define consistent grade and desktop/mobile crops. Track source and license.

Rationale: marketplace quality depends on credible work and people, not decorative effects.

### 7. Separate Inspiration From Comparison

Home and Explorar may use varied image proportions and editorial compositions. Catalog keeps aligned cards and explicit comparable facts.

Rationale: masonry and visual asymmetry support browsing but harm price/provider comparison.

### 8. One Foreground Object Per Viewport

Offer detail may elevate transaction rail; auth may elevate form; catalog may elevate filter sheet. Competing foreground panels are avoided.

### 9. Behavior Is Contract

URL-backed filters, auth operations, capability activation, profile data handling, disclosures and route outcomes remain behaviorally unchanged unless separate approved change says otherwise.

## Proposed Visual Architecture

Future implementation should converge toward:

- Brand primitives: color, typography, spacing, radius, elevation and motion tokens.
- Layout primitives: shared shell, editorial grid, section rhythm and responsive media frames.
- Interaction primitives: button, link, field, chip, dialog and focus behavior.
- Marketplace compositions: offer card, provider identity, media story, facts and transaction rail.
- Page-family composition: discovery, catalog, detail/profile, auth/account and institutional.

This is conceptual structure, not authorization to add files or dependencies now.

## Page Strategy

### Home

Single photographic/editorial hero with search and clear proposition. Categories gain differentiated compositions. Curated offers remain recognizable marketplace objects but do not define every section.

### Explorar

Inspiration-led collections and needs. Purpose differs from Home and task-oriented Catalog.

### Catalog

Compact entry, aligned result cards, tactile filter controls, clear active state, persistent URL behavior and robust empty/loading states.

### Offer Detail

Media-led service story, explicit core facts and one elevated transaction rail. Provider module supports trust and navigation.

### Provider Profile

Professional portfolio composition using verified portrait/work imagery when available. Demo and real profiles share quality floor.

### Client Profile

Restrained trust and privacy composition without invented activity.

### Auth And Account

Salon/Desk balance. Form state and account hierarchy take precedence over campaign-like decoration.

### Institutional

Each page receives content-specific composition while sharing typography, edges and image grade.

## Interaction Model

- Hover: image zoom 1.02-1.03, linked object lift no more than 3px, underline draw where appropriate.
- Active: immediate tactile compression.
- Focus: non-animated visible ring independent of hover.
- Page entrance: at most one deliberate hero/media entrance.
- Scroll: no repeated reveal, parallax text or scroll-jacking.
- Reduced motion: remove decorative transforms and reveal delays.

## Responsive Model

- Desktop: 12-column editorial grid.
- Tablet: 8-column grid with recomposed, not merely scaled, layouts.
- Mobile: 4-column grid, text-first reading order, explicit image crops and full-width primary actions.
- Validate at 1440x900, 1024x768, 820x1180, 768x1024, 390x844 and 320x700.

## Accessibility Model

- WCAG 2.2 AA target.
- 44px minimum interactive targets.
- 13px absolute metadata floor; 16px primary reading/form text.
- Semantic controls and linear heading hierarchy.
- Visible labels, field-level errors and first-error focus.
- Dialog focus restoration and contained overscroll.
- Sticky surfaces do not cover focus.
- Long Portuguese content and 200% zoom included in validation.

## Performance Model

Proposed budgets to confirm before implementation:

- No more than two font families and four font files.
- Hero uses responsive image formats and explicit dimensions.
- Below-fold images lazy-load.
- No animated blur, large continuously animated shadow or decorative WebGL.
- Basic feedback uses CSS; animation library reserved for justified composition.
- Compare route-level JS and image transfer against current baseline.

## Image Governance

Every accepted asset records:

- Source URL or internal owner.
- License and permitted use.
- Original dimensions.
- Intended routes/roles.
- Required desktop and mobile crops.
- Alt-text intent.

No asset enters product merely because it appears in a reference repository.

## Alternatives Considered

### Universal Claymorphism

Rejected. It produces playful repetition, reduces hierarchy and increases paint cost.

### Minimal Apple-Like Interface

Rejected as full direction. Useful photographic restraint, but marketplace facts and service trust require more explicit UI.

### Dark Editorial Throughout

Rejected. Navy remains an important world, not universal canvas; discovery and forms need light reading surfaces.

### Masonry Catalog

Rejected for comparison views. May appear in inspiration/editorial contexts only.

### Rebuild From Scratch

Rejected. Existing architecture and behavior are viable and tested.

## Rollout Strategy

After approval:

1. Establish baselines and consolidate foundations.
2. Prove direction on Home and one representative mobile state.
3. Extend to Explorar and catalog/card system.
4. Extend to offer detail and public profiles.
5. Extend to auth and account.
6. Extend to institutional pages.
7. Run cross-route finish gate, accessibility and performance review.

Each slice should remain releasable and behaviorally equivalent.

## Open Decisions

- Exact display and body font files.
- Photography budget and source channels.
- Home hero composition among approved static frames.
- Whether header is edge-aligned or subtly floating; nested-pill navigation is disallowed either way.
- Mobile transaction-bar behavior on offer detail.
- Product-content resolution for demo/auth messaging contradiction.

## Approval Requirement

No implementation task may move from pending to active before explicit stakeholder approval.
