# Airbnb Clone — Listing Page

A pixel-faithful, desktop-only reproduction of a single Airbnb listing page, built to exercise a complete end-to-end frontend build pipeline. No backend, no API calls, no user accounts — just static mock data, carefully tuned layout, and rich interaction flows (Photo Tour, Lightbox, Booking widget, Sticky section nav).

**Scope:** Single listing detail page (`/`) — desktop-only by design (viewport widths 1280px and up). Not a full site, no search or browse flows.

## Tech Stack

- **Framework:** Next.js 16 (App Router) — static prerender via `output` defaults
- **Language:** TypeScript (strict-ish; builds pass `tsc --noEmit` with zero errors)
- **Styling:** Tailwind CSS 4 + PostCSS, with a light custom design-token layer in `globals.css` (colors, spacing, radii, duration tokens)
- **Animations:** Framer Motion 13, with `useReducedMotion()` fallbacks wired on every motion transition
- **Icons:** lucide-react (tree-shakeable, consistent stroke weight)
- **Bundler / Dev Server:** Next.js Turbopack

## Interaction Flows (all implemented)

1. **HeroGrid → Photo Tour overlay** — opens a scrollable, two-column per-section photo view with a sticky compact header (fades in once you scroll past the initial thumbnail grid) and per-section sticky titles
2. **Photo Tour → Lightbox** — click any photo to open a fullscreen image viewer with counter, prev/next, keyboard nav (Esc / ← / →), and reduced-motion fallbacks
3. **StickySectionNav** — on the listing page, a nav bar pins below the site header once you scroll past the HeroGrid; clicking a section scrolls to it with a smooth offset
4. **Booking widget** — date-range calendar picker, guest stepper (adults/children/infants), sticky pin on the right rail aligned with the nav bar
5. **Reviews, Amenities, Sleeping arrangements, Highlights, Host profile, House rules, Map, Similar listings** — all rendered with complete realistic mock data

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (Turbopack, watch mode)
npm run dev
# -> open http://localhost:3000

# 3. Type-check, lint, and build for production
npm run type-check   # tsc --noEmit
npm run lint         # eslint .
npm run build        # next build (static prerender)
npm run start        # serve the production build locally
```

## Desktop-only by Design

This project intentionally targets desktop widths ≥ 1280px. No mobile breakpoints, no responsive collapse below that threshold, no hamburger menu for the site header. The layout is tuned for 1280 / 1440 / 1920.
