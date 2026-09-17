"use client";

import { useEffect, useState } from "react";

export interface UseStickyBookingWidgetOptions {
  /**
   * Distance (in pixels) from the top of the viewport at which the booking
   * widget should become sticky. Defaults to the combined height of the site
   * header plus the sticky section nav.
   */
  stickyTopOffset?: number;
  /** Sentinel selector for an IntersectionObserver-based fallback. */
  sentinelId?: string;
}

export interface UseStickyBookingWidgetResult {
  isSticky: boolean;
  stickyTop: number;
}

const DEFAULT_TOP = 80;

/**
 * Drives the sticky behaviour of the right-side booking widget.
 *
 * The widget starts inline with the page content. Once the user scrolls past
 * `stickyTopOffset` (roughly header + sticky section nav height) it becomes
 * fixed-position relative to the viewport, so that the reservation CTA stays
 * in view while the user reads the listing. Scrolling back above that line
 * returns the widget to in-flow layout.
 */
export function useStickyBookingWidget({
  stickyTopOffset,
  sentinelId,
}: UseStickyBookingWidgetOptions = {}): UseStickyBookingWidgetResult {
  const stickyTop = stickyTopOffset ?? DEFAULT_TOP;
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let cancelled = false;
    const update = () => {
      if (cancelled) return;
      setIsSticky(window.scrollY > stickyTop);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    if (sentinelId) {
      const sentinel = document.getElementById(sentinelId);
      if (sentinel && typeof IntersectionObserver !== "undefined") {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (cancelled) return;
              setIsSticky(!entry.isIntersecting);
            }
          },
          { threshold: 0 },
        );
        observer.observe(sentinel);
        return () => {
          cancelled = true;
          observer.disconnect();
          window.removeEventListener("scroll", update);
          window.removeEventListener("resize", update);
        };
      }
    }

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [stickyTop, sentinelId]);

  return { isSticky, stickyTop };
}
