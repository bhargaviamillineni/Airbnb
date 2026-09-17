"use client";

import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import { useMemo, useState } from "react";

import { CalendarMonth } from "@/components/listing/CalendarMonth";
import { SectionHeading } from "@/components/listing/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import {
  addMonths,
  dateFromYmd,
  formatRangeLabel,
  nightsBetween,
  selectRangeDay,
  type DateRange,
} from "@/lib/dates";

export interface CalendarProps {
  location: string;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const MIN_MONTH = dateFromYmd(2026, 9, 1);
const MAX_MONTH = dateFromYmd(2027, 2, 1);

export function Calendar({ location, range, onRangeChange }: CalendarProps) {
  const [monthCursor, setMonthCursor] = useState(dateFromYmd(2026, 9, 1));
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const nextMonth = addMonths(monthCursor, 1);

  const nights = useMemo(() => {
    if (!range.start || !range.end) return 0;
    return nightsBetween(range.start, range.end);
  }, [range]);

  const heading =
    nights > 0
      ? `${nights} night${nights === 1 ? "" : "s"} in ${location}`
      : "Select check-in date";

  const canGoBack = monthCursor.getTime() > MIN_MONTH.getTime();
  const canGoForward = nextMonth.getTime() < MAX_MONTH.getTime();

  return (
    <section aria-label="Availability">
      <SectionHeading>{heading}</SectionHeading>
      <p className="mt-1 text-sm text-secondary">
        {range.start && range.end
          ? formatRangeLabel(range.start, range.end)
          : range.start
            ? "Select checkout date"
            : "Add your travel dates for exact pricing"}
      </p>
      <div className="relative mt-6 flex gap-8">
        <button
          type="button"
          className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-muted disabled:opacity-30"
          aria-label="Previous month"
          disabled={!canGoBack}
          onClick={() => setMonthCursor((current) => addMonths(current, -1))}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-muted disabled:opacity-30"
          aria-label="Next month"
          disabled={!canGoForward}
          onClick={() => setMonthCursor((current) => addMonths(current, 1))}
        >
          <ChevronRight size={16} />
        </button>
        <CalendarMonth
          monthDate={monthCursor}
          range={range}
          hoveredDay={hoveredDay}
          onHoverDay={setHoveredDay}
          onSelectDay={(day) => {
            setHoveredDay(null);
            onRangeChange(selectRangeDay(range, day));
          }}
        />
        <CalendarMonth
          monthDate={nextMonth}
          range={range}
          hoveredDay={hoveredDay}
          onHoverDay={setHoveredDay}
          onSelectDay={(day) => {
            setHoveredDay(null);
            onRangeChange(selectRangeDay(range, day));
          }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)]"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard size={14} />
        </button>
        <TextLink
          className="text-sm"
          onClick={() => onRangeChange({ start: null, end: null })}
        >
          Clear dates
        </TextLink>
      </div>
    </section>
  );
}
