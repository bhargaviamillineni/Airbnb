import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface TextLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function TextLink({ children, className = "", ...props }: TextLinkProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2 transition-colors duration-[var(--duration-normal)] hover:text-secondary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
