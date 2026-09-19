export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function monthStartOffset(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function nightsBetween(start: Date, end: Date): number {
  const ms = startOfDay(end).getTime() - startOfDay(start).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatSlashDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
}

export function formatRangeLabel(start: Date, end: Date): string {
  const startLabel = start.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const endLabel = end.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${startLabel} - ${endLabel}`;
}

export function selectRangeDay(range: DateRange, day: Date): DateRange {
  const next = startOfDay(day);

  if (!range.start || range.end) {
    return { start: next, end: null };
  }

  if (sameDay(next, range.start) || isBefore(next, range.start)) {
    return { start: next, end: null };
  }

  return { start: range.start, end: next };
}

export function dateFromYmd(year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, day);
}
