import { getIcon } from "@/lib/icons";
import type { Highlight } from "@/data/listing-data";

export interface HighlightsProps {
  highlights: Highlight[];
}

export function Highlights({ highlights }: HighlightsProps) {
  return (
    <ul className="flex flex-col gap-6">
      {highlights.map((highlight) => {
        const Icon = getIcon(highlight.icon);

        return (
          <li key={highlight.id} className="flex gap-4">
            <Icon
              size={24}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <h4 className="font-medium text-primary">{highlight.title}</h4>
              <p className="mt-0.5 text-sm text-secondary">{highlight.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
