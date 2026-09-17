"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore, useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import { PhotoTourGrid } from "@/components/photo-tour/PhotoTourGrid";
import { PhotoTourHeader } from "@/components/photo-tour/PhotoTourHeader";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { ListingPhoto, PhotoSection } from "@/data/listing-data";

export interface PhotoTourOverlayProps {
  isOpen: boolean;
  photos: ListingPhoto[];
  photoTourSections: PhotoSection[];
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
  trapEnabled: boolean;
  initialIndex?: number;
}

function subscribe(): () => void {
  return () => undefined;
}

export function PhotoTourOverlay({
  isOpen,
  photos,
  photoTourSections,
  onClose,
  onSelectPhoto,
  trapEnabled,
  initialIndex = 0,
}: PhotoTourOverlayProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  const trapRef = useFocusTrap<HTMLDivElement>({ enabled: trapEnabled });
  const [compact, setCompact] = useState(false);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string>(
    photoTourSections[0]?.title ?? "",
  );
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  useScrollLock(isOpen);
  useKeyboardNav({ enabled: trapEnabled, onEscape: onClose });

  const safeInitial = Math.max(0, Math.min(initialIndex, Math.max(0, photos.length - 1)));

  const handleJumpSection = useCallback(
    (sectionIndex: number) => {
      const root = scrollRootRef.current ?? trapRef.current;
      if (!root) return;
      const target = root.querySelector<HTMLElement>(
        `[data-photo-tour-section-index="${sectionIndex}"]`,
      );
      if (!target) return;
      const pinnedHeaderHeight = 64;
      const sectionTopPadding = 32;
      root.scrollTo({
        top: Math.max(0, target.offsetTop - (pinnedHeaderHeight + sectionTopPadding)),
        behavior: reduceMotion ? "auto" : "smooth",
      });
      const title = photoTourSections[sectionIndex]?.title;
      if (title) setActiveSectionTitle(title);
    },
    [photoTourSections, reduceMotion, trapRef],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = trapRef.current;
    if (!root) return undefined;
    scrollRootRef.current = root;

    root.style.setProperty("--photo-tour-compact-header-height", "64px");

    const navSentinel = root.querySelector<HTMLElement>("#photoTourNavSentinel");
    const sentinelObserver = navSentinel
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry) return;
            setCompact(entry.boundingClientRect.top <= 0);
          },
          { root, threshold: [0], rootMargin: "0px" },
        )
      : undefined;
    if (navSentinel && sentinelObserver) sentinelObserver.observe(navSentinel);

    const sectionEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-photo-tour-section-index]"),
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const title = visible.target.getAttribute("data-photo-tour-section-title");
        if (title) setActiveSectionTitle(title);
      },
      { root, rootMargin: "-64px 0px -40% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sectionEls.forEach((el) => sectionObserver.observe(el));

    return () => {
      sentinelObserver?.disconnect();
      sectionObserver.disconnect();
    };
  }, [isOpen, trapRef]);

  useEffect(() => {
    if (!isOpen) return;
    const root = scrollRootRef.current ?? trapRef.current;
    if (!root) return;
    const run = (): void => {
      if (safeInitial === 0) {
        root.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "auto" });
        return;
      }
      const targets = root.querySelectorAll<HTMLElement>(
        `[data-photo-tour-index="${safeInitial}"]`,
      );
      const target = targets[0];
      if (target) {
        root.scrollTo({
          top: Math.max(0, target.offsetTop - 96),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    };
    const id = window.setTimeout(run, reduceMotion ? 0 : 60);
    return () => window.clearTimeout(id);
  }, [isOpen, safeInitial, reduceMotion, trapRef]);

  if (!mounted) return null;

  const duration = reduceMotion ? 0 : 0.4;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={trapRef}
          className="fixed inset-0 z-[var(--z-overlay)] overflow-y-auto bg-surface"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-tour-title"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
          transition={{ duration, ease: [0.2, 0, 0, 1] }}
        >
          <PhotoTourHeader
            onClose={onClose}
            compact={compact}
            thumbnailSections={photoTourSections}
            activeSectionId={activeSectionTitle}
            onJumpSection={handleJumpSection}
          />
          <PhotoTourGrid sections={photoTourSections} onSelectPhoto={onSelectPhoto} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
