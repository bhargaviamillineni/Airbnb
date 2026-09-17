# Airbnb Listing Page Clone - Implementation Plan

## Task 1: Resolve Component Structure Gaps (Decomposition & Naming)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Rename/extract listing components to match spec contract: `ListingHeader` (from `ListingIntro`+`ListingTitleBar` or keep separate but export expected interface), `HostIntro` extract, `Highlights` rename from `HighlightCards`, `Calendar` rename from `AvailabilityCalendar`, `HouseRules` rename from `ThingsToKnow` or keep aligned with spec naming, `SimilarListings` rename from `NearbyStays`.
  - Decompose monolithic overlays into spec-required subcomponents: PhotoTour → PhotoTourOverlay + PhotoTourGrid + PhotoTourHeader + PhotoTourSection (with categorized section data model). Lightbox → LightboxOverlay + LightboxImage + LightboxNav + LightboxCounter. Decompose ReviewsSection → Reviews + ReviewCard + RatingBreakdown.
  - Add missing `/ui/Badge.tsx` primitive and export from index.
  - Align hook naming: rename `useBodyScrollLock` to `useScrollLock` for spec parity; add new `useStickyBookingWidget` hook (note: existing `useStickySectionNav` is separate, keep both).
  - Align data interface naming in listing-data.ts: add Photo alias and PricingBreakdown alias; keep ListingPhoto/Pricing for backward compatibility.
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `rule` TR-1.1: Every spec-required component file exists under the specified directory path with the exact file name (case-sensitive). Evidence: glob output for /components/listing/, /components/photo-tour/, /components/lightbox/, /components/ui/.
  - `rule` TR-1.2: No single component file exceeds 150 lines of source (excluding imports/types). Evidence: wc -l per file.
  - `rule` TR-1.3: tsc --noEmit and next lint pass exit 0 after rename/restructure. Evidence: terminal output.

## Task 2: Design Token Audit & Foundation Fixes
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Resolve inline hardcoded colors (e.g., `bg-[#1b4332]`) into CSS variables under `@theme` (e.g., `--color-host-avatar-bg`, `--color-cohost-*` tokens). Audit all components for magic-number classes: `mt-12`, `gap-x-12`, `px-6` and convert non-matching values to design tokens with `--spacing-*` exact measured values.
  - Add missing `line-clamp` utility if Tailwind default does not match (verify measurement when WAF unblocks).
  - Verify `--layout-max-width`, `--size-hero-height`, `--layout-sidebar-width`, `--layout-main-gap`, `--size-map-height`, `--size-sleep-card`, `--size-sleep-image`, radii, and font-size tokens once user provides measured values.
  - Add Badge design token variables if required by Badge primitive.
  - Add `useStickyBookingWidget` hook: separate from `useStickySectionNav` — it should track position where booking sidebar sticks (below header + nav), using scroll listener or IntersectionObserver sentinel.
- **Acceptance Criteria Addressed**: AC-9, AC-7
- **Test Requirements**:
  - `rule` TR-2.1: Zero occurrences of `bg-[#...]`, `text-[#...]`, `mt-[Npx]` magic utility classes in components (excluding genuinely dynamic style values like computed transforms). Evidence: grep output.
  - `rule` TR-2.2: Every inline value maps to a `--token` in globals.css `@theme`. Evidence: token coverage audit against component usage.
  - `rule` TR-2.3: `useStickyBookingWidget` hook exported from `hooks/` directory. Evidence: glob + hook file exists.
  - `rule` TR-2.4: tsc --noEmit and next lint pass. Evidence: terminal output.

## Task 3: Phase 2 - Full Static Listing Page with Realistic Mock Data
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**:
  - Enrich `listing-data.ts`: expand description to original-paragraph length (no emojis in descriptionOriginal; emoji variant allowed), add 43+ realistic ListingPhoto entries with meaningful alt text and categorized section attribution (e.g., "Living room", "Bedroom", "Kitchen", "Bathroom") for Photo Tour sections.
  - Expand reviews: ensure realistic, non-verbatim, varied-length reviews (~15-20 entries, ~40% truncated at 180 chars) with diverse author names/tenures, proper date formatting.
  - Expand rating breakdown: fill distribution bars (not just level 5 full) to match a realistic 4.95-rated listing (e.g., 17 five-star, 2 four-star out of 19).
  - Expand amenities: populate realistic set of ~50 total (currently shows only 10); mark unavailable ones as strikethrough.
  - Expand policies/house rules: add more items per section.
  - Expand nearby stays carousel: ensure 8+ entries with varied titles/prices/ratings.
  - Co-hosts: verify avatar tokens match the host avatar bg pattern already in use.
  - Photo Tour data: add categorized sections to ListingPhoto or a separate photoSections model (required by PhotoTourSection component).
