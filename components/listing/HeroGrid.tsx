"use client";

import { LayoutGrid } from "lucide-react";
import Image from "next/image";

import type { ListingPhoto } from "@/data/listing-data";

export interface HeroGridProps {
  photos: ListingPhoto[];
  totalPhotos: number;
  onOpenPhoto: (index: number) => void;
}

export function HeroGrid({ photos, totalPhotos, onOpenPhoto }: HeroGridProps) {
  const heroPhotos = photos.slice(0, 5);

  return (
    <section id="photos" aria-label="Photos of this place" className="pt-6">
      <div className="grid h-[var(--size-hero-height)] grid-cols-2 gap-2">
        <button
          type="button"
          className="group relative overflow-hidden rounded-l-[var(--radius-md)]"
          onClick={() => onOpenPhoto(0)}
          aria-label={heroPhotos[0]?.alt ?? "Show photos"}
        >
          {heroPhotos[0] && (
            <Image
              src={heroPhotos[0].url}
              alt={heroPhotos[0].alt}
              fill
              priority
              className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-105"
              sizes="(min-width: 1280px) 520px, 50vw"
            />
          )}
        </button>

        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {heroPhotos.slice(1, 5).map((photo, index) => {
            const photoIndex = index + 1;
            const isTopRight = index === 1;
            const isBottomRight = index === 3;

            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => onOpenPhoto(photoIndex)}
                aria-label={photo.alt}
                className={`group relative overflow-hidden ${
                  isTopRight ? "rounded-tr-[var(--radius-md)]" : ""
                } ${isBottomRight ? "rounded-br-[var(--radius-md)]" : ""}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-105"
                  sizes="(min-width: 1280px) 260px, 25vw"
                />
                {isBottomRight && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPhoto(0);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onOpenPhoto(0);
                      }
                    }}
                    className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-text-primary)] bg-surface px-3.5 py-1.5 text-sm font-medium text-primary shadow-sm transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2"
                  >
                    <LayoutGrid size={14} strokeWidth={1.75} />
                    Show all photos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="sr-only"
        onClick={() => onOpenPhoto(0)}
      >
        Show all {totalPhotos} photos
      </button>
    </section>
  );
}
