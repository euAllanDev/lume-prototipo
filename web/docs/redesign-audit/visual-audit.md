# Lume Visual Audit 09.0

Date: 2026-11-12  
Scope: installation, research, browser audit and planning only. No interface implementation.

## 1. Tools Installed

### Taste Skill

- Source: <https://github.com/Leonxlnx/taste-skill>
- Installed at: `.agents/skills/design-taste-frontend/`
- Version declared in skill: `2.5.1`
- Read in full: `SKILL.md`, `references/copy.md`, `copy-voice.md`, `system.md`, `layout-v4.md` and `sections.md`.
- Relevant guidance retained: real work and photography first, full-page browser review, equal content edges, deliberate section rhythm, restrained motion, copy specificity, accessibility and final quality gate.
- Adaptation: Lume is an existing multi-page marketplace, so the skill's static-page scaffolding and “deal” mechanics are not adopted literally.
- Installer note: external scanner reported “Critical Risk” and the command timed out during its final spinner. Local package contains `assets/`, `library/`, `references/`, `scripts/` and `SKILL.md`; content was inspected before use. No included hook or script was executed.

### Web Interface Guidelines

- Source: <https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines>
- Installed at: `.agents/skills/web-design-guidelines/`
- Current guidelines fetched from: <https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md>
- Applied to accessibility, forms, focus, keyboard behavior, motion, content resilience, responsive layout, images, navigation state and performance.

Skills are project development tools. No production dependency was added.

## 2. Audit Method

- Reviewed all user-facing routes, shared components, design tokens and global styles.
- Used live application at `http://127.0.0.1:3010` with headless Chrome and Chrome DevTools Protocol.
- Ran complete responsive audits at `1440x900`, `1024x768`, `768x1024`, `390x844` and `320x700`.
- Tested Home, Explorar, institutional pages, catalog, offer detail, provider profile and all auth flows.
- Tested catalog filtering, URL persistence, active-filter removal and mobile filter dialog.
- Inspected screenshots at desktop and mobile widths.
- No authenticated fixture was created; account visual assessment combines route/component inspection and existing loading/error/account UI tests.

### Automated results

- `npm run audit:viewport`: passed 25 route/viewport combinations.
- `npm run audit:marketplace`: passed 20 route/viewport combinations plus filter interaction checks.
- `npm run audit:auth`: passed 25 route/viewport combinations plus validation flow checks.
- No JavaScript exceptions or measured horizontal overflow in these audits.

Passing structural tests does not imply premium visual quality. Findings below are art-direction and interaction-quality findings.

## 3. Current Captures

Desktop:

- [Home](current/home-desktop.png)
- [Explorar](current/explorar-desktop.png)
- [Catalog](current/catalogo-desktop.png)
- [Offer detail](current/oferta-detalhe-desktop.png)
- [Provider profile](current/prestador-desktop.png)
- [Login](current/entrar-desktop.png)

Mobile:

- [Home](current/home-mobile.png)
- [Catalog](current/catalogo-mobile.png)

Complete pages:

- [Home desktop](current/full/home-full-desktop.png)
- [Explorar desktop](current/full/explorar-full-desktop.png)
- [Catalog desktop](current/full/catalogo-full-desktop.png)
- [Offer detail desktop](current/full/oferta-detalhe-full-desktop.png)
- [Provider profile desktop](current/full/prestador-full-desktop.png)
- [Como funciona desktop](current/full/como-funciona-full-desktop.png)
- [Home mobile](current/full/home-full-mobile.png)
- [Catalog mobile](current/full/catalogo-full-mobile.png)

No external reference images were copied into the repository. Reference links below preserve provenance and avoid unclear image licensing.

## 4. System-Level Findings

### Strengths to preserve

- Navy/rose identity is recognizable and already tokenized.
- Display serif plus functional sans creates useful editorial contrast.
- Home hero has clear proposition, search and service imagery.
- Catalog state lives in URL and works across responsive widths.
- Offer detail has understandable main-content/sticky-summary hierarchy.
- Auth flows share a coherent shell and inline feedback model.
- Skip link, focus styles, reduced motion and semantic controls provide solid accessibility foundation.
- Responsive coverage is broader than visual finish suggests.

### Primary visual problems

