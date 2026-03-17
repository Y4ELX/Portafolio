import { useEffect, useState } from 'react';

const SCROLL_GAP = 6;

export function useNavbarVisibility() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 32);

      if (Math.abs(currentY - lastY) < SCROLL_GAP) {
        return;
      }

      const scrollingDown = currentY > lastY;
      setIsHidden(scrollingDown && currentY > 140);
      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { isHidden, isScrolled };
}
