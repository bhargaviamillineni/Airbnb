import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  size?: IconButtonSize;
  children: ReactNode;
}

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function IconButton({
  size = "md",
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full text-primary transition-colors duration-[var(--duration-normal)] ease-[var(--ease-default)] hover:bg-surface-muted ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
