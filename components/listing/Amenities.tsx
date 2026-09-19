"use client";

import { useState, useRef } from "react";
import { X, Search } from "lucide-react";
import { SectionHeading } from "@/components/listing/SectionHeading";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Modal } from "@/components/ui/Modal";
import { getIcon } from "@/lib/icons";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { Amenity } from "@/data/listing-data";

export interface AmenitiesProps {
  amenities: Amenity[];
  totalCount: number;
}

export function Amenities({ amenities, totalCount }: AmenitiesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useFocusTrap({ enabled: isOpen });

  const inlineAmenities = amenities.slice(0, 10);

  const filteredAmenities = searchQuery.trim()
    ? amenities.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
    : amenities;

  const availableAmenities = filteredAmenities.filter((a) => !a.unavailable);
  const unavailableAmenities = filteredAmenities.filter((a) => a.unavailable);

  return (
    <section id="amenities" aria-label="What this place offers">
      <SectionHeading>What this place offers</SectionHeading>

      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
        {inlineAmenities.map((amenity) => {
          const Icon = getIcon(amenity.icon);

          return (
            <li key={amenity.id} className="flex items-center gap-4">
              <Icon
                size={24}
                strokeWidth={1.5}
                className={`shrink-0 ${
                  amenity.unavailable ? "text-secondary" : "text-primary"
                }`}
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

      <OutlineButton className="mt-8" onClick={() => setIsOpen(true)}>
        Show all {totalCount} amenities
      </OutlineButton>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSearchQuery("");
        }}
        containerRef={modalRef}
        ariaLabel="What this place offers"
        overlayClassName="p-4 md:p-10"
        panelClassName="w-full max-w-2xl rounded-[var(--radius-xl)] shadow-modal overflow-hidden max-h-[85vh] flex flex-col"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border-light)] bg-surface px-6 py-4">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setSearchQuery("");
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2} />
          </button>
          <h2 className="text-base font-bold text-primary">What this place offers</h2>
          <div className="w-8" aria-hidden="true" />
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              type="text"
              placeholder="Search amenities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[var(--color-border)] bg-surface-muted py-2.5 pl-10 pr-4 text-sm text-primary placeholder:text-secondary focus:border-primary focus:bg-surface focus:outline-none"
            />
          </div>

          {availableAmenities.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-primary">
                Included amenities
              </h3>
              <ul className="divide-y divide-[var(--color-border-light)]">
                {availableAmenities.map((amenity) => {
                  const Icon = getIcon(amenity.icon);
                  return (
                    <li
                      key={amenity.id}
                      className="flex items-center gap-4 py-4"
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className="shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-base text-primary">
                        {amenity.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {unavailableAmenities.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">
                Not included
              </h3>
              <ul className="divide-y divide-[var(--color-border-light)]">
                {unavailableAmenities.map((amenity) => {
                  const Icon = getIcon(amenity.icon);
                  return (
                    <li
                      key={amenity.id}
                      className="flex items-center gap-4 py-4 opacity-60"
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className="shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <span className="text-base text-secondary line-through">
                        {amenity.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {filteredAmenities.length === 0 && (
            <p className="py-8 text-center text-sm text-secondary">
              No amenities found matching &quot;{searchQuery}&quot;
            </p>
          )}
        </div>
      </Modal>
    </section>
  );
}
