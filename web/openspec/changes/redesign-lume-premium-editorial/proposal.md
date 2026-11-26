# Proposal: Redesign Lume Premium Editorial

## Status

Increment 09.1 visual foundation implemented and under final validation. Page-level redesign remains pending and SHALL NOT begin before separate Increment 09.2 approval.

## Why

Lume already has coherent color, typography, responsive structure and marketplace flows. Current presentation nevertheless reads as a modest marketplace because one rounded/elevated recipe is applied across most pages, photography lacks unified art direction, metadata is often too small and page compositions do not establish distinct identities.

The redesign should elevate perceived quality without replacing product architecture or changing marketplace behavior.

## Proposed Direction

Adopt **Lume: Premium Editorial Marketplace with Tactile Claymorphism** as documented in root `DESIGN.md`.

The direction combines:

- Editorial photography and expressive serif hierarchy.
- Existing navy and rose identity.
- Three coherent visual worlds: Gallery, Salon and Desk.
- Tactile depth restricted to actions, selections and foreground transaction objects.
- Distinct compositions for discovery, comparison, detail, profile and account contexts.
- Accessibility, responsive behavior and performance as visual acceptance criteria.

## Goals

- Give Lume recognizable art direction across all public and account routes.
- Increase perceived quality of service imagery, offer cards and public profiles.
- Preserve marketplace clarity: service, provider, price, location, availability and action.
- Create one maintainable visual system instead of layered flat/clay overrides.
- Improve interaction states, keyboard behavior, mobile composition and reduced motion.
- Establish verifiable image licensing and performance budgets.

## Non-Goals

- No business-rule changes.
- No real offer creation, proposal, contact or transaction features.
- No API, authentication, schema, migration or fixture changes.
- No prototype replacement or rebuild from zero.
- No production dependency addition in this planning change.
- No unlicensed or unverifiable imagery.

## Scope

Future implementation may affect visual tokens, global chrome, shared UI primitives, marketplace presentation, auth/account presentation and institutional page composition.

It must preserve route behavior, data contracts, query parameters, authorization and existing disclosures unless a separate approved product-content change addresses contradictions.

## Deliverables In This Change

- Root `DESIGN.md` defining original Lume visual system.
- Visual audit and current-state captures under `docs/redesign-audit/`.
- Implementation design, task plan and verifiable experience specification.
- Increment 09.1 semantic tokens, shared visual foundation and responsive regression captures under `docs/redesign-audit/foundation-09-1/`.
- Increment 09.1 validation record under `docs/redesign-audit/foundation-09-1/validation.md`.

## Approval Gate

Implementation SHALL NOT begin until stakeholder explicitly approves visual direction. Approval should cover:

- Three visual worlds.
- Hero strategy.
- Degree of tactile materiality.
- Typography strategy.
- Photography sourcing approach.
- Rollout order.

## Success Measures

Future implementation is successful when:

- Page families remain recognizable as Lume while serving distinct tasks.
- Complete pages pass responsive, keyboard, reduced-motion and overflow checks.
- Core marketplace facts remain immediately available.
- Photography assets have documented source and license.
- Performance budgets and Core Web Vitals do not regress beyond approved thresholds.
- No business, auth, API, schema or fixture behavior changes.

## Risks

- Rich photography can regress LCP and memory use.
- New font choices can cause layout shift and payload growth.
- Clay depth can become repetitive or expensive to paint.
- Global CSS consolidation can cause cross-route regressions.
- Sticky actions can obscure content or keyboard focus.
- Existing demo copy conflicts with implemented auth/profile behavior; redesign must not silently redefine product truth.

## Dependencies

- Explicit direction approval.
- Verified image sourcing plan.
- Typography licensing/performance decision.
- Baseline screenshots and route test matrix.

## Related Documents

- `DESIGN.md`
- `docs/redesign-audit/visual-audit.md`
- `openspec/changes/redesign-lume-premium-editorial/design.md`
- `openspec/changes/redesign-lume-premium-editorial/tasks.md`
- `openspec/changes/redesign-lume-premium-editorial/specs/premium-editorial-experience/spec.md`
