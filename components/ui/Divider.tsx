export interface DividerProps {
  className?: string;
}

export function Divider({ className = "" }: DividerProps) {
  return (
    <hr
      className={`my-[var(--spacing-12)] border-0 border-t border-[var(--color-border-light)] ${className}`}
    />
  );
}
