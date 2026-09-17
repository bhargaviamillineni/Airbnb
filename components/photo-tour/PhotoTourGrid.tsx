"use client";

import { PhotoTourSection } from "@/components/photo-tour/PhotoTourSection";
import type { PhotoSection } from "@/data/listing-data";

export interface PhotoTourGridProps {
  sections: PhotoSection[];
  onSelectPhoto: (index: number) => void;
}

export function PhotoTourGrid({ sections, onSelectPhoto }: PhotoTourGridProps) {
  const offsets: number[] = sections.reduce<number[]>((acc, s, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + sections[i - 1].photos.length);
    return acc;
  }, []);

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <PhotoTourSection
          key={`${section.id}-${sectionIndex}-${section.title}`}
          section={section}
          sectionIndex={sectionIndex}
          startingIndex={offsets[sectionIndex] ?? 0}
          onSelectPhoto={onSelectPhoto}
        />
      ))}
    </div>
  );
}