1. **Clay treatment is indiscriminate.** Late CSS overrides round and shadow header actions, search, hero images, categories, offer cards, filters, details, profiles, auth and account panels. Because almost everything is elevated, nothing feels specially tactile.
2. **Two visual systems coexist.** Earlier flat editorial CSS and later clay overrides conflict in source and intent. Geometry is decided by cascade rather than one art direction.
3. **Photography lacks a unified grade and subject strategy.** Current images communicate categories but mix product photography, screens and tools with inconsistent light, crop and perceived quality.
4. **Composition repeats.** Large serif heading plus pale canvas plus rounded white card appears across discovery, catalog, detail, profile and auth. Pages are consistent but insufficiently distinct.
5. **Operational text is too small.** Many labels, metadata, disclosures and navigation items use roughly 9.8-12.5px. Premium does not mean faint or tiny.
6. **Depth depends on shadows.** Borders, radii and shadows carry hierarchy that photography, scale, surface changes and spatial composition should carry.
7. **Identity mark is visually weak.** Logo renders very small relative to header scale; brand presence relies mostly on color and type.
8. **Header communicates conflicting states.** “Entrar”, “Minha conta” and “Criar conta” appear together. This weakens navigation polish and account-state clarity.
9. **Demonstration messaging conflicts with product behavior.** Global copy says no authentication or real operations, while authentication and profile writes exist. This is a product-content issue to resolve without changing business rules during redesign.
10. **Motion layer is underdeveloped.** Offer cards have hover motion, but `PageAnimations` currently renders no page-level behavior. Static quality should lead; eventual motion can add one deliberate entrance and clear state feedback.

### Guideline gaps to address during implementation

- Replace `transition: all` in filter and icon controls with explicit properties.
- Add form `autocomplete`, useful `spellCheck` and appropriate input metadata.
- Focus first invalid auth field after submit; currently errors are global for several validation failures.
- Add ellipsis punctuation to instructive placeholders where retained.
- Add `overscroll-behavior: contain` to mobile filter dialog.
- Ensure mobile menu state is announced; native `<details>` helps semantics, but summary label remains “Abrir navegação” while open.
- Raise compact UI typography to documented floors.
- Verify focused controls are never hidden under sticky header or future mobile action bar.
- Test long provider names, service titles, locations and translated/system-generated content.

## 5. Page Findings And Evolution

### Home

Current: strongest page. Hero is clear and visually balanced, but collage feels like three catalog cards beside copy rather than a singular brand moment. Lower sections return repeatedly to cards and two-column callouts.

Direction:

- Build one memorable editorial hero around human work, not three equally framed offer tiles.
- Keep search prominent and factual.
- Give categories distinct visual treatments: image crop, material object, open list or typographic chapter.
- Alternate dark curation, pale editorial and photographic chapters.
- Use tactile material on search and actions, not every media frame.

### Explorar

Current: overlaps Home through search, categories and featured offers. Dark hero distinguishes it, but purpose is not sufficiently different.

Direction:

- Make Explorar inspiration-led: needs, moods, life moments and curated collections.
- Use editorial image sequencing and varied proportions.
- Keep direct path to catalog for task-oriented comparison.
- Avoid repeating Home category grid unchanged.

### Offer catalog

Current: strongest functional page. Clear filters and comparable cards, but oversized editorial header consumes discovery space and filters/cards share same rounded clay recipe.

Direction:

- Preserve URL-backed filter behavior and comparison alignment.
- Reduce header height after initial entry; let result context dominate.
- Make filter panel compact, tactile and clearly separate from photographic cards.
- Use photography-forward offer cards with stronger provider hierarchy and larger metadata.
- Preserve aligned grid rather than masonry where comparison matters.

### Offer detail

Current: sound main/sticky rail structure. Hero image is a single utilitarian screenshot; title begins below fold at common desktop height. Provider appears as small secondary data.

Direction:

- Compose image story from result, process and provider context when sourced.
- Bring offer identity, title and essential facts into first coherent chapter.
- Make transaction rail the single foreground clay object.
- Expand provider preview into professional trust module.
- Keep price, location, availability and limitations explicit.

### Provider profile

Current: typographically confident navy hero but visually anonymous. Initials substitute for professional portrait/work. Large empty navy panel and sparse lower content make profile feel like a directory record.

Direction:

- Treat as portfolio/professional page: portrait or work image, discipline, location and trust signals.
- Add selected work rhythm before offer grid, using existing data only.
- Distinguish biography, skills and offers through composition rather than nested cards.
- Preserve demo/real profile distinction without visually downgrading real profiles.

### Client profile

Current: intentionally sparse identity and bio. It lacks enough visual differentiation from provider profile while serving a different trust/privacy need.

Direction:

- Use restrained trust-led identity, not portfolio treatment.
- Clarify public information scope and privacy.
- Avoid invented activity, reviews or request history.

### Login and signup

Current: polished split layout and coherent form. Oversized navy panel and large rounded white form create premium impression, but page feels more corporate campaign than focused access. Input metadata and error focus need improvement.

Direction:

- Retain Salon/Desk split and editorial serif.
- Reduce decorative empty area and strengthen task hierarchy.
- Use tactile form controls sparingly, with excellent keyboard/error behavior.
- Keep recovery and verification calmer than acquisition-oriented signup.

### Account

Current: functional panels, capability state and feedback. Repeated elevated cards make all facts equally important.

Direction:

- Establish account overview, profile completeness and capabilities as distinct levels.
- Use open rows for facts and reserve elevated panels for editable or high-impact actions.
- Preserve existing API and capability behavior exactly.

### Institutional pages

Current: shared editorial vocabulary and alternating photography. Layouts differ somewhat but still reuse serif headline, split image and list patterns.

