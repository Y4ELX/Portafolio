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

      activeSectionRef.current = nextSectionId;
      setActiveSection(nextSectionId);
    };

    const detectActiveSection = () => {
      const viewportHeight = window.innerHeight || 0;
      const probeY = window.scrollY + Math.min(viewportHeight * 0.42, 360);
      const pageBottom = window.scrollY + viewportHeight;
      const maxScroll = document.documentElement.scrollHeight - 2;

      if (pageBottom >= maxScroll) {
        updateActiveSection(sections[sections.length - 1].id);
        return;
      }

      let nextId = sections[0].id;
      for (const section of sections) {
        const top = window.scrollY + section.getBoundingClientRect().top;
        if (probeY >= top) {
          nextId = section.id;
        } else {
          break;
        }
      }

      updateActiveSection(nextId);
    };

    const scheduleDetect = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        detectActiveSection();
      });
    };

    detectActiveSection();
    window.addEventListener('scroll', scheduleDetect, { passive: true });
    window.addEventListener('resize', scheduleDetect);

    return () => {
      window.removeEventListener('scroll', scheduleDetect);
      window.removeEventListener('resize', scheduleDetect);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [sectionIds]);

  return activeSection;
}
