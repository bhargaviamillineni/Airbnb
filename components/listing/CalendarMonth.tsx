"use client";

import {
  dateFromYmd,
  daysInMonth,
  formatMonthYear,
  isBefore,
  monthStartOffset,
  sameDay,
  startOfDay,
  type DateRange,
} from "@/lib/dates";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

export interface CalendarMonthProps {
  monthDate: Date;
  range: DateRange;
  hoveredDay: Date | null;
  onSelectDay: (day: Date) => void;
  onHoverDay: (day: Date | null) => void;
}

export function CalendarMonth({
  monthDate,
  range,
  hoveredDay,
  onSelectDay,
  onHoverDay,
}: CalendarMonthProps) {
  const offset = monthStartOffset(monthDate);
  const count = daysInMonth(monthDate);
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: count }, (_, index) =>
      dateFromYmd(monthDate.getFullYear(), monthDate.getMonth(), index + 1),
    ),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return (
    <div className="flex-1">
      <h3 className="mb-4 text-center text-base font-semibold text-primary">
        {formatMonthYear(monthDate)}
      </h3>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day, index) => (
          <div
            key={`${formatMonthYear(monthDate)}-wd-${index}`}
            className="flex h-10 items-center justify-center text-xs font-medium text-secondary"
          >
            {day}
          </div>
        ))}
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`${formatMonthYear(monthDate)}-empty-${index}`} className="h-10" />;
          }

          const isStart = range.start ? sameDay(day, range.start) : false;
          const isEnd = range.end ? sameDay(day, range.end) : false;
          const inCommittedRange =
            range.start &&
            range.end &&
            day.getTime() > range.start.getTime() &&
            day.getTime() < range.end.getTime();

          let previewStart: Date | null = null;
          if (range.start && !range.end && hoveredDay && !sameDay(hoveredDay, range.start)) {
            const hoverStart = startOfDay(hoveredDay);
            const rangeStart = range.start;
            if (isBefore(hoverStart, rangeStart)) {
              previewStart = hoverStart;
            } else {
              previewStart = rangeStart;
            }
            const previewEnd = isBefore(hoverStart, rangeStart) ? rangeStart : hoverStart;
            const dayMs = startOfDay(day).getTime();
            const inPreview =
              !isStart &&
              !sameDay(day, previewEnd) &&
              dayMs > previewStart.getTime() &&
              dayMs < previewEnd.getTime();
            const previewLeft = sameDay(day, previewStart) && !sameDay(previewStart, previewEnd);
            const previewRight = sameDay(day, previewEnd);

            const bgClass = inCommittedRange || inPreview ? "bg-surface-muted" : "";
            const leftClass =
              (isStart && range.end) || previewLeft ? "rounded-l-full bg-surface-muted" : "";
            const rightClass = isEnd || previewRight ? "rounded-r-full bg-surface-muted" : "";

            return (
              <div
                key={day.toISOString()}
                onMouseEnter={() => onHoverDay(day)}
                onMouseLeave={() => onHoverDay(null)}
                className={`flex h-10 items-center justify-center ${bgClass} ${leftClass} ${rightClass}`}
              >
                <button
                  type="button"
                  onClick={() => onSelectDay(day)}
                  aria-pressed={isStart || isEnd}
                  aria-label={day.toDateString()}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm hover:border hover:border-[var(--color-text-primary)] ${
                    isStart || isEnd
                      ? "bg-[var(--color-text-primary)] font-semibold text-text-inverse"
                      : "text-primary"
                  }`}
                >
                  {day.getDate()}
                </button>
              </div>
            );
          }

          return (
            <div
              key={day.toISOString()}
              onMouseEnter={() => onHoverDay(day)}
              onMouseLeave={() => onHoverDay(null)}
              className={`flex h-10 items-center justify-center ${
                inCommittedRange && !isStart && !isEnd ? "bg-surface-muted" : ""
              } ${isStart && range.end ? "rounded-l-full bg-surface-muted" : ""} ${
                isEnd ? "rounded-r-full bg-surface-muted" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectDay(day)}
                aria-pressed={isStart || isEnd}
                aria-label={day.toDateString()}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm hover:border hover:border-[var(--color-text-primary)] ${
                  isStart || isEnd
                    ? "bg-[var(--color-text-primary)] font-semibold text-text-inverse"
                    : "text-primary"
                }`}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
