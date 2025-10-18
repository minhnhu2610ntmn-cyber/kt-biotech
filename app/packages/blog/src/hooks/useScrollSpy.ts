'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to track which section is currently visible based on scroll position
 */
export const useScrollSpy = (sectionIds: string[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Find the entry with the largest intersection ratio
        let maxRatio = 0;
        let maxEntry = null;

        entries.forEach(entry => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxEntry = entry;
          }
        });

        if (
          maxEntry &&
          (maxEntry as IntersectionObserverEntry).intersectionRatio > 0
        ) {
          const target = (maxEntry as IntersectionObserverEntry)
            .target as HTMLElement;
          setActiveId(target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
};

/**
 * Hook to handle smooth scrolling to sections
 */
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { scrollToSection };
};
