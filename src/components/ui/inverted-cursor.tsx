import React, { useEffect, useRef, useState } from 'react';
import styles from './inverted-cursor.module.css';

interface CursorProps {
  size?: number;
  inverted?: boolean;
  hoverScale?: number;
}

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, summary, label, [role="button"], [data-cursor="pointer"]';

export const Cursor: React.FC<CursorProps> = ({ size = 60, inverted = false, hoverScale = 0.55 }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const pointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncEnabledState = () => {
      const canEnable = pointerMedia.matches && !motionMedia.matches && window.innerWidth > 1100;
      setEnabled(canEnable);
    };

    syncEnabledState();
    window.addEventListener('resize', syncEnabledState);

    if (typeof pointerMedia.addEventListener === 'function') {
      pointerMedia.addEventListener('change', syncEnabledState);
      motionMedia.addEventListener('change', syncEnabledState);
    } else {
      pointerMedia.addListener(syncEnabledState);
      motionMedia.addListener(syncEnabledState);
    }

    return () => {
      window.removeEventListener('resize', syncEnabledState);
      if (typeof pointerMedia.removeEventListener === 'function') {
        pointerMedia.removeEventListener('change', syncEnabledState);
        motionMedia.removeEventListener('change', syncEnabledState);
      } else {
        pointerMedia.removeListener(syncEnabledState);
        motionMedia.removeListener(syncEnabledState);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('cursor-hidden');
      setVisible(false);
      interactiveRef.current = false;
      setIsInteractive(false);
      return;
    }

    document.documentElement.classList.add('cursor-hidden');

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const nextInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));

      if (interactiveRef.current !== nextInteractive) {
        interactiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`;
        cursorRef.current.style.top = `${event.clientY}px`;
      }
      setVisible(true);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('cursor-hidden');
      interactiveRef.current = false;
      setIsInteractive(false);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const cursorClasses = [
    styles.cursor,
    visible ? styles.visible : '',
    inverted ? styles.inverted : '',
    isInteractive ? styles.cursorSmall : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={cursorRef}
      className={cursorClasses}
      style={{ width: size, height: size, '--cursor-hover-scale': hoverScale } as React.CSSProperties}
      aria-hidden="true"
    />
  );
};

export default Cursor;
