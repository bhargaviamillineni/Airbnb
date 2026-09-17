import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "outline" | "solid";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const VARIANT: Record<BadgeVariant, string> = {
  default:
    "border border-[var(--color-border-light)] bg-surface text-primary",
  outline:
    "border border-[var(--color-text-primary)] bg-transparent text-primary",
  solid:
    "border border-transparent bg-brand text-text-inverse",
};

const SIZE: Record<BadgeSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
