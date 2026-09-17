import { ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/listing/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

export interface MapSectionProps {
  location: string;
  neighbourhoodHighlights: string;
}

export function MapSection({ location, neighbourhoodHighlights }: MapSectionProps) {
  return (
    <section id="location" aria-label="Where you'll be">
      <SectionHeading>Where you&apos;ll be</SectionHeading>
      <p className="mt-1 text-base text-primary">{location}</p>

      {/* Static map stand-in — no third-party map SDK in this phase */}
      <div
        className="bg-map-placeholder relative mt-6 h-[var(--size-map-height)] overflow-hidden rounded-[var(--radius-md)]"
        role="img"
        aria-label={`Map showing approximate location in ${location}`}
      >
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-map-halo)]" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-text-primary)]" />
      </div>

      <p className="mt-4 text-sm text-secondary">
        Exact location will be provided after booking.
      </p>

      <div className="mt-8">
        <h3 className="text-base font-semibold text-primary">Neighbourhood highlights</h3>
        <p className="mt-2 text-primary leading-[var(--leading-relaxed)]">
          {neighbourhoodHighlights}
        </p>
        <TextLink className="mt-2">
          Show more
          <ChevronRight size={16} strokeWidth={2} />
        </TextLink>
      </div>
    </section>
  );
}
