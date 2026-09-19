# Architectural Overview — Airbnb Clone

This document details the system architecture, component breakdown, data flow, and interaction model for the **Airbnb Clone (Listing Page)** application.

![Architecture Diagram](architecture_diagram.jpg)

---

## 1. High-Level Architecture Diagram

```mermaid
graph TD
    User([User Browser]) --> AppRouter[Next.js 16 App Router]
    
    subgraph Routing & Entry
        AppRouter --> Layout[app/layout.tsx]
        Layout --> Page[app/page.tsx]
        Page --> MasterComp[components/listing/ListingPage.tsx]
    end

    subgraph Component Layer
        MasterComp --> Hero[HeroGrid.tsx]
        MasterComp --> Nav[StickySectionNav.tsx]
        MasterComp --> Widget[BookingWidget.tsx]
        MasterComp --> Details[Listing Details: Reviews, Amenities, HostProfile, HouseRules]
    end

    subgraph Overlays & Modals
        MasterComp --> PhotoTour[PhotoTourOverlay.tsx]
        PhotoTour --> Lightbox[LightboxOverlay.tsx]
        MasterComp --> Modals[AmenitiesModal, ReviewModal, ContactModal]
    end

    subgraph Custom Hooks
        PhotoTour & Lightbox & Modals --> ScrollLock[useScrollLock]
        PhotoTour & Lightbox & Modals --> FocusTrap[useFocusTrap]
        PhotoTour & Lightbox & Modals --> KeyNav[useKeyboardNav]
        Nav --> StickyHook[useStickySectionNav]
    end

    subgraph Data & Utilities
        MasterComp & Overlays --> MockData[(data/listing-data.ts)]
        Widget & Details --> DateUtils[lib/dates.ts]
        MasterComp --> FormatUtils[lib/format.ts]
    end
```

---

## 2. Component Hierarchy & Data Flow

1. **`app/page.tsx`**: Entry point rendering `<ListingPage />`.
2. **`ListingPage.tsx`**: State coordinator managing active overlays:
   - `isPhotoTourOpen`: Opens `<PhotoTourOverlay />`
   - `lightboxIndex`: Opens `<LightboxOverlay />`
   - `isAmenitiesModalOpen`, `isReviewsModalOpen`: Auxiliary modals.
3. **`BookingWidget.tsx`**: Sticky right-column card with inline calendar date range selection (`BookingDateRange`), guest counter stepper (`GuestStepperPopover`), and cost computation (`lib/dates.ts`).
4. **`StickySectionNav.tsx`**: Uses `IntersectionObserver` to highlight active section scroll targets (`#photos`, `#overview`, `#amenities`, `#reviews`, `#location`).

---

## 3. Technology Stack & Key Libraries

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion 13 (with `useReducedMotion()`)
- **Icons:** Lucide React (`lucide-react`)
