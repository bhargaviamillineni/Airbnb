import { formatGuestStats } from "@/lib/format";
import type { Listing } from "@/data/listing-data";

export interface ListingHeaderProps {
  listing: Pick<
    Listing,
    | "propertyType"
    | "locationShort"
    | "guestCapacity"
    | "bedrooms"
    | "beds"
    | "bathrooms"
  >;
}

export function ListingHeader({ listing }: ListingHeaderProps) {
  const stats = formatGuestStats(
    listing.guestCapacity,
    listing.bedrooms,
    listing.beds,
    listing.bathrooms,
  );

  return (
    <section aria-label="Listing overview" className="pt-10">
      <h2 className="text-[length:var(--text-xl)] font-semibold text-primary">
        {listing.propertyType} in {listing.locationShort}
      </h2>
      <p className="mt-1 text-sm text-secondary">{stats}</p>
    </section>
  );
}
