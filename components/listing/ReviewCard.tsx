import { useState } from "react";

import { TextLink } from "@/components/ui/TextLink";
import type { Review } from "@/data/listing-data";

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const truncated = review.text.length > 180;
  const preview =
    truncated && !expanded ? `${review.text.slice(0, 180)}...` : review.text;

  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-muted text-base font-semibold text-primary"
          aria-hidden="true"
        >
          {review.authorName.charAt(0)}
        </span>
        <div>
          <p className="font-medium text-primary">{review.authorName}</p>
          <p className="text-sm text-secondary">{review.authorTenure}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span
          className="tracking-tight text-primary"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {"★".repeat(review.rating)}
        </span>
        <span className="text-sm text-secondary">· {review.date}</span>
      </div>
      <p className="text-primary leading-[var(--leading-relaxed)]">{preview}</p>
      {truncated && (
        <TextLink
          className="text-sm"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Show more"}
        </TextLink>
      )}
    </article>
  );
}
