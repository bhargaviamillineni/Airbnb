import { Laurel } from "@/components/ui/Laurel";
import { TextLink } from "@/components/ui/TextLink";
import { getIcon } from "@/lib/icons";
import type { RatingCategory } from "@/data/listing-data";

const CATEGORY_ICONS: Record<string, string> = {
  Cleanliness: "spray",
  Accuracy: "check",
  "Check-in": "key",
  Communication: "message",
  Location: "map",
  Value: "tag",
};

export interface RatingBreakdownProps {
  rating: number;
  reviewCount: number;
  categories: RatingCategory[];
  ratingDistribution?: number[];
}

const STAR_LEVELS = [5, 4, 3, 2, 1] as const;

export function RatingBreakdown({
  rating,
  reviewCount,
  categories,
  ratingDistribution,
}: RatingBreakdownProps) {
  const distribution = ratingDistribution ?? [100, 11, 0, 0, 0];

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <Laurel side="left" />
          <span className="text-6xl font-semibold tracking-tight text-primary">
            {rating}
          </span>
          <Laurel side="right" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-primary">Guest favourite</h2>
        <p className="mt-1 max-w-sm text-sm text-secondary">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <TextLink className="mt-2 text-sm">How reviews work</TextLink>
      </div>

      <div className="mt-10 grid grid-cols-7 gap-4 border-b border-[var(--color-border-light)] pb-8">
        <div className="pr-4">
          <p className="text-sm font-medium text-primary">Overall rating</p>
          <ul className="mt-2 space-y-1">
            {STAR_LEVELS.map((level, idx) => (
              <li key={level} className="flex items-center gap-2">
                <span className="w-2 text-[10px] text-secondary">{level}</span>
                <span className="h-0.5 flex-1 bg-[var(--color-border-light)]">
                  <span
                    className="block h-full bg-[var(--color-text-primary)]"
                    style={{ width: `${distribution[idx] ?? 0}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
        {categories.map((category) => {
          const Icon = getIcon(CATEGORY_ICONS[category.name] ?? "bell");
          return (
            <div
              key={category.name}
              className="border-l border-[var(--color-border-light)] pl-4"
            >
              <p className="text-sm font-medium text-primary">{category.name}</p>
              <p className="mt-1 text-lg font-semibold text-primary">
                {category.score.toFixed(1)}
              </p>
              <Icon
                size={24}
                strokeWidth={1.4}
                className="mt-6 text-primary"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      <p className="sr-only">{reviewCount} reviews total</p>
    </>
  );
}
