"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { GuestStepperPopover } from "@/components/listing/GuestStepperPopover";
import { formatSlashDate, type DateRange } from "@/lib/dates";

export interface BookingDateRangeProps {
  range: DateRange;
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
}

export function BookingDateRange({
  range,
  guests,
  maxGuests,
  onGuestsChange,
}: BookingDateRangeProps) {
  const [guestOpen, setGuestOpen] = useState(false);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!guestOpen) return;

    function handlePointer(event: MouseEvent): void {
      if (!guestRef.current?.contains(event.target as Node)) {
        setGuestOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [guestOpen]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)]">
      <div className="grid grid-cols-2 border-b border-[var(--color-border)]">
        <div className="border-r border-[var(--color-border)] p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-primary">
            Check-in
          </span>
          <span className="mt-0.5 block text-sm text-primary">
            {range.start ? formatSlashDate(range.start) : "Add date"}
          </span>
        </div>
        <div className="p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-primary">
            Checkout
          </span>
          <span className="mt-0.5 block text-sm text-primary">
            {range.end ? formatSlashDate(range.end) : "Add date"}
          </span>
        </div>
      </div>
      <div className="relative" ref={guestRef}>
        <button
          type="button"
          className="flex w-full items-center justify-between p-3 text-left"
          aria-expanded={guestOpen}
          aria-haspopup="dialog"
          onClick={() => setGuestOpen((open) => !open)}
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wide text-primary">
              Guests
            </span>
            <span className="mt-0.5 block text-sm text-primary">
              {guests} guest{guests === 1 ? "" : "s"}
            </span>
          </div>
          <ChevronDown size={16} className="text-primary" aria-hidden="true" />
        </button>
        {guestOpen && (
          <GuestStepperPopover
            guests={guests}
            maxGuests={maxGuests}
            onGuestsChange={onGuestsChange}
          />
        )}
      </div>
    </div>
  );
}
