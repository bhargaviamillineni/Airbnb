"use client";

import { useState } from "react";

import { RatingBreakdown } from "@/components/listing/RatingBreakdown";
import { ReviewCard } from "@/components/listing/ReviewCard";
import { SectionHeading } from "@/components/listing/SectionHeading";
import { OutlineButton } from "@/components/ui/OutlineButton";
import type { RatingCategory, RatingChip, Review } from "@/data/listing-data";

export interface ReviewsProps {
  rating: number;
  reviewCount: number;
  categories: RatingCategory[];
  chips: RatingChip[];
  reviews: Review[];
  ratingDistribution?: number[];
}

export function Reviews({
  rating,
  reviewCount,
  categories,
  chips,
  reviews,
  ratingDistribution,
}: ReviewsProps) {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  return (
    <section id="reviews" aria-label="Reviews">
      <RatingBreakdown
        rating={rating}
        reviewCount={reviewCount}
        categories={categories}
        ratingDistribution={ratingDistribution}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.name}
            type="button"
            aria-pressed={activeChip === chip.name}
            onClick={() =>
              setActiveChip((current) => (current === chip.name ? null : chip.name))
            }
            className={`rounded-full border px-4 py-2 text-sm text-primary ${
              activeChip === chip.name
                ? "border-[var(--color-text-primary)] bg-surface-muted"
                : "border-[var(--color-border)]"
            }`}
          >
            {chip.name} {chip.count}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-12 gap-y-10">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <OutlineButton className="mt-8">Show all {reviewCount} reviews</OutlineButton>

      <div className="sr-only">
        <SectionHeading>Reviews</SectionHeading>
      </div>
    </section>
  );
}
