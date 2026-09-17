import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import type { ListingPhoto } from "@/data/listing-data";

export interface LightboxImageProps {
  photo: ListingPhoto | undefined;
  direction: number;
  keyId: string;
}

export function LightboxImage({ photo, direction, keyId }: LightboxImageProps) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.28;

  if (!photo) return null;

  return (
    <div className="relative h-full w-full max-w-5xl overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={keyId}
          className="absolute inset-0"
          custom={direction}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: direction >= 0 ? 72 : -72 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: direction >= 0 ? -72 : 72 }
          }
          transition={{ duration, ease: [0.2, 0, 0, 1] }}
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
