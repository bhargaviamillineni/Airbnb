import { SectionHeading } from "@/components/listing/SectionHeading";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { getIcon } from "@/lib/icons";
import type { Amenity } from "@/data/listing-data";

export interface AmenitiesProps {
  amenities: Amenity[];
  totalCount: number;
}

export function Amenities({ amenities, totalCount }: AmenitiesProps) {
  return (
    <section id="amenities" aria-label="What this place offers">
      <SectionHeading>What this place offers</SectionHeading>
      <ul className="mt-6 grid grid-cols-2 gap-y-4">
        {amenities.map((amenity) => {
          const Icon = getIcon(amenity.icon);

          return (
            <li key={amenity.id} className="flex items-center gap-4">
              <Icon
                size={24}
                strokeWidth={1.5}
                className={`shrink-0 ${amenity.unavailable ? "text-secondary" : "text-primary"}`}
                aria-hidden="true"
              />
              <span
                className={
                  amenity.unavailable
                    ? "text-secondary line-through"
                    : "text-primary"
                }
              >
                {amenity.name}
              </span>
            </li>
          );
        })}
      </ul>
      <OutlineButton className="mt-6">Show all {totalCount} amenities</OutlineButton>
    </section>
  );
}
