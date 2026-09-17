"use client";

import { useEffect, useState } from "react";

export function useStickySectionNav(sectionIds: readonly string[]): {
  visible: boolean;
  activeId: string;
} {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const firstId = idsKey.split(",")[0];
    const first = document.getElementById(firstId ?? "");
    if (!first) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-88px 0px 0px 0px" },
    );

    observer.observe(first);
    return () => observer.disconnect();
  }, [idsKey]);

  useEffect(() => {
    const ids = idsKey.split(",");
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = intersecting[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [idsKey]);

  return { visible, activeId };
}
