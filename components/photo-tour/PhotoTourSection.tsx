"use client";

import Image from "next/image";
import { useId } from "react";

import type { PhotoSection as PhotoSectionData } from "@/data/listing-data";

export interface PhotoTourSectionProps {
  section: PhotoSectionData;
  sectionIndex: number;
  startingIndex: number;
  onSelectPhoto: (absoluteIndex: number) => void;
}

const COMPACT_HEADER_HEIGHT = 64;

export function PhotoTourSection({
  section,
  sectionIndex,
  startingIndex,
  onSelectPhoto,
}: PhotoTourSectionProps) {
  const uid = useId().replace(/:/g, "");
  const sectionHookId = `photo-section-${section.id}-${sectionIndex}-${uid}`;
  const stickyTop = `calc(var(--photo-tour-compact-header-height, ${COMPACT_HEADER_HEIGHT}px) + 2rem)`;

  return (
    <section
      id={sectionHookId}
      data-photo-tour-section-index={sectionIndex}
      data-photo-tour-section-title={section.title}
      className="mx-auto max-w-[var(--layout-max-width)] px-[var(--layout-content-padding)] py-12 first:pt-8"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5">
          <div
            className="z-10"
            style={{ position: "sticky", top: stickyTop }}
          >
            <h3 className="text-[length:var(--text-3xl)] font-semibold leading-[var(--leading-tight)] text-primary">
              {section.title}
            </h3>
            {section.subtitle ? (
              <p className="mt-3 text-[length:var(--text-base)] text-secondary">
                {section.subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="col-span-7 flex flex-col gap-3">
          {section.photos.map((photo, index) => {
            const absoluteIndex = startingIndex + index;
            return (
              <button
                key={photo.id}
                type="button"
                data-photo-tour-index={absoluteIndex}
                onClick={() => onSelectPhoto(absoluteIndex)}
                aria-label={`Open ${photo.alt}`}
                className={`group relative overflow-hidden rounded-[var(--radius-md)] ${
                  index === 0 ? "aspect-[4/3]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)] group-hover:scale-[1.02]"
                  sizes="(min-width: 1280px) 560px, 50vw"
                  priority={sectionIndex === 0 && index === 0}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
