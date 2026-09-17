"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  enabled: boolean;
  /** Element to return focus to when trap is deactivated */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Traps keyboard focus within a container while an overlay is open.
 * On deactivation, returns focus to whichever element had it before the trap activated.
 */
export function useFocusTrap<T extends HTMLElement>(
  options: UseFocusTrapOptions,
): React.RefObject<T | null> {
  const containerRef = useRef<T>(null);
  const { enabled, returnFocusRef } = options;

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const returnFocusElement = returnFocusRef?.current ?? null;

    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      (returnFocusElement ?? previouslyFocused)?.focus();
    };
  }, [enabled, returnFocusRef]);

  return containerRef;
}
