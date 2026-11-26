# Lume Design Direction

Status: proposed for approval. This document defines direction only; it does not authorize implementation.

## 1. Identity

**Concept:** Lume is a premium editorial marketplace with tactile claymorphism.

Lume presents independent work with the care of an editorial publication and the clarity of a professional marketplace. Photography carries desire and credibility. Typography establishes point of view. Tactile surfaces make actions feel physical without turning the interface playful or neumorphic.

The visual character is:

- Editorial, not magazine-themed.
- Premium, not sparse to the point of ambiguity.
- Tactile, not inflated or toy-like.
- Expressive in discovery, restrained in transactions.
- Portuguese and human, without generic lifestyle imagery.
- Clear about service, provider, price, location, availability and next step.

### Design principles

1. **Work first.** Show service, process, result and person before decoration.
2. **One dominant idea per section.** Composition changes with content; repeated card grids do not define the page.
3. **Editorial desire, marketplace certainty.** Expressive imagery and type may attract attention, but operational facts stay explicit.
4. **Depth has hierarchy.** Most surfaces remain flat. Elevation marks action, selection or a truly foregrounded object.
5. **Pink means action.** It is not ambient decoration.
6. **Motion explains state.** It never delays navigation or competes with reading.
7. **Mobile is composed, not compressed.** Reading order, crops and sticky actions are deliberately redesigned for narrow screens.

## 2. Atmosphere

Primary atmosphere: mineral paper, deep navy ink, editorial photography, restrained rose accents and soft physical depth.

Pages should alternate among three visual worlds:

- **Gallery:** pale mineral canvas, large photography, open type and quiet rules.
- **Salon:** navy surface for curation, trust or professional identity.
- **Desk:** white or cool-paper transactional surfaces for filters, forms and account tasks.

These worlds create rhythm. Avoid wrapping every section in a rounded white panel.

## 3. Color

### Brand anchors

| Token | Value | Role |
| --- | --- | --- |
| `navy-800` | `#111B40` | Primary ink, inverse ground, high-trust actions |
| `navy-600` | `#27345D` | Secondary ink, structural controls |
| `rose-600` | `#C91A6E` | Accessible primary action and focus |
| `rose-500` | `#EC2184` | Vivid highlight at large size or non-text detail |
| `white` | `#FFFFFF` | Foreground surface and inverse text |
| `blue-gray-200` | `#AAB3CA` | Borders and secondary text on dark ground |

### Supporting neutrals

| Token | Proposed value | Role |
| --- | --- | --- |
| `canvas-mineral` | `#F4F3F7` | Default canvas; slightly warmer than current gray |
| `canvas-paper` | `#FAF9FB` | Editorial reading surface |
| `surface-white` | `#FFFFFF` | Forms, selected cards and foreground objects |
| `surface-navy-soft` | `#ECEEF4` | Quiet grouped controls and skeletons |
| `line-soft` | `rgba(17, 27, 64, 0.12)` | Hairlines |
| `line-strong` | `rgba(17, 27, 64, 0.24)` | Selected or structural boundaries |

Values outside preserved brand colors remain provisional until contrast testing in browser.

### Semantic roles

- `action-primary`: `#C91A6E` with white text, minimum 4.5:1.
- `action-hover`: darker rose, never brighter pink behind white text.
- `action-secondary`: navy text on white or transparent surface with visible boundary.
- `focus`: rose ring with sufficient 3:1 adjacent contrast.
- `success`, `warning`, `danger`: remain functional colors and do not borrow brand rose when meaning differs.
- Navy and rose may coexist prominently only once per viewport. Elsewhere, one leads and the other recedes.

### Color rules

- Keep 80-90% of each screen neutral or photographic.
- Reserve filled rose for primary actions, active filters and rare editorial punctuation.
- Use navy as a full-width world, not many small dark cards.
- No random gradients. A photographic color wash is allowed only when sourced from image art direction and tested for text contrast.
- No violet, generic glass tint or low-contrast gray-on-gray neumorphism.

