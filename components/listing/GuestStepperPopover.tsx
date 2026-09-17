"use client";

import { Minus, Plus } from "lucide-react";

export interface GuestStepperPopoverProps {
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
}

export function GuestStepperPopover({
  guests,
  maxGuests,
  onGuestsChange,
}: GuestStepperPopoverProps) {
  return (
    <div
      role="dialog"
      aria-label="Choose number of guests"
      className="absolute left-0 right-0 top-full z-[var(--z-sticky)] mt-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-surface p-4 shadow-card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-primary">Guests</p>
          <p className="text-sm text-secondary">Ages 13 or above</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] disabled:opacity-30"
            aria-label="Decrease guests"
            disabled={guests <= 1}
            onClick={() => onGuestsChange(guests - 1)}
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-primary">{guests}</span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] disabled:opacity-30"
            aria-label="Increase guests"
            disabled={guests >= maxGuests}
            onClick={() => onGuestsChange(guests + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs text-secondary">
        This place has a maximum of {maxGuests} guests.
      </p>
    </div>
  );
}
