# Premium Editorial Experience Specification

## Purpose

Define verifiable requirements for future Lume visual redesign while preserving product behavior.

## ADDED Requirements

### Requirement: Incremental Visual Foundation

Increment 09.1 SHALL be limited to semantic tokens, shared presentation rules and regression validation without redesigning page composition or changing product contracts.

#### Scenario: Foundation completion review

- **Given** the Increment 09.1 candidate
- **When** validation is recorded
- **Then** implemented foundation changes and generated captures are identified
- **And** failed or blocked audits remain explicitly incomplete
- **And** page-level redesign tasks remain pending for Increment 09.2

### Requirement: Approval-Gated Implementation

The redesign SHALL remain documentary until stakeholder explicitly approves visual direction.

#### Scenario: Planning review

- **Given** this OpenSpec change is proposed
- **When** no explicit approval has been recorded
- **Then** no application interface implementation begins
- **And** no production dependency is added

### Requirement: Preserved Product Contracts

The redesign SHALL preserve business rules, routes, query behavior, APIs, authentication, authorization, schema, migrations and fixtures.

#### Scenario: Catalog filters after redesign

- **Given** user applies search, category, mode, price, availability or sort filters
- **When** result view updates
- **Then** URL continues to represent active state
- **And** existing filter semantics remain unchanged

#### Scenario: Auth and account after redesign

- **Given** user signs in, creates account, resets password, verifies email or updates profile/capabilities
- **When** redesigned interface submits operation
- **Then** existing API and security behavior remain unchanged
- **And** redesign adds no simulated success for failed or unavailable operations

### Requirement: Recognizable Lume Identity

The experience SHALL preserve brand anchors `#111B40`, `#27345D`, `#C91A6E`, `#EC2184`, `#FFFFFF` and `#AAB3CA` with documented semantic roles.

#### Scenario: Brand review

- **Given** representative Home, Catalog, Offer Detail, Profile and Auth captures
- **When** visual system is reviewed
- **Then** navy remains primary identity/ink color
- **And** rose remains primary action/accent color
- **And** page families are recognizable as one Lume product
- **And** rose is not used as uncontrolled decoration

### Requirement: Three Visual Worlds

The redesign SHALL use Gallery, Salon and Desk worlds to distinguish editorial discovery, trust/curation and transactional work.

#### Scenario: Cross-page comparison

- **Given** Home, Catalog and Login pages
- **When** compared side by side
- **Then** each serves a distinct composition and surface role
- **And** typography, color, spacing and interaction still form one system
- **And** pages do not rely on identical rounded white card layouts

### Requirement: Restrained Claymorphism

Tactile clay depth SHALL mark interactive or foreground objects rather than every container.

#### Scenario: Viewport hierarchy

- **Given** any 1440x900 or 390x844 viewport capture
- **When** elevated surfaces are counted visually
- **Then** one foreground object dominates at most
- **And** content sections remain primarily flat, photographic or openly structured
- **And** active/pressed controls provide visible tactile feedback

#### Scenario: Contrast and focus

- **Given** tactile control at rest, hover, active and keyboard focus
- **When** states are tested
- **Then** label and boundary contrast meet WCAG 2.2 AA requirements
- **And** focus ring is visible independently of shadow

### Requirement: Editorial Typography

The redesign SHALL retain display-serif and functional-sans role separation with no more than two families and four font files.

#### Scenario: Typography floor

- **Given** navigation, card metadata, filters, disclosures and body copy
- **When** computed sizes are inspected
- **Then** metadata/labels are at least 13px
- **And** primary reading and entered form text are at least 16px
- **And** headings remain legible without clipping at all target widths

#### Scenario: Long Portuguese content

- **Given** long provider names, offer titles and locations
- **When** rendered at 320px and 390px
- **Then** text wraps without horizontal overflow
- **And** meaning is not hidden by ellipsis in primary content

### Requirement: Photography-Led Art Direction

Relevant pages SHALL prioritize verified photography of finished work, providers at work, process, environment and portrait over decorative icons or generic imagery.

#### Scenario: Asset acceptance

- **Given** a proposed production image
- **When** it is added to Lume
- **Then** source URL/owner, license, original dimensions, intended role, crop requirements and alt intent are documented
- **And** unknown-origin images are rejected

#### Scenario: Responsive crop

