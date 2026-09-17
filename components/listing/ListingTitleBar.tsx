"use client";

import { Heart, Share } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export interface ListingTitleBarProps {
  title: string;
  saved: boolean;
  onToggleSave: () => void;
}

const HEART_PULSE_DURATION = 0.34;
const HEART_PULSE_EASE: [number, number, number, number] = [0.2, 0, 0, 1];

export function ListingTitleBar({ title, saved, onToggleSave }: ListingTitleBarProps) {
  const [copied, setCopied] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const reduceMotion = useReducedMotion();

  async function handleShare(): Promise<void> {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleSaveClick(): void {
    onToggleSave();
    setPulseKey((k) => k + 1);
  }

  return (
    <div className="flex items-center justify-between gap-4 pt-6">
      <h1 className="text-[length:var(--text-2xl)] font-semibold leading-[var(--leading-tight)] text-primary">
        {title}
      </h1>
      <div className="flex shrink-0 items-center">
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-primary underline underline-offset-2 transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted"
        >
          <Share size={16} strokeWidth={1.75} />
          {copied ? "Copied" : "Share"}
        </button>
        <motion.button
          type="button"
          onClick={handleSaveClick}
          aria-pressed={saved}
          className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-primary underline underline-offset-2 transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted"
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          transition={{ duration: 0.15, ease: HEART_PULSE_EASE }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`heart-${saved ? "fill" : "empty"}-${pulseKey}`}
              initial={reduceMotion ? {} : { scale: 0.85, opacity: 0.7 }}
              animate={reduceMotion ? {} : { scale: 1, opacity: 1 }}
              exit={reduceMotion ? {} : { scale: 0.95, opacity: 0.9 }}
              transition={{ duration: reduceMotion ? 0 : HEART_PULSE_DURATION, ease: HEART_PULSE_EASE }}
              className="inline-flex items-center"
            >
              <Heart
                size={16}
                strokeWidth={1.75}
                fill={saved ? "currentColor" : "none"}
                className={saved ? "text-brand" : "text-primary"}
              />
            </motion.span>
          </AnimatePresence>
          Save
        </motion.button>
      </div>
    </div>
  );
}
