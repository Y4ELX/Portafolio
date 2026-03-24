import React, { useEffect, useRef, useState } from 'react';
import styles from './inverted-cursor.module.css';

interface CursorProps {
  size?: number;
  inverted?: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ size = 60, inverted = false }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canEnableCursor = hasFinePointer && !prefersReducedMotion;

    if (!canEnableCursor) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add('cursor-hidden');

    const handleMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        const nextX = event.clientX - size / 2;
        const nextY = event.clientY - size / 2;
        cursorRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
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
    };
  }, [size]);

  if (!enabled) {
    return null;
  }

  const cursorClasses = [styles.cursor, inverted ? styles.inverted : '', visible ? styles.visible : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.cursorLayer} aria-hidden="true">
      <div ref={cursorRef} className={cursorClasses} style={{ width: size, height: size }} />
    </div>
  );
};

export default Cursor;
