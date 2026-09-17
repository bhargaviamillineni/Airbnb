import { Shield } from "lucide-react";

import { SectionHeading } from "@/components/listing/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { getIcon } from "@/lib/icons";
import type { Host } from "@/data/listing-data";

export interface HostProfileProps {
  host: Host;
}

export function HostProfile({ host }: HostProfileProps) {
  return (
    <section id="host" aria-label="Meet your host">
      <SectionHeading>Meet your host</SectionHeading>

      <div className="mt-8 grid grid-cols-[var(--size-host-card)_1fr] gap-12">
        <div>
          <div className="rounded-[var(--radius-lg)] bg-surface p-8 shadow-card">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span
                  className="relative inline-flex h-[var(--size-avatar-lg)] w-[var(--size-avatar-lg)] items-center justify-center rounded-full bg-[var(--color-host-avatar-bg)] text-center text-[11px] font-bold uppercase leading-tight text-text-inverse"
                  aria-hidden="true"
                >
                  Mirashya
                  <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] text-text-inverse">
                    ✓
                  </span>
                </span>
                <p className="mt-3 text-center text-xl font-semibold leading-tight text-primary">
                  {host.name}
                </p>
                <p className="text-sm text-secondary">Host</p>
              </div>
              <div className="flex flex-col gap-3 text-left">
                <div>
                  <p className="text-xl font-semibold text-primary">
                    {host.reviewCount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-secondary">Reviews</p>
                </div>
                <div className="border-t border-[var(--color-border-light)] pt-3">
                  <p className="text-xl font-semibold text-primary">{host.rating}★</p>
                  <p className="text-xs text-secondary">Rating</p>
                </div>
                <div className="border-t border-[var(--color-border-light)] pt-3">
                  <p className="text-xl font-semibold text-primary">{host.yearsHosting}</p>
                  <p className="text-xs text-secondary">Years hosting</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {host.facts.map((fact) => {
              const Icon = getIcon(fact.icon);
              return (
                <li key={fact.text} className="flex items-center gap-3 text-sm text-primary">
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  {fact.text}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-primary">Co-Hosts</h3>
          <ul className="mt-4 grid grid-cols-3 gap-y-4">
            {host.coHosts.map((coHost) => (
              <li key={coHost.name} className="flex items-center gap-2">
                <Avatar name={coHost.name} initial={coHost.initial} color={coHost.color} />
                <span className="text-sm text-primary">{coHost.name}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-semibold text-primary">Host details</h3>
          <p className="mt-3 text-sm text-primary">Response rate: {host.responseRate}</p>
          <p className="text-sm text-primary">Responds {host.responseTime}</p>

          <button
            type="button"
            className="mt-6 rounded-[var(--radius-sm)] bg-surface-muted px-6 py-3 text-base font-semibold text-primary"
          >
            Message host
          </button>

          <p className="mt-8 flex items-start gap-2 text-xs text-secondary">
            <Shield size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            To help protect your payment, always use Airbnb to send money and communicate with
            hosts.
          </p>
        </div>
      </div>
    </section>
  );
}
