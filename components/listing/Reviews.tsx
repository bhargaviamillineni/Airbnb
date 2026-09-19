"use client";

import { useState, useRef } from "react";
import { X, Search, Star } from "lucide-react";

import { RatingBreakdown } from "@/components/listing/RatingBreakdown";
import { ReviewCard } from "@/components/listing/ReviewCard";
import { SectionHeading } from "@/components/listing/SectionHeading";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Modal } from "@/components/ui/Modal";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(isModalOpen);
  useFocusTrap({ enabled: isModalOpen });

  const filteredInlineReviews = activeChip
    ? reviews.filter((r) =>
        r.text.toLowerCase().includes(activeChip.toLowerCase()),
      )
    : reviews;

  const inlinePreviewReviews = filteredInlineReviews.slice(0, 6);

  const modalReviews = reviews.filter((r) => {
    if (modalSearchQuery.trim()) {
      return (
        r.text.toLowerCase().includes(modalSearchQuery.toLowerCase().trim()) ||
        r.authorName.toLowerCase().includes(modalSearchQuery.toLowerCase().trim())
      );
    }
    if (activeChip) {
      return r.text.toLowerCase().includes(activeChip.toLowerCase());
    }
    return true;
  });

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
            className={`rounded-full border px-4 py-2 text-sm text-primary transition-colors duration-[var(--duration-normal)] ${
              activeChip === chip.name
                ? "border-[var(--color-text-primary)] bg-surface-muted font-medium"
                : "border-[var(--color-border)] hover:bg-surface-muted"
            }`}
          >
            {chip.name} {chip.count}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {inlinePreviewReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <OutlineButton
        className="mt-8"
        onClick={() => setIsModalOpen(true)}
      >
        Show all {reviewCount} reviews
      </OutlineButton>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalSearchQuery("");
        }}
        containerRef={modalRef}
        ariaLabel="All reviews"
        overlayClassName="p-4 md:p-10"
        panelClassName="w-full max-w-4xl rounded-[var(--radius-xl)] shadow-modal overflow-hidden max-h-[88vh] flex flex-col"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border-light)] bg-surface px-6 py-4">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setModalSearchQuery("");
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2 font-semibold text-primary">
            <Star size={16} className="fill-current text-primary" />
            <span>{rating.toFixed(2)}</span>
            <span>·</span>
            <span>{reviewCount} reviews</span>
          </div>

          <div className="w-8" aria-hidden="true" />
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="sticky top-0 space-y-4">
                <div className="flex items-center gap-2">
                  <Star size={24} className="fill-current text-primary" />
                  <span className="text-3xl font-bold text-primary">
                    {rating.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-primary">Overall rating</p>

                <div className="space-y-3 pt-2">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{cat.name}</span>
                      <span className="font-semibold text-primary">{cat.score.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="relative mb-6">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search reviews"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-[var(--color-border)] bg-surface-muted py-2.5 pl-10 pr-4 text-sm text-primary placeholder:text-secondary focus:border-primary focus:bg-surface focus:outline-none"
                />
              </div>

              <div className="space-y-8">
                {modalReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}

                {modalReviews.length === 0 && (
                  <p className="py-8 text-center text-sm text-secondary">
                    No reviews found matching &quot;{modalSearchQuery}&quot;
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="sr-only">
        <SectionHeading>Reviews</SectionHeading>
      </div>
    </section>
  );
}
