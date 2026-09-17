"use client";

import { formatCurrency } from "@/lib/format";
import { nightsBetween, type DateRange } from "@/lib/dates";
import { cn } from "@/lib/utils";

export const LISTING_SECTIONS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
] as const;

export const LISTING_SECTION_IDS = LISTING_SECTIONS.map((section) => section.id);

export interface StickySectionNavProps {
  visible: boolean;
  activeId: string;
  pricePerNight: number;
  currency: string;
  range: DateRange;
}

export function StickySectionNav({
  visible,
  activeId,
  pricePerNight,
  currency,
  range,
}: StickySectionNavProps) {
  if (!visible) return null;

  const nights =
    range.start && range.end ? nightsBetween(range.start, range.end) : 0;
  const priceLabel =
    nights > 0
      ? `${formatCurrency(nights * pricePerNight, currency)} for ${nights} nights`
      : "Add dates";

  function scrollToBooking(): void {
    document.getElementById("bookingSticky")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Listing sections"
      className="fixed inset-x-0 top-0 z-[var(--z-sticky)] border-b border-[var(--color-border-light)] bg-surface"
    >
      <div className="mx-auto flex h-16 max-w-[var(--layout-max-width)] items-center justify-between px-[var(--layout-content-padding)]">
        <ul className="flex items-center gap-8">
          {LISTING_SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "border-b-2 py-5 text-sm font-medium transition-colors duration-[var(--duration-normal)]",
                  activeId === section.id
                    ? "border-[var(--color-text-primary)] text-primary"
                    : "border-transparent text-secondary hover:text-primary",
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-primary underline">
            {priceLabel}
          </span>
          <button
            type="button"
            onClick={scrollToBooking}
            className="rounded-[var(--radius-sm)] bg-brand px-6 py-3 text-base font-semibold text-text-inverse transition-colors duration-[var(--duration-normal)] hover:bg-brand-hover"
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}
