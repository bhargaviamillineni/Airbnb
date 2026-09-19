"use client";

import { Flag, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

import { BookingDateRange } from "@/components/listing/BookingDateRange";
import { formatCurrency } from "@/lib/format";
import { nightsBetween, type DateRange } from "@/lib/dates";

export interface BookingWidgetProps {
  pricePerNight: number;
  currency: string;
  range: DateRange;
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
  stickySentinelId?: string;
}

export function BookingWidget({
  pricePerNight,
  currency,
  range,
  guests,
  maxGuests,
  onGuestsChange,
}: BookingWidgetProps) {
  const nights =
    range.start && range.end ? nightsBetween(range.start, range.end) : 0;
  const total = nights * pricePerNight;
  const priceLabel =
    nights > 0
      ? `${formatCurrency(total, currency)} for ${nights} night${nights === 1 ? "" : "s"}`
      : "Add dates for prices";

  return (
    <aside
      id="bookingSticky"
      aria-label="Booking widget"
      className="sticky top-24 w-[var(--layout-sidebar-width)] shrink-0 self-start"
    >
      <div className="mb-4 flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] p-4">
        <div className="flex items-start gap-3">
          <Tag size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
          <p className="text-sm text-primary">
            Get 10% off your next stay.{" "}
            <button type="button" className="font-semibold underline">
              Terms apply
            </button>
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-primary hover:bg-surface-muted"
        >
          Claim
        </button>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface p-6 shadow-card">
        <p className="text-[length:var(--text-xl)] font-semibold text-primary">
          {priceLabel}
        </p>

        <div className="mt-4">
          <BookingDateRange
            range={range}
            guests={guests}
            maxGuests={maxGuests}
            onGuestsChange={onGuestsChange}
          />
        </div>

        <p className="mt-3 rounded-full bg-surface-muted py-2.5 text-center text-sm text-primary">
          Free cancellation before{" "}
          <span className="font-semibold">17 October</span>
        </p>

        <button
          type="button"
          id="reserveBtn"
          className="mt-3 w-full rounded-full bg-brand py-3.5 text-base font-semibold text-text-inverse transition-colors duration-[var(--duration-normal)] hover:bg-brand-hover"
        >
          Reserve
        </button>

        <p className="mt-3 text-center text-sm text-secondary">
          You won&apos;t be charged yet
        </p>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-secondary underline underline-offset-2"
      >
        <Flag size={12} />
        Report this listing
      </button>
    </aside>
  );
}
