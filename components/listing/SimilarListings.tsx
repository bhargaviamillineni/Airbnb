"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { SectionHeading } from "@/components/listing/SectionHeading";
import { formatCurrency } from "@/lib/format";
import type { NearbyStay } from "@/data/listing-data";

export interface SimilarListingsProps {
  location: string;
  stays: NearbyStay[];
}

const PAGE_SIZE = 5;

export function SimilarListings({ location, stays }: SimilarListingsProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(stays.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = stays.slice(start, start + PAGE_SIZE);

  return (
    <section aria-label={`More stays nearby in ${location}`}>
      <div className="flex items-center justify-between">
        <SectionHeading>More stays nearby</SectionHeading>
        <div className="flex items-center gap-3">
          <span className="text-sm text-secondary">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] disabled:opacity-30"
            aria-label="Previous stays"
            disabled={page === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] disabled:opacity-30"
            aria-label="Next stays"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-5 gap-4">
        {visible.map((stay) => (
          <li key={stay.id}>
            <div className="relative h-44 w-full overflow-hidden rounded-[var(--radius-md)]">
              <Image
                src={stay.imageUrl}
                alt={stay.title}
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            <p className="mt-2 line-clamp-2 text-sm font-medium text-primary">{stay.title}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-primary">
              {formatCurrency(stay.price)}
              <Star size={10} fill="currentColor" aria-hidden="true" />
              {stay.rating}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