- **Acceptance Criteria Addressed**: AC-2, AC-9
- **Test Requirements**:
  - `rule` TR-3.1: Every listing section renders non-empty content. Evidence: listing page screenshot + snapshot.
  - `rule` TR-3.2: Zero "Lorem ipsum" or placeholder strings in rendered content. Evidence: grep for placeholder text.
  - `rule` TR-3.3: `listingData.photos.length >= 43`, `listingData.reviews.length >= 15`, `listingData.amenities.length >= 40` (shown) + `totalAmenities >= 50`, `nearbyStays.length >= 8`. Evidence: inline assertion.
  - `rule` TR-3.4: Photo sections model exists with at least 4 categorized sections (e.g., Living room, Bedroom, Bathroom, Kitchen/Outdoor). Evidence: data structure contains categories.
  - `rule` TR-3.5: tsc --noEmit and next lint pass. Evidence: terminal output.

## Task 4: Phase 3 - Listing Page Interactivity
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - Save/heart toggle: implement fill + scale animation in ListingTitleBar using measured animation values (currently 0.18s [0.2,0,0,1]; verify exact). Add bounce micro-interaction on fill.
  - Calendar date selection: fix range rendering, ensure hover states match Airbnb (hover preview of range before second click), clear dates functional.
  - Description "Show more/less": line-clamp truncation, original/translation toggle functional.
  - "Show all photos" trigger: on HeroGrid bottom-right button click, pass initial index to PhotoTourOverlay.
  - Sticky booking widget: integrate `useStickyBookingWidget`; ensure widget becomes position:fixed or sticky at correct offset when scrolling; sync with StickySectionNav offset to prevent overlap.
  - Guest stepper in BookingWidget: +/- already wired, verify max constraint and UI state.
  - ReviewCard "Show more/less" toggle per review.
  - NearbyStays carousel: pagination already in place, verify state.
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `rule` TR-4.1: Heart toggles fill on click, returns to outline on second click; aria-pressed reflects state; animation plays. Evidence: interaction transcript.
  - `rule` TR-4.2: Calendar: clicking day sets start, clicking later day sets end, clicking earlier day resets start; nights counter & price update correctly; clear resets. Evidence: interaction transcript.
  - `rule` TR-4.3: Description truncates to 4 lines when collapsed, expands fully; show original/translation toggles content source. Evidence: DOM snapshot both states.
  - `rule` TR-4.4: Booking widget remains visible and pinned when scrolling page sections past header. Evidence: scroll sequence screenshot.
  - `rule` TR-4.5: Console clean after each interaction sequence (no React warnings, no event-listener leaks). Evidence: console snapshot.
  - `rule` TR-4.6: tsc --noEmit and next lint pass. Evidence: terminal output.

## Task 5: Phase 4 - Photo Tour Overlay
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4
- **Description**:
  - Implement PhotoTourHeader with: close button, title ("Photo tour"), photo counter summary.
  - Implement PhotoTourSection with categorized section headings (e.g., Living room, Bedroom, Bathroom, Kitchen/Outdoor) and sticky mini-nav/thumbnail strip across top (anchor-nav to section).
  - Implement PhotoTourGrid with per-category responsive grid (first image hero tile like HeroGrid).
  - Integrate open/close transition using measured overlay values (currently 0.4s cubic-bezier(0.2,0,0,1) y:32 → 0; verify exact measurement when WAF unblocks).
  - Scroll lock active while open, focus trap active unless Lightbox is open inside it (already wired `trapEnabled`).
  - Clicking a photo tile passes index to LightboxOverlay (already wired, verify flow).
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `rule` TR-5.1: Overlay opens from "Show all photos" button and from any hero tile with open animation; closes from X button, Escape key, and focus returns to trigger on close. Evidence: interaction transcript.
  - `rule` TR-5.2: Categorized section nav visible and sticky; clicking nav scrolls to section. Evidence: screenshot open state.
  - `rule` TR-5.3: Body scroll locked while overlay open (scrollY unchanged after attempt); unlocked on close. Evidence: scroll state diff.
  - `rule` TR-5.4: tsc --noEmit and next lint pass. Evidence: terminal output.
  - `rubric` TR-5.5: Animation dimension — overlay open/close timing and easing match reference-measured values (±20ms); scale 1=defaults used, 3=close but not open or vice versa, 5=both match. Threshold >= 4. Evidence: transition props audit.

