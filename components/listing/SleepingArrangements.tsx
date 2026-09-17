import Image from "next/image";

import { SectionHeading } from "@/components/listing/SectionHeading";
import type { SleepingArrangement } from "@/data/listing-data";

export interface SleepingArrangementsProps {
  arrangements: SleepingArrangement[];
}

export function SleepingArrangements({ arrangements }: SleepingArrangementsProps) {
  return (
    <section aria-label="Where you'll sleep">
      <SectionHeading>Where you&apos;ll sleep</SectionHeading>
      <ul className="mt-6 flex gap-4">
        {arrangements.map((room) => (
          <li key={room.id} className="w-[var(--size-sleep-card)]">
            <div className="relative h-[var(--size-sleep-image)] w-full overflow-hidden rounded-[var(--radius-md)]">
              <Image
                src={room.imageUrl}
                alt={room.roomName}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <p className="mt-3 font-medium text-primary">{room.roomName}</p>
            <p className="text-sm text-secondary">{room.bedDescription}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
