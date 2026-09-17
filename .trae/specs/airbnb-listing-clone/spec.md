# Airbnb Listing Page Clone - Product Requirements Document

## Overview
- **Summary**: Build a pixel-perfect, production-quality clone of a real Airbnb listing page for a take-home technical assessment. Desktop only (>= 1280px, design for 1440px).
- **Purpose**: Deliver a senior-engineer-grade frontend implementation demonstrating layout fidelity, animation precision, accessibility, and architecture discipline through three views: Listing Page, Photo Tour overlay, and Lightbox.
- **Target Users**: Technical assessors evaluating frontend engineering, visual fidelity, TypeScript rigour, accessibility, and animation craft.

## Goals
- Achieve visual indistinguishability from the reference site at 1440px viewport (phase 7 side-by-side pass).
- Deliver zero console errors, zero TypeScript errors, zero lint errors across all user states.
- Implement Framer Motion animations matching reference-measured durations and easings, with `prefers-reduced-motion` fallbacks.
- Full keyboard accessibility, focus management, focus traps, ARIA roles, and visible focus indicators.
- 100% original markup, logic, and wording; only measured numeric values (spacing, colors, durations) used as design facts.

## Non-Goals
- Mobile responsive layouts. Desktop fixed/adaptive only.
- Backend persistence, real booking, or network calls. React state only.
- Real map SDK integration; static placeholder acceptable.
- User authentication, accounts, or multi-page routing.
- Copying DOM structure, variable names, text content, or image URLs from the reference site.

