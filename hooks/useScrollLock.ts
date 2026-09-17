"use client";

import { useEffect } from "react";

/**
 * Locks page-level scroll while `enabled` is true.
 * Safe to call on the server (no-op) and idempotent when re-enabled.
 * Restores the previous overflow/scroll state (including any original
 * document body inline style) on unmount or when re-disabled.
 */
export function useScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    if (!enabled) return undefined;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [enabled]);
}