## 4. Typography

The current serif/sans contrast is an asset and should evolve, not be discarded.

### Roles

- **Display serif:** editorial headlines, provider names, offer titles and selected numeric moments. Current Iowan Old Style/Baskerville stack remains baseline until a licensed, performant alternative proves materially better.
- **Functional sans:** navigation, body, forms, metadata, filters and account UI. Evaluate a distinctive humanist or neo-grotesque face during implementation; do not add a font dependency before approval.
- Maximum two families and four loaded files.

### Scale

| Role | Desktop | Mobile | Notes |
| --- | --- | --- | --- |
| Display 1 | `clamp(4.5rem, 8vw, 8.5rem)` | `clamp(3.25rem, 15vw, 5rem)` | Hero only, up to 3 lines |
| Display 2 | `clamp(3rem, 5vw, 5.5rem)` | `clamp(2.5rem, 11vw, 3.75rem)` | Major section or profile |
| Heading 2 | `clamp(2.25rem, 3.6vw, 4rem)` | `2.25rem-3rem` | Section title |
| Heading 3 | `1.5rem-2rem` | `1.35rem-1.65rem` | Card or subsection |
| Lead | `1.125rem-1.25rem` | `1.0625rem` | 1.5 line-height |
| Body | `1rem` | `1rem` | Never reduce primary reading text |
| Small | `0.875rem` | `0.875rem` | Metadata |
| Label | `0.8125rem` | `0.8125rem` | Floor; sentence case preferred |

### Type rules

- Use tight tracking only above 40px. Portuguese accents and long words must remain open and legible.
- Body measures stay between 45 and 70 characters.
- Use `text-wrap: balance` for short display headings and `text-wrap: pretty` for prose.
- Prices, ratings and comparable values use tabular figures.
- Italic is an editorial accent, not a default second color for every heading.
- Avoid all-caps microcopy below 13px. Eyebrows are sparse: one or two per page.
- Headings name a concrete thing. Calls to action use a verb and object.

## 5. Grid And Composition

### Global grid

- Maximum content width: `1280px`.
- Desktop: 12 columns, 24px gutters, 64-80px page margins.
- Tablet: 8 columns, 20-24px gutters, 32-48px margins.
- Mobile: 4 columns, 12px gutters, 16-24px margins.
- Header, main sections and footer share left and right alignment lines.

### Composition rules

- Hero occupies first visual chapter without showing an unrelated section heading at initial load.
- Alternate composition, not merely background: split editorial, full-bleed photograph, image wall, type-led chapter, open list, structured grid.
- Text precedes related imagery in mobile reading order.
- Use asymmetric desktop composition only when alignment remains evident.
- Large imagery may bleed to both viewport edges; never bleed accidentally to one side.
- No horizontal swipe rows for core content.

## 6. Spacing