## Background & Context
- Phase 1 skeleton (Next.js 16 App Router + TypeScript strict + Tailwind v4 + Framer Motion 13 + lucide-react) is already in place under `app/`, `components/`, `data/`, `hooks/`, `lib/`, `styles/`.
- Existing skeleton passes `tsc --noEmit` and `next lint` cleanly as of the audit baseline.
- Reference site: `https://airbnb-clone-umber-two.vercel.app` — Vercel WAF blocks automated MCP browser access from this environment (confirmed with both Chrome DevTools MCP and integrated_browser MCP, returning "This page could not be verified"). User will provide screenshots/manual measurements for token/animation [VERIFY] values in Phase 7.
- Tailwind v4 design tokens defined via `@theme` in [globals.css](file:///C:/Users/bharg/Desktop/Airbnb/styles/globals.css) currently include [VERIFY] placeholders that need final measured-value confirmation.
- Original photo assets will be provided locally (Unsplash hotlinks in `listing-data.ts` are interim placeholders per the originality constraint).

## Functional Requirements
- **FR-1 Listing Page**: Render every section present on the reference listing page (hero grid, title, host intro, guest-favourite badge, highlights, description show-more, sleeping arrangements, amenities, availability calendar, sticky booking widget, reviews with rating breakdown, map, host profile + co-hosts, house rules / things-to-know, similar listings carousel).
- **FR-2 Photo Tour**: Full-screen overlay opened via "Show all photos" or hero image click, with categorized room sections (e.g., Living room, Bedroom) and a sticky mini-nav/thumbnail strip header.
- **FR-3 Lightbox**: Single-photo viewer launched from any gallery image, supporting prev/next arrows, left/right arrow-key navigation, photo counter, and directional slide transitions.
- **FR-4 Listing Interactivity**: Save/heart toggle with fill+scale animation, calendar date range selection, description show-more/less, "Show all photos" trigger, sticky booking widget scroll behavior.
- **FR-5 Photo Tour Interactivity**: Categorized section navigation, click-through to lightbox, open/close transitions matching measured values.
- **FR-6 Lightbox Interactivity**: Arrow-key navigation, Escape to close, focus trap while open, focus return to trigger, slide transitions matching measured direction/distance.

## Non-Functional Requirements
- **NFR-1 TypeScript Strict**: No `any`, no unused imports/variables, passes `tsc --noEmit`.
- **NFR-2 Lint**: Passes `next lint` (eslint-config-next) with no warnings.
- **NFR-3 Console Clean**: Zero console errors or warnings in any state (initial load, overlays open/closed, keyboard nav).
- **NFR-4 Architecture**: Single-responsibility components (<= ~150 LOC each), shared `/ui` primitives for every repeated pattern, zero duplicated markup. Tailwind design tokens (CSS variables via `@theme`) — no magic numbers in class names.
- **NFR-5 Accessibility**: Logical tab order, focus traps in overlays, Escape closes, focus returns to trigger, ARIA dialog roles/labels, visible custom `:focus-visible` indicators, alt text, `prefers-reduced-motion` fallbacks.
- **NFR-6 Animation**: Framer Motion, AnimatePresence for exit animations, durations/easings based on measured values, never defaulted to generic values.
- **NFR-7 Originality**: 100% original markup, component structure, logic, and paraphrased copy; no DevTools copy-element, no hotlinked reference-site images, no reference variable names or data-testid strings.

## Constraints
- **Technical**: Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 (CSS variables via `@theme`), Framer Motion 13, lucide-react. React state only; no backend, no new libraries without user approval.
- **Business**: Submitted code must pass automated plagiarism checks against the reference codebase. No copied code, DOM structure, images, or verbatim copy.
- **Dependencies**: All dependencies already listed in `package.json` must be used as-is; no new dependencies unless explicitly authorized.
- **Environment**: Vercel WAF on the reference site blocks programmatic MCP browser access from this sandbox. Measurements flagged [VERIFY] will be completed via user-provided screenshots/manual values prior to Phase 7.

## Assumptions
- Phase 1 skeleton is the base — no re-scaffolding of Next/TS/Tailwind/Framer/lucide setup.
- User will provide local image assets or explicit placeholder approval for Unsplash interim URLs.
- User will provide measured design values for the [VERIFY] token/animation flags where reference-site WAF access remains blocked.
- Desktop viewport >= 1280px, primary target 1440px.

## Acceptance Criteria

### AC-1: TypeScript & Lint Clean
- **Type**: `rule`
- **Given**: The repository at the end of any phase
- **When**: `npm run type-check` and `npm run lint` are executed
- **Then**: Both commands exit with code 0 and no output
- **Pass Condition**: tsc --noEmit exit 0 AND next lint exit 0, combined stdout/stderr empty of diagnostics
- **Evidence**: Terminal command output recorded after each phase

### AC-2: Listing Page Section Coverage
- **Type**: `rule`
- **Given**: Desktop 1440px viewport
- **When**: The listing page is rendered
- **Then**: Every section from the reference page is present: Navbar, HeroGrid, ListingHeader/title+location, GuestFavoriteBadge, HostIntro, Highlights, Description (Show more truncation), SleepingArrangements, Amenities, Calendar, BookingWidget (sticky), Reviews (cards + rating breakdown), MapSection, HostProfile (with co-hosts), HouseRules/ThingsToKnow, SimilarListings carousel
- **Pass Condition**: DOM contains one instance of each required section with non-empty content (realistic mock data, no lorem ipsum)
- **Evidence**: `take_snapshot` output, full-page screenshot, visual inspection

### AC-3: Listing Interactivity Functional
- **Type**: `rule`
- **Given**: Listing page loaded
- **When**: User clicks heart icon, selects calendar date range, toggles description Show more/less, clicks "Show all photos", scrolls past hero
- **Then**: Heart toggles fill state + scale animation; calendar updates selection, nights, pricing total; description expands/collapses; Photo Tour opens; booking widget sticks at correct scroll offset
- **Pass Condition**: Each interaction mutates state correctly, DOM updates, console clean
- **Evidence**: Interaction log and console snapshot after each interaction

### AC-4: Photo Tour Overlay
- **Type**: `rule`
- **Given**: Listing page loaded
- **When**: "Show all photos" or a hero tile is clicked
- **Then**: Photo Tour overlay mounts with fade/translate open transition (measured values), header with close button, sticky categorized sections and thumbnail strip, clicking a photo opens Lightbox at that index
- **Pass Condition**: Overlay opens, categorized nav present, Escape closes, background scroll locked, focus trapped while Lightbox not open, focus returns to trigger
- **Evidence**: Screenshot of open overlay, keyboard interaction transcript

### AC-5: Lightbox Overlay
- **Type**: `rule`
- **Given**: Photo Tour or hero tile clicked, Lightbox open
- **When**: Left/Right arrows (keys or UI buttons) pressed, Escape pressed, tab key cycled
- **Then**: Images slide directionally by measured distance, counter updates, Escape closes, focus trapped while open, focus returns to trigger, console clean
- **Pass Condition**: All navigation actions work, slide direction matches click/key, reduced-motion disables translate
- **Evidence**: Interaction transcript, reduced-motion media-query test

### AC-6: Accessibility Pass
- **Type**: `rule`
- **Given**: Any of the three views
- **When**: Full keyboard walkthrough performed
- **Then**: Logical tab order, every interactive element focusable, visible `:focus-visible` ring on every focusable, dialogs have `role="dialog"` + `aria-modal`, icon-only buttons have `aria-label`, images have descriptive alt, focus returns post-close
- **Pass Condition**: Manual keyboard walkthrough checklist complete; no trap without Escape, no missing ARIA on dialogs
- **Evidence**: Keyboard navigation transcript and axe/core snapshot

### AC-7: Visual Fidelity (Phase 7)
- **Type**: `rubric`
- **Dimension**: Side-by-side visual match against user-provided reference screenshots
- **Scale**: 1-5
- **Anchors**: 1 = layout/colors clearly off (>5 discrepancies); 3 = noticeable differences (3-5 spacing/color/font mismatches); 5 = indistinguishable (<= 1 minor discrepancy that does not break layout)
- **Pass Threshold**: >= 4
- **Evidence**: Side-by-side screenshot diff, discrepancy list with fixes applied

### AC-8: Animation Fidelity
- **Type**: `rubric`
- **Dimension**: Animation duration, easing, direction, and distance match measured reference values
- **Scale**: 1-5
- **Anchors**: 1 = generic defaults used everywhere with no measurement; 3 = most animations have approximately correct values (±100ms, wrong easing on <= 2); 5 = every animation uses reference-measured duration (±20ms), exact cubic-bezier, correct direction and distance; reduced-motion fallback verified
- **Pass Threshold**: >= 4
- **Evidence**: Animation measurement log from reference, Framer Motion transition props, reduced-motion test

### AC-9: Architecture & Code Quality
- **Type**: `rubric`
- **Dimension**: Component decomposition, single-responsibility, shared UI primitives, design-token usage (no magic numbers), TypeScript rigour
- **Scale**: 1-5
- **Anchors**: 1 = monolithic files (>300 LOC), duplicated markup, inline styles, any usage; 3 = some decomposition, occasional magic numbers, minor unused imports; 5 = every component <= ~150 LOC, zero duplicated markup (all patterns in /ui), all values via tokens, strict TS zero any, zero unused
- **Pass Threshold**: >= 4
- **Evidence**: LOC counts per file, grep for magic-number classes, tsc --noEmit output

## Open Questions
- [ ] Can user provide 1440px full-page screenshots of the reference (listing, Photo Tour open, Lightbox open) to unblock [VERIFY] tokens during Phase 7?
- [ ] Can user share specific measured durations/easings for hero hover, heart toggle, overlay open/close, lightbox slide, and button transitions?
- [ ] Are local image assets ready, or should we keep Unsplash placeholders with the user's placeholder approval?
- [ ] Does `useScrollLock` rename (`useBodyScrollLock` → `useScrollLock`) and the `useStickyBookingWidget` addition need to happen before or during Phase 3?
