"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2, X } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { IconButton } from "@/components/ui/IconButton";
import type { PhotoSection } from "@/data/listing-data";

export interface PhotoTourHeaderProps {
  onClose: () => void;
  compact: boolean;
  thumbnailSections: PhotoSection[];
  activeSectionId?: string;
  onJumpSection: (sectionIndex: number) => void;
}

export function PhotoTourHeader({
  onClose,
  compact,
  thumbnailSections,
  activeSectionId,
  onJumpSection,
}: PhotoTourHeaderProps) {
  const reduceMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  function scrollStrip(delta: number): void {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({
      left: delta * el.clientWidth * 0.7,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const transition = {
    duration: reduceMotion ? 0 : 0.22,
    ease: [0.2, 0, 0, 1] as const,
  };

  return (
    <div>
      <motion.header
        initial={false}
        animate={{
          opacity: compact ? 1 : 0,
          y: compact ? 0 : -8,
          pointerEvents: compact ? "auto" : "none",
        }}
        transition={transition}
        style={
          {
            position: "sticky",
            top: 0,
            ["--photo-tour-compact-header-height" as string]: "64px",
          } as React.CSSProperties
        }
        className="z-[var(--z-sticky)] mb-[-64px] flex h-16 items-center justify-between border-b border-[var(--color-border-light)] bg-surface/95 backdrop-blur"
      >
        <div className="flex items-center gap-2 pl-4">
          <IconButton aria-label="Back to listing" onClick={onClose}>
            <ArrowLeft size={20} strokeWidth={1.75} />
          </IconButton>
        </div>
        <h2 id="photo-tour-title" className="text-base font-semibold text-primary">
          Photo tour
        </h2>
        <div className="flex items-center gap-1 pr-4">
          <IconButton aria-label="Share" className="text-primary">
            <Share2 size={18} strokeWidth={1.75} />
          </IconButton>
          <IconButton aria-label="Save" className="text-primary">
            <Heart size={18} strokeWidth={1.75} />
          </IconButton>
        </div>
      </motion.header>

      <header className="border-b border-[var(--color-border-light)] bg-surface">
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between bg-surface/80 backdrop-blur">
          <div className="flex items-center gap-2 pl-4">
            <IconButton aria-label="Close photo tour" onClick={onClose}>
              <X size={18} strokeWidth={2} />
            </IconButton>
          </div>
          <h2 className="sr-only">Photo tour</h2>
          <div className="flex items-center gap-1 pr-4">
            <IconButton aria-label="Share" className="text-primary">
              <Share2 size={18} strokeWidth={1.75} />
            </IconButton>
            <IconButton aria-label="Save" className="text-primary">
              <Heart size={18} strokeWidth={1.75} />
            </IconButton>
          </div>
        </div>
        <div className="relative mx-auto max-w-[var(--layout-max-width)] px-[var(--layout-content-padding)] pb-6 pt-2">
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-light)] bg-surface shadow-card disabled:opacity-0"
            onClick={() => scrollStrip(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <div
            ref={stripRef}
            className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-6 py-1"
          >
            {thumbnailSections.map((section, index) => {
              const thumb = section.photos[0];
              const isActive = section.title === activeSectionId;
              return (
                <button
                  key={`${section.id}-${index}`}
                  type="button"
                  onClick={() => onJumpSection(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex w-[132px] shrink-0 flex-col gap-2 text-left ${
                    isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative h-[96px] w-[132px] overflow-hidden rounded-[var(--radius-md)] transition-all duration-[var(--duration-normal)] ${
                      isActive ? "ring-2 ring-[var(--color-text-primary)] ring-offset-2 ring-offset-surface" : ""
                    }`}
                  >
                    {thumb ? (
                      <Image
                        src={thumb.url}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
                        sizes="132px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-surface-muted text-xs text-secondary">
                        {section.title}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-primary">{section.title}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-light)] bg-surface shadow-card disabled:opacity-0"
            onClick={() => scrollStrip(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div id="photoTourNavSentinel" aria-hidden="true" className="h-px w-0" />
      </header>
    </div>
  );
}
