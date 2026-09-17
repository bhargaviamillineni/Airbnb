import { Laurel } from "@/components/ui/Laurel";

export interface GuestFavoriteBadgeProps {
  rating: number;
  reviewCount: number;
}

export function GuestFavoriteBadge({
  rating,
  reviewCount,
}: GuestFavoriteBadgeProps) {
  return (
    <div className="flex items-center rounded-[var(--radius-xl)] border border-[var(--color-border-light)] px-6 py-5">
      <div className="flex items-center gap-1 pr-6">
        <Laurel side="left" className="h-10 w-8" />
        <span className="max-w-[var(--max-w-guest-fav-text)] text-center text-sm font-semibold leading-tight text-primary">
          Guest favourite
        </span>
        <Laurel side="right" className="h-10 w-8" />
      </div>

      <p className="flex-1 border-l border-[var(--color-border-light)] px-6 text-sm leading-snug text-primary">
        One of the most loved homes on Airbnb, according to guests
      </p>

      <div className="flex flex-col items-center border-l border-[var(--color-border-light)] px-6">
        <span className="text-xl font-semibold text-primary">{rating}</span>
        <span className="text-[10px] tracking-tight text-primary" aria-hidden="true">
          ★★★★★
        </span>
      </div>

      <div className="flex flex-col items-center border-l border-[var(--color-border-light)] pl-6">
        <span className="text-xl font-semibold text-primary">{reviewCount}</span>
        <a href="#reviews" className="text-sm text-primary underline underline-offset-2">
          Reviews
        </a>
      </div>
    </div>
  );
}