Base scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 112, 144`.

- Section rhythm: 96-144px desktop, 64-96px mobile.
- Heading to lead: 16-24px.
- Heading group to content: 32-56px.
- Card internal padding: 20-32px according to density.
- Dense marketplace controls may use 8-16px gaps; editorial compositions use 24-48px.
- Empty space must frame a focal object, not compensate for missing content.

## 7. Surfaces And Depth

### Elevation levels

1. **Ground:** no shadow. Canvas, sections, open lists and image compositions.
2. **Resting object:** subtle border plus broad low-opacity ambient shadow. Forms, selected offer cards, filters.
3. **Foreground object:** stronger ambient shadow and inner highlight. Sticky transaction rail, active popover, modal.

Only one foreground object should dominate a viewport.

### Shadow character

- Shadows are navy-tinted, broad and under 14% opacity.
- Inner highlights use white under 70% opacity.
- No equal dark shadows on all sides.
- Hover increases separation slightly; active state compresses it.
- Photography usually creates depth without shadow.

## 8. Tactile Claymorphism

Claymorphism is an interaction material, not universal decoration.

### Recipe

- Convex silhouette with controlled 12-24px radius.
- One soft ambient shadow plus one inner top highlight.
- Solid, high-contrast fill.
- Press state: `translateY(1px)` or `scale(0.98)` with reduced outer shadow and stronger inset shadow.
- Hover state: at most `translateY(-2px)` and modest shadow spread.
- Focus ring remains independent and immediately visible.

### Apply to

- Primary and high-value secondary buttons.
- Filter chips and compact selection controls.
- Sticky transaction rail.
- Occasional category object or curated spotlight.
- Mobile action bar when needed.

### Do not apply to

- Every section container.
- Long-form copy.
- Every image.
- Repeated offer grids with strong photography.
- Legal copy, tables or dense account facts.

## 9. Shape Language

Use three families only:

- Controls: 10-14px.
- Cards and media: 18-24px.
- Pills/circles: only status, avatar, chip or compact segmented choice.

Not every rectangle is rounded. Open editorial sections, rules and image walls may remain square.

## 10. Buttons And Links

### Buttons

- Minimum 44x44px; primary mobile actions normally 48px high.
- One filled primary action per region.
- Primary: rose clay surface, white label, restrained tactile response.
- Secondary: white/paper surface, navy label and defined border.
- Tertiary: text link with directional arrow or drawn underline.
- Destructive: semantic red, never brand rose by default.
- Disabled state communicates unavailability without dropping below readable contrast.

### Links

- Navigation links retain native link behavior.
- Inline links use underline or a persistent affordance, not color alone.
- Linked cards expose one focusable target and descriptive accessible name.

## 11. Forms

- Visible label above every field; placeholder supplements, never replaces it.
- 48px default field height and 16px entered text on mobile.
- Inputs use a shallow inset material only in transactional worlds.
- Focus, invalid, disabled, loading and success states are distinct.
- Errors sit beside the affected field and identify the next corrective action.
- First invalid field receives focus after submission.
- Use meaningful `name`, `type`, `inputmode`, `autocomplete` and spellcheck settings.
- Password visibility controls remain at least 44px and named for assistive technology.
- Dialog filters contain overscroll and restore focus to trigger on close.

## 12. Cards

No universal card component should visually solve every section.

### Offer card

- Photography leads at `4:5`, `3:4` or context-specific editorial ratio.
- Service title, provider, location/mode, rating and price remain visible and comparable.
- Metadata hierarchy is quiet but no smaller than 13px.
- One compact badge maximum over image, unless state requires another.
- Resting grid cards may be nearly flat; hover elevation is interaction feedback.

### Provider card

- Portrait or work image takes precedence over initials when verified imagery exists.
- Name, discipline, location, rating and response expectation read as professional credentials.
- Avoid circular portrait as only public image.

### Editorial spotlight

- May use larger scale, dark ground or tactile depth.
- Appears sparingly to interrupt grid rhythm.

### Utility card

- Used for filters, account and transaction facts.
- Structured by rules and spacing, not oversized shadows.

## 13. Navigation

- Header remains stable, readable and compact.
- Desktop supports clear product destinations plus one account state and one primary action.
- Do not show anonymous and authenticated actions simultaneously.
- Search may become a contextual navigation object on discovery/catalog routes.
- Mobile menu is full-width or full-screen enough for 44px targets, visible current state and clear close behavior.
- Sticky mobile action bars appear only for a high-value contextual action and never cover focused content.
- Institutional demonstration disclosure remains visible but visually subordinate.

## 14. Photography And Images

Photography is primary art direction.

### Subject hierarchy

1. Finished work or result.
2. Provider at work.
3. Material, tool or process detail.
4. Context or environment.
5. Portrait.

### Direction

- Natural or shaped directional light; avoid flat office stock.
- Real Portuguese context where available and licensed.
- Consistent grade: clean whites, deep navy shadows, controlled rose/skin tones.
- Mix establishing, medium and detail shots. Do not repeat one source across many roles.
- Define desktop and mobile crops per important image.
- Text over photography only on verified calm areas with tested contrast; prefer separate text and image on mobile.
- Every image needs source, license and intended use in `public/images/SOURCES.md` or successor manifest.
- Do not introduce unverified or AI-generated imagery without explicit product decision and disclosure policy.

## 15. Motion

- Default durations: 120ms feedback, 180-240ms state change, 400-650ms hero/media entrance.
- Animate transform and opacity; avoid layout-driven animation.
- Hero may enter once without hiding readable content for long.
- Linked image zoom: 1.02-1.03 inside fixed frame.
- Card lift: at most 2-3px.
- Button press is immediate and interruptible.
- No repeated scroll reveals, parallax text, tilt, autoplay carousel or scroll-jacking.
- Motion over 5 seconds requires pause/stop controls.
- `prefers-reduced-motion` removes decorative movement and preserves all content.

## 16. Responsiveness

- Validate at 1440x900, 1024x768, 820x1180, 768x1024, 390x844 and 320x700.
- At 390px, use one primary content column; two-up only for compact media with 165px minimum width.
- Recompose hero rather than scale desktop collage blindly.
- Keep full headings, labels and prices; do not solve overflow by shrinking below type floors.
- Catalog changes from side filters to modal/sheet; active filters remain visible and removable.
- Detail pages move transaction rail below initial context or to a non-obscuring sticky action bar.
- Account and auth preserve field widths, keyboard safety and safe-area padding.

## 17. Accessibility

- Target WCAG 2.2 AA.
- Text contrast: 4.5:1; large text: 3:1; focus and control boundaries: 3:1 where required.
- Visible `:focus-visible` on every interactive element.
- Skip link remains first keyboard destination.
- Semantic controls before ARIA; no clickable generic containers.
- Heading hierarchy remains linear.
- Touch targets are at least 44px with adequate separation.
- Async results, validation and account feedback use polite status announcements where appropriate.
- Sticky surfaces never obscure focused elements.
- Browser zoom stays enabled.
- Test keyboard-only, screen-reader landmarks, reduced motion, 200% zoom and long Portuguese content.

## 18. Application Examples

### Home

Use one memorable editorial hero: clear marketplace proposition, search and a photographic composition showing different service worlds. Follow with category treatments that alternate object, image and open list rather than six identical cards.

### Catalog

Use Desk world. Keep comparison alignment, URL-backed filters and explicit result count. Photography leads cards, while filter surface is tactile but compact.

### Offer detail

Use Gallery plus Desk. Build image story and service facts in main column; transaction rail becomes single foreground clay object. Provider identity receives a real editorial module, not only initials.

### Public profile

Treat profile as professional portfolio page: portrait/work hero, credibility facts, biography, selected work and offers. Client profiles stay intentionally more private and trust-led.

### Auth and account

Use Salon plus Desk. Preserve current split-screen distinction, reduce oversized empty surfaces and prioritize form clarity, status and account capability.

## 19. Do

- Preserve navy/rose identity and serif/sans contrast.
- Let photography and composition create most richness.
- Use clay depth on actions and foreground objects.
- Keep marketplace facts visible.
- Alternate visual worlds and section structures.
- Document every image source.
- Validate complete pages and interactions in a real browser.

## 20. Avoid

- Generic SaaS hero, dashboard motifs or mesh gradients.
- Rounded white cards in every section.
- Childlike clay blobs, mascots or saturated toy palettes.
- Low-contrast neumorphism or generic glassmorphism.
- Decorative icons where a relevant photograph should exist.
- Multiple prominent pink actions in one viewport.
- Tiny metadata below 13px.
- Motion without information or feedback value.
- Copying another brand's signature composition, palette or effect.

## 21. Approval Gate

Before implementation, approve:

1. Visual concept and three visual worlds.
2. Typography strategy and whether to retain current system stack or evaluate licensed/web fonts.
3. Photography sourcing plan and budget.
4. Hero composition direction.
5. Degree of clay materiality through static reference frames.
6. Priority order for page rollout.

No interface implementation starts before explicit approval.
