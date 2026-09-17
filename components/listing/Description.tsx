"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { TextLink } from "@/components/ui/TextLink";

export interface DescriptionProps {
  text: string;
  originalText?: string;
}

export function Description({ text, originalText }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const body = showOriginal && originalText ? originalText : text;

  return (
    <section aria-label="About this space">
      <p className="rounded-[var(--radius-sm)] bg-surface-muted px-4 py-3 text-sm text-primary">
        Some info has been automatically translated.{" "}
        <button
          type="button"
          className="font-semibold underline underline-offset-2"
          onClick={() => setShowOriginal((value) => !value)}
        >
          {showOriginal ? "Show translation" : "Show original"}
        </button>
      </p>
      <p
        className={`mt-4 text-primary leading-[var(--leading-relaxed)] ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {body}
      </p>
      <TextLink className="mt-3" onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Show less" : "Show more"}
        <ChevronRight size={16} strokeWidth={2} />
      </TextLink>
    </section>
  );
}
