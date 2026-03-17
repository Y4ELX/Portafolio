import { useEffect } from 'react';

const SCROLLED_OFFSET = 32;
const HIDE_OFFSET = 140;
const MIN_DELTA = 10;
const HIDE_DELTA = 28;
const SHOW_DELTA = 20;

export function useNavbarVisibility(navbarRef) {
  useEffect(() => {
    const navbar = navbarRef?.current;
    if (!navbar) {
      return;
    }

    let lastY = window.scrollY;
    let latestY = lastY;
    let frameId = null;
    let directionDelta = 0;
    let hiddenRef = false;
    let scrolledRef = lastY > SCROLLED_OFFSET;

    navbar.style.setProperty('--nav-offset', '0px');
    navbar.style.setProperty('--nav-border', scrolledRef ? 'var(--border-soft)' : 'transparent');
    navbar.style.setProperty(
      '--nav-bg',
      scrolledRef ? 'color-mix(in srgb, var(--bg-primary) 92%, transparent)' : 'transparent'
    );

    const update = () => {
      frameId = null;
      const currentY = latestY;
      const delta = currentY - lastY;

      const nextScrolled = currentY > SCROLLED_OFFSET;
      if (nextScrolled !== scrolledRef) {
        scrolledRef = nextScrolled;
        navbar.style.setProperty('--nav-border', nextScrolled ? 'var(--border-soft)' : 'transparent');
        navbar.style.setProperty(
          '--nav-bg',
          nextScrolled ? 'color-mix(in srgb, var(--bg-primary) 92%, transparent)' : 'transparent'
        );
      }

      if (Math.abs(delta) < MIN_DELTA) {
        return;
      }

      const directionChanged = (delta > 0 && directionDelta < 0) || (delta < 0 && directionDelta > 0);
      if (directionChanged) {
        directionDelta = 0;
      }
      directionDelta += delta;

      if (!hiddenRef && currentY > HIDE_OFFSET && directionDelta > HIDE_DELTA) {
        hiddenRef = true;
        directionDelta = 0;
        navbar.style.setProperty('--nav-offset', 'calc(-100% - 1px)');
      } else if (hiddenRef && directionDelta < -SHOW_DELTA) {
        hiddenRef = false;
        directionDelta = 0;
        navbar.style.setProperty('--nav-offset', '0px');
      }

      lastY = currentY;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (frameId !== null) {
        return;
      }
      frameId = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      navbar.style.setProperty('--nav-offset', '0px');
    };
  }, [navbarRef]);
}
