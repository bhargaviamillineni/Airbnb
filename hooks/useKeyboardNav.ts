"use client";

import { useEffect } from "react";

export interface UseKeyboardNavOptions {
  enabled: boolean;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

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
