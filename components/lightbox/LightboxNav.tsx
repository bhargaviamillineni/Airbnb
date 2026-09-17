import { ChevronLeft, ChevronRight } from "lucide-react";

import { IconButton } from "@/components/ui/IconButton";

export interface LightboxNavProps {
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxNav({ onPrev, onNext }: LightboxNavProps) {
  return (
    <>
      <IconButton
        aria-label="Previous photo"
        onClick={onPrev}
        className="absolute left-6 text-text-inverse hover:bg-white/10"
      >
        <ChevronLeft size={28} />
      </IconButton>
      <IconButton
        aria-label="Next photo"
        onClick={onNext}
        className="absolute right-6 text-text-inverse hover:bg-white/10"
      >
        <ChevronRight size={28} />
      </IconButton>
    </>
  );
}
