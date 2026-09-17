"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

import { LightboxCounter } from "@/components/lightbox/LightboxCounter";
import { LightboxImage } from "@/components/lightbox/LightboxImage";
import { LightboxNav } from "@/components/lightbox/LightboxNav";
import { IconButton } from "@/components/ui/IconButton";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import type { ListingPhoto } from "@/data/listing-data";

export interface LightboxOverlayProps {
  photos: ListingPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

function subscribe(): () => void {
  return () => undefined;
}

export function LightboxOverlay({
  photos,
  index,
  onClose,
  onIndexChange,
}: LightboxOverlayProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  const isOpen = index !== null;
  const trapRef = useFocusTrap<HTMLDivElement>({ enabled: isOpen });
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      const next = (index + delta + photos.length) % photos.length;
      setDirection(delta);
      onIndexChange(next);
    },
    [index, onIndexChange, photos.length],
  );

  useKeyboardNav({
    enabled: isOpen,
    onEscape: onClose,
    onArrowLeft: () => go(-1),
    onArrowRight: () => go(1),
  });

  if (!mounted) return null;

  const photo = index !== null ? photos[index] : undefined;
  const keyId = photo ? `${photo.id}-${index}` : "";

  return createPortal(
    <AnimatePresence>
      {isOpen && photo && index !== null && (
        <motion.div
          ref={trapRef}
          className="fixed inset-0 z-[var(--z-modal)] flex flex-col bg-black"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <header className="flex items-center justify-between px-6 py-4 text-text-inverse">
            <IconButton
              aria-label="Close photo viewer"
              onClick={onClose}
              className="text-text-inverse hover:bg-white/10"
            >
              <X size={18} strokeWidth={2} />
            </IconButton>
            <LightboxCounter
              id="lightbox-heading"
              current={index + 1}
              total={photos.length}
            />
            <span className="w-10" aria-hidden="true" />
          </header>

          <div className="relative flex flex-1 items-center justify-center px-20 pb-8">
            <LightboxNav onPrev={() => go(-1)} onNext={() => go(1)} />
            <LightboxImage photo={photo} direction={direction} keyId={keyId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