## Task 6: Phase 5 - Lightbox Full Implementation
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 5
- **Description**:
  - Extract LightboxNav (prev/next arrows) and LightboxCounter (X of Y) and LightboxImage (AnimatePresence image wrapper) as separate components per spec.
  - Implement directional slide transitions with measured distance (currently 72px at 0.28s cubic-bezier(0.2,0,0,1); verify exact).
  - Arrow-key navigation: ArrowLeft/ArrowRight move prev/next, wrapping around.
  - Escape closes, focus trap active, focus returns to exact trigger (track trigger ref in ListingPage).
  - Respect prefers-reduced-motion: no translate, opacity-only at 0.01ms equivalent.
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-6.1: 20 sequential arrow-key presses cycle correctly through all photos, direction of slide matches arrow direction (left = previous slides left-wards, new image enters right; verify). Evidence: interaction transcript.
  - `rule` TR-6.2: Escape from Lightbox closes overlay then focus returns to element that opened it (hero tile or PhotoTour tile). Evidence: activeElement log after close.
  - `rule` TR-6.3: Tab cycle does not escape overlay (trapped between close/X, prev, next, or close only). Evidence: 10x Tab sequence transcript.
  - `rule` TR-6.4: prefers-reduced-motion enabled → image navigation has no translateX, only opacity transition. Evidence: media-query test with evaluate_script faking reduced-motion.
  - `rule` TR-6.5: tsc --noEmit and next lint pass. Evidence: terminal output.
  - `rubric` TR-6.6: Lightbox slide animation match — duration ±20ms, easing same cubic-bezier, slide distance ±10px, slide direction correct. Threshold >= 4. Evidence: transition props audit vs measured.

## Task 7: Phase 6 - Accessibility Pass
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6
- **Description**:
  - Tab-order audit across listing page from top to every interactive element (header nav actions, hero tiles, save/share, description expand, amenities expand, calendar nav arrows + days, guest stepper +/- , reserve button, review chips, nearby pagination, footer).
  - Focus-visible ring: ensure globals.css `:focus-visible` rule never overridden; audit components for any `outline-none` usage (forbidden without equivalent replacement).
  - ARIA: every dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby` or `aria-label`); every icon-only button has descriptive `aria-label`; calendar buttons have aria-label/aria-pressed; heart/save has `aria-pressed`.
  - Alt text: all hero photos, sleeping arrangements, nearby stays, listing photos have descriptive alt (not filename or "photo 1"); decorative imagery has aria-hidden or empty alt.
  - Trigger-focus-return: PhotoTour and Lightbox must focus the exact triggering button on unmount (not just container). Wire `returnFocusRef` through `useFocusTrap` in both overlays.
  - Keyboard in overlays: Space/Enter activate buttons (default behavior); Escape closes topmost overlay first (Lightbox → PhotoTour → page).
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `rule` TR-7.1: Full keyboard walkthrough listing → Booking → Reviews → Host → Things → Nearby → PhotoTour open → Lightbox open → Close Lightbox → Close PhotoTour without mouse; every action reachable and functional. Evidence: step-by-step transcript.
  - `rule` TR-7.2: No `outline-none` without an equivalent custom focus style in any component file. Evidence: grep + per-file audit.
  - `rule` TR-7.3: All dialog elements have role=dialog + aria-modal=true and either aria-labelledby pointing to heading or aria-label. Evidence: DOM snapshot of open overlays.
  - `rule` TR-7.4: Every `<Image>` / `<img>` has non-empty descriptive alt (exclude aria-hidden decorative). Evidence: grep for alt strings.
  - `rule` TR-7.5: tsc --noEmit and next lint pass. Evidence: terminal output.

## Task 8: Phase 7 - Final Polish & Side-by-Side Fix
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 7, and user-provided measurements/screenshots
- **Description**:
  - Await user-provided 1440px screenshots of reference (listing page, PhotoTour open, Lightbox open) and measured token/animation values.
  - Update all [VERIFY] tokens in globals.css with exact measured pixel/hex values; round Tailwind spacing default approximations to measured exact values via custom `--spacing-*` tokens.
  - Update animation durations/easings across HeroGrid hover, heart toggle, PhotoTour open/close, Lightbox open/close, Lightbox slide, and all button hovers to measured exact values.
  - Produce discrepancy list of every spacing/color/font/radius mismatch found in side-by-side comparison; fix each discrepancy.
  - Final full build: `npm run build` succeeds; final type-check + lint; runtime console clean pass with overlays open/closed.
- **Acceptance Criteria Addressed**: AC-1, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-8.1: `npm run build` exits 0; `.next` build output present. Evidence: build command output.
  - `rule` TR-8.2: tsc --noEmit 0 errors, next lint 0 warnings/errors. Evidence: terminal output.
  - `rule` TR-8.3: Discrepancy list created with >= 1 item, each item either fixed or marked as user-approved acceptance. Evidence: discrepancy markdown file attached.
  - `rubric` TR-8.4: Side-by-side screenshot match. Threshold >= 4. Evidence: before/after screenshot pairs with annotations.
  - `rubric` TR-8.5: Animation match. Threshold >= 4. Evidence: animation value comparison table vs measured.
