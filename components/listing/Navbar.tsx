import { Globe, House, Menu, Search } from "lucide-react";
import Link from "next/link";

import { AirbnbLogo } from "@/components/ui/AirbnbLogo";

export function Navbar() {
  return (
    <header className="border-b border-[var(--color-border-light)] bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-modal)] focus:rounded-[var(--radius-sm)] focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--layout-max-width)] items-center justify-between px-[var(--layout-content-padding)]">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Airbnb homepage">
          <AirbnbLogo />
        </Link>

        <div className="flex flex-1 justify-center px-6">
          <div
            className="flex items-center rounded-full border border-[var(--color-border)] bg-surface py-1.5 pl-2 pr-2 shadow-sm"
            role="search"
          >
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-surface-muted text-primary"
                aria-hidden="true"
              >
                <House size={16} strokeWidth={1.75} />
              </span>
              Anywhere
            </button>
            <span className="h-6 w-px bg-[var(--color-border)]" aria-hidden="true" />
            <button type="button" className="px-4 py-2 text-sm font-semibold text-primary">
              Anytime
            </button>
            <span className="h-6 w-px bg-[var(--color-border)]" aria-hidden="true" />
            <button type="button" className="px-4 py-2 text-sm text-secondary">
              Add guests
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-text-inverse"
              aria-label="Search"
            >
              <Search size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="#host"
            className="rounded-full px-4 py-3 text-sm font-medium text-primary transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted"
          >
            Become a host
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-[var(--duration-normal)] hover:bg-surface-muted"
            aria-label="Choose a language and currency"
          >
            <Globe size={16} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] transition-shadow duration-[var(--duration-normal)] hover:shadow-md"
            aria-label="Main navigation menu"
          >
            <Menu size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
