import { SectionHeading } from "@/components/listing/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getIcon } from "@/lib/icons";
import type { PolicySection } from "@/data/listing-data";

export interface HouseRulesProps {
  policies: PolicySection[];
}

const POLICY_ICONS = ["calendar", "key", "shield"] as const;

export function HouseRules({ policies }: HouseRulesProps) {
  return (
    <section aria-label="Things to know">
      <SectionHeading>Things to know</SectionHeading>
      <div className="mt-8 grid grid-cols-3 gap-8">
        {policies.map((policy, index) => {
          const Icon = getIcon(POLICY_ICONS[index] ?? "bell");
          return (
            <div key={policy.title}>
              <div className="mb-3 flex items-center gap-2">
                <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-semibold text-primary">{policy.title}</h3>
              </div>
              <ul className="space-y-2">
                {policy.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-primary">
                    {item}
                  </li>
                ))}
              </ul>
              <TextLink className="mt-3 text-sm">Learn more</TextLink>
            </div>
          );
        })}
      </div>
    </section>
  );
}
