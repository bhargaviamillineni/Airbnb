"use client";

import { useEffect } from "react";

export interface UseKeyboardNavOptions {
  /** Whether keyboard handling is active */
  enabled: boolean;
  /** Called when Escape is pressed */
  onEscape?: () => void;
  /** Called when ArrowLeft is pressed */
  onArrowLeft?: () => void;
  /** Called when ArrowRight is pressed */
  onArrowRight?: () => void;
}

/**
 * Hook for arrow-key and Escape navigation in overlays (Lightbox, Photo Tour).
 */
export function useKeyboardNav({
  enabled,
  onEscape,
  onArrowLeft,
  onArrowRight,
}: UseKeyboardNavOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      switch (event.key) {
        case "Escape":
          onEscape?.();
          break;
        case "ArrowLeft":
          event.preventDefault();
          onArrowLeft?.();
          break;
        case "ArrowRight":
          event.preventDefault();
          onArrowRight?.();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onEscape, onArrowLeft, onArrowRight]);
}
