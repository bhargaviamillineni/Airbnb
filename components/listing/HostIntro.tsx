import { GuestFavoriteBadge } from "@/components/listing/GuestFavoriteBadge";
import type { Host, Listing } from "@/data/listing-data";

export interface HostIntroProps {
  listing: Pick<
    Listing,
    | "rating"
    | "reviewCount"
    | "isGuestFavorite"
  >;
  host: Host;
}

export function HostIntro({ listing, host }: HostIntroProps) {
  return (
    <section aria-label="Hosted by" className="mt-8">
      {listing.isGuestFavorite && (
        <div className="mb-8">
          <GuestFavoriteBadge
            rating={listing.rating}
            reviewCount={listing.reviewCount}
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <span
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-host-avatar-bg)] text-center text-[8px] font-bold uppercase leading-tight text-text-inverse"
          aria-hidden="true"
        >
          Mirashya
        </span>
        <div>
          <h3 className="text-base font-semibold text-primary">
            Hosted by {host.name}
          </h3>
          <p className="text-sm text-secondary">{host.yearsHosting} years hosting</p>
        </div>
      </div>
    </section>
  );
}
