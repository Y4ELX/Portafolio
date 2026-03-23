import { useEffect, useRef, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const activeSectionRef = useRef(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    let frameId = null;
    const updateActiveSection = (nextSectionId) => {
      if (!nextSectionId || nextSectionId === activeSectionRef.current) {
        return;
      }

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        if (nextSectionId === activeSectionRef.current) {
          return;
        }
        activeSectionRef.current = nextSectionId;
        setActiveSection(nextSectionId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let nextCandidate = null;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          if (
            !nextCandidate ||
            entry.intersectionRatio > nextCandidate.intersectionRatio ||
            (entry.intersectionRatio === nextCandidate.intersectionRatio &&
              entry.boundingClientRect.top < nextCandidate.boundingClientRect.top)
          ) {
            nextCandidate = entry;
          }
        });

        if (nextCandidate) {
          updateActiveSection(nextCandidate.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-32% 0px -52% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [sectionIds]);

  return activeSection;
}
