import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Pill outline CTA used for “Show all …” actions. */
export function OutlineButton({
  children,
  className = "",
  ...props
}: OutlineButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full border border-[var(--color-text-primary)] px-6 py-3 text-base font-semibold text-primary transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