Direction:

- `Como funciona`: mechanism-led sequence with one photographic chapter and one clear two-sided marketplace diagram made from content, not decoration.
- `Para clientes`: confidence and comparison story; emphasize what clients can inspect before contact.
- `Para prestadores`: portfolio-quality presentation story; show work and professional identity rather than generic creator imagery.
- Keep unsupported product capabilities explicitly future-facing.

## 6. Selected Awesome Design MD References

These are community analyses, not official brand design systems. Use patterns, never source code, imagery, copy or signature effects.

| Reference | Source | Lume takeaway | Avoid |
| --- | --- | --- | --- |
| Airbnb | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/airbnb/DESIGN.md> | Marketplace card facts, segmented search, sticky transaction summary, host trust | Coral identity, pill everywhere, literal layout clone |
| Apple | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/apple/DESIGN.md> | Photography as focal object, surface alternation, restrained chrome | Extreme minimalism that hides marketplace facts |
| Stripe | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/stripe/DESIGN.md> | Tabular data, controlled action color, tinted ambient shadows | Purple mesh and SaaS visual language |
| Notion | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/notion/DESIGN.md> | Distinct radius roles, borders before shadows, semantic quiet surfaces | Pastel rainbow and software-card appearance |
| Framer | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/framer/DESIGN.md> | Expressive scale, strong tracking discipline, occasional spotlight | Neon dark-only identity and extreme Portuguese tracking |
| Clay | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/clay/DESIGN.md> | Material volume from light and shape, expert-card structure | Mascots, claymation everywhere, childish saturation |
| Oura | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/oura/DESIGN.md> | Best atmospheric base: paper, editorial serif, portrait cards, visual worlds | Wellness mimicry and ultrathin small type |
| Pinterest | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/pinterest/DESIGN.md> | Varied image ratios for inspiration mode | Masonry in comparison/catalog tasks |
| Meta | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/meta/DESIGN.md> | Editorial versus transactional CTA, gallery plus sticky rail | Hardware e-commerce appearance |
| Runway | <https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/runwayml/DESIGN.md> | Cinematic imagery and asymmetric editorial composition | Invisible UI in transactional flows |

Reference synthesis: Oura and Clay define atmosphere/material; Airbnb and Meta define marketplace architecture; Apple and Runway define photographic restraint; Pinterest informs inspiration mode; Stripe, Notion and Framer refine data, geometry and type.

## 7. Proposed Concept

**Lume: Premium Editorial Marketplace with Tactile Claymorphism**

- Mineral-paper canvas and deep navy editorial worlds.
- Existing rose reserved for action and focus.
- Current serif/sans contrast evolved with stricter jobs and larger text floors.
- High-quality work/process/portrait photography with documented licensing.
- Varied section composition instead of repeating card grids.
- Clay depth reserved for buttons, compact selections and transaction objects.
- Profiles that feel like professional pages, not database records.
- Deliberate, interruptible microinteractions with complete reduced-motion behavior.

Full rules: [`DESIGN.md`](../../DESIGN.md).

## 8. Technical And Performance Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Large editorial photography | LCP, bandwidth and memory regression | Responsive `next/image` sizes, AVIF/WebP, strict source dimensions, mobile crops and image budgets |
| Multiple font files | Delayed text and layout shift | Two families maximum, four files maximum, subset/preload only critical weights, `font-display` strategy |
| Shadow/filter overuse | Paint cost on mobile | Flat default surfaces; no animated blur; profile paint in real devices |
| Motion libraries overlap | Larger client bundles and inconsistent behavior | One motion ownership model; CSS for basic feedback, library only for meaningful composition |
| Sticky rails and headers | Covered focus/content and mobile viewport bugs | Safe areas, `scroll-margin`, keyboard tests and non-obscuring mobile action pattern |
| Complex image compositions | Cropping failures and CLS | Fixed aspect ratios, per-breakpoint art direction and browser capture matrix |
| Global CSS cascade | Regressions from competing systems | Consolidate tokens and component layers incrementally; remove overrides only with route evidence |
| Auth/account coupling | Visual work accidentally changes behavior | Treat behavior as contract; route and integration tests before and after each visual slice |
| Unlicensed imagery | Legal/provenance risk | Source manifest required before asset acceptance; no unverified downloads |
| Visual richness vs accessibility | Low contrast, tiny metadata, motion overload | WCAG 2.2 AA checks, typography floors, reduced motion and keyboard review as acceptance gates |

## 9. Approval Questions

1. Approve three visual worlds: Gallery, Salon and Desk?
2. Approve restrained clay materiality concentrated on actions and foreground objects?
3. Approve photography-led hero rather than a grid of offer cards?
4. Approve keeping current serif/sans concept while evaluating exact font files later?
5. Approve rollout priority: foundations, Home/Explorar, catalog/cards, detail/profiles, auth/account, institutional?

Implementation remains blocked until explicit approval.