- **Given** a prominent image used on desktop and mobile
- **When** page renders at 1440x900 and 390x844
- **Then** focal subject remains visible
- **And** image does not cause layout shift
- **And** text contrast is not dependent on an unverified crop

### Requirement: Marketplace Clarity

Editorial treatment SHALL NOT hide core marketplace facts.

#### Scenario: Offer card comparison

- **Given** catalog result card
- **When** user scans results
- **Then** service title, provider identity, location or mode, rating when available and price remain visible
- **And** cards align sufficiently for comparison

#### Scenario: Offer detail decision

- **Given** offer detail first meaningful chapter
- **When** user reviews it
- **Then** offer identity, service imagery, price, location, availability and provider path are discoverable without decorative interaction

### Requirement: Professional Public Profiles

Provider profiles SHALL read as professional pages rather than sparse directory records, using only verified existing data and assets.

#### Scenario: Provider profile

- **Given** provider with portrait or work imagery
- **When** public profile renders
- **Then** imagery, discipline, location, trust facts, biography and offers have deliberate hierarchy
- **And** initials are not used as only prominent visual when verified imagery exists

#### Scenario: Client profile privacy

- **Given** public client profile
- **When** rendered
- **Then** it communicates available identity and bio clearly
- **And** does not invent activity, requests, reviews or trust claims

### Requirement: Accessible Interaction

Future implementation SHALL target WCAG 2.2 AA and support keyboard, assistive technology, reduced motion and browser zoom.

#### Scenario: Keyboard navigation

- **Given** any route family
- **When** user navigates with keyboard only
- **Then** skip link appears first
- **And** every interactive control receives visible focus
- **And** sticky surfaces do not obscure focused control
- **And** dialog focus returns to trigger after close

#### Scenario: Form errors

- **Given** invalid auth or account submission
- **When** validation completes
- **Then** each actionable error identifies correction
- **And** first invalid field receives focus
- **And** status updates are announced appropriately

#### Scenario: Reduced motion

- **Given** `prefers-reduced-motion: reduce`
- **When** page loads and user interacts
- **Then** decorative entrances, zooms and lifts are removed
- **And** no content remains hidden
- **And** state changes remain understandable

### Requirement: Responsive Composition

Every target route SHALL be validated at 1440x900, 1024x768, 820x1180, 768x1024, 390x844 and 320x700.

#### Scenario: No overflow

- **Given** target viewport
- **When** complete page and interactive states render
- **Then** no unintended horizontal overflow occurs
- **And** controls and text remain usable

#### Scenario: Mobile reading order

- **Given** split editorial composition
- **When** rendered at 390px
- **Then** explanatory text precedes associated media unless a documented exception improves meaning
- **And** primary action is reachable without covering content

### Requirement: Deliberate Motion

Motion SHALL communicate entrance, navigation or state without delaying use.

#### Scenario: Interaction feedback

- **Given** linked card, photograph or button
- **When** pointer or press interaction occurs
- **Then** response is immediate and interruptible
- **And** transforms stay within approved limits
- **And** animation uses transform/opacity rather than layout properties

#### Scenario: Long motion

- **Given** any autoplay motion lasting more than 5 seconds
- **When** presented beside content
- **Then** pause/stop control is available
- **Or** motion is removed

### Requirement: Performance Discipline

Visual richness SHALL stay within approved route-level performance budgets.

#### Scenario: Image delivery

- **Given** redesigned route with editorial photography
- **When** loaded on desktop and mobile
- **Then** hero image uses explicit dimensions and responsive sources
- **And** below-fold images lazy-load
- **And** no source substantially exceeds displayed need

#### Scenario: Visual effects

- **Given** tactile surfaces and transitions
- **When** profiled on representative mobile hardware
- **Then** no continuous animated blur or large animated shadow causes sustained paint cost
- **And** decorative WebGL is absent

### Requirement: Complete-Page Finish Gate

Approval SHALL use complete pages and interactions, not isolated components alone.

#### Scenario: Final review

- **Given** implementation candidate
- **When** finish review runs
- **Then** all route families have desktop, tablet and mobile captures
- **And** keyboard, focus, reduced motion, long content, empty/loading/error states and performance are reviewed
- **And** all production images have verified provenance
- **And** existing typecheck, lint, build, audits and tests pass
