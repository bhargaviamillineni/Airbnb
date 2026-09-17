export interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-[length:var(--text-xl)] font-semibold text-primary ${className}`}
    >
      {children}
    </h2>
  );
}
