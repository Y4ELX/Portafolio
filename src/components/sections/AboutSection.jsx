import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import styles from './AboutSection.module.css';

const BIRTH_DATE = new Date(2005, 3, 23);
const AUGUST_2026_END_EXCLUSIVE = new Date(2026, 8, 1);
const DEFAULT_RATIO = 4 / 5;

const POLAROID_IMAGES = [
  { src: '/img/polaroid/kid.jpeg', alt: 'Foto personal 1', caption: 'Mis inicios en la tecnología' },
  { src: '/img/polaroid/certi.jpeg', alt: 'Foto personal 2', caption: 'Presentando mi proyecto' },
  { src: '/img/polaroid/uneverso.jpeg', alt: 'Foto personal 3', caption: 'Compartiendo mi carrera' },
  { src: '/img/polaroid/google.jpeg', alt: 'Foto personal 4', caption: 'Aprendiendo en Talent Land 2025' },
];

function supportsFineHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getWidthFactor(ratio) {
  if (ratio > 1.05) {
    return 1.22;
  }

  if (ratio < 0.76) {
    return 1.04;
  }

  return 1.14;
}

function getAgeFromBirthDate(birthDate) {
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

function getAcademicStatus(now) {
  const isBeforeOrDuringAugust2026 = now < AUGUST_2026_END_EXCLUSIVE;

  if (isBeforeOrDuringAugust2026) {
    return 'actualmente estoy por egresar de Ingenieria en Sistemas Computacionales y Electronicos';
  }

  return 'soy Ingeniero en Sistemas Computacionales y Electronicos';
}

export default function AboutSection() {
  const now = new Date();
  const age = getAgeFromBirthDate(BIRTH_DATE);
  const academicStatus = getAcademicStatus(now);
  const cardRefs = useRef([]);
  const visualRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const tiltRafRef = useRef(null);
  const latestPointerRef = useRef(null);
  const hoverSessionRef = useRef({ locked: false, index: null });
  const [ratios, setRatios] = useState(() => POLAROID_IMAGES.map(() => DEFAULT_RATIO));
  const [activePolaroid, setActivePolaroid] = useState(null);
  const randomRotations = useMemo(
    () => POLAROID_IMAGES.map(() => Number((Math.random() * 18 - 9).toFixed(2))),
    []
  );

  const introText = `Tengo ${age} años, soy técnico en Programación y ${academicStatus}.`;
  const detailText =
    'Desde muy pequeño me ha apasionado la tecnología, y con el tiempo esa curiosidad se convirtió en una forma de crear, resolver problemas y dar vida a ideas a través del desarrollo.';
  const stackText =
    'Disfruto construir proyectos completos que combinan diseño, lógica y funcionalidad, especialmente en desarrollo web y software. He trabajado con React, Angular, Firebase, JavaScript, TypeScript y Python para crear experiencias modernas, útiles y bien pensadas.';

  const updateFocusPosition = (index) => {
    const slot = cardRefs.current[index];
    if (!slot) {
      return;
    }

    const rect = slot.getBoundingClientRect();
    const targetX = window.innerWidth * 0.5;
    const targetY = window.innerHeight * 0.52;
    const translateX = targetX - (rect.left + rect.width / 2);
    const translateY = targetY - (rect.top + rect.height / 2);

    setActivePolaroid((prev) => ({
      index,
      translateX,
      translateY,
    }));
  };

  const updateGroupTilt = (clientX, clientY) => {
    if (!visualRef.current) {
      return;
    }

    const rect = visualRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const pointerX = (clientX - rect.left) / rect.width;
    const pointerY = (clientY - rect.top) / rect.height;
    const tiltY = clamp((pointerX - 0.5) * 14, -8, 8);
    const tiltX = clamp((0.5 - pointerY) * 12, -7, 7);

    visualRef.current.style.setProperty('--group-tilt-x', `${tiltX}deg`);
    visualRef.current.style.setProperty('--group-tilt-y', `${tiltY}deg`);
  };

  const scheduleTiltUpdate = (clientX, clientY) => {
    latestPointerRef.current = { clientX, clientY };
    if (tiltRafRef.current) {
      return;
    }

    tiltRafRef.current = window.requestAnimationFrame(() => {
      tiltRafRef.current = null;
      if (!latestPointerRef.current) {
        return;
      }

      updateGroupTilt(latestPointerRef.current.clientX, latestPointerRef.current.clientY);
    });
  };

  const resetGroupTilt = () => {
    if (!visualRef.current) {
      return;
    }

    visualRef.current.style.setProperty('--group-tilt-x', '0deg');
    visualRef.current.style.setProperty('--group-tilt-y', '0deg');
    if (tiltRafRef.current) {
      window.cancelAnimationFrame(tiltRafRef.current);
      tiltRafRef.current = null;
    }
  };

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!activePolaroid) {
      return;
    }

    const update = () => updateFocusPosition(activePolaroid.index);

    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [activePolaroid]);

  useEffect(
    () => () => {
      clearLeaveTimer();
      if (tiltRafRef.current) {
        window.cancelAnimationFrame(tiltRafRef.current);
      }
    },
    []
  );

  const handleSlotEnter = (index, event) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    clearLeaveTimer();

    if (!supportsFineHover()) {
      return;
    }

    if (hoverSessionRef.current.locked && hoverSessionRef.current.index !== index) {
      return;
    }

    hoverSessionRef.current = {
      locked: true,
      index,
    };
    updateFocusPosition(index);
    scheduleTiltUpdate(event.clientX, event.clientY);
  };

  const handleColumnMove = (event) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    if (!supportsFineHover()) {
      return;
    }

    scheduleTiltUpdate(event.clientX, event.clientY);
  };

  const handleColumnLeave = (event) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    clearLeaveTimer();
    leaveTimerRef.current = window.setTimeout(() => {
      setActivePolaroid(null);
      hoverSessionRef.current = { locked: false, index: null };
      resetGroupTilt();
    }, 90);
  };

  const handleColumnEnter = () => {
    clearLeaveTimer();
    hoverSessionRef.current = { locked: false, index: null };
    resetGroupTilt();
  };

  const handleSlotPointerDown = (event, index) => {
    if (event.pointerType === 'mouse') {
      return;
    }

    if (activePolaroid?.index === index) {
      setActivePolaroid(null);
      hoverSessionRef.current = { locked: false, index: null };
      return;
    }

    hoverSessionRef.current = { locked: true, index };
    updateFocusPosition(index);
  };

  const handleColumnPointerDown = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('[data-polaroid-slot="true"]')) {
      return;
    }

    setActivePolaroid(null);
    hoverSessionRef.current = { locked: false, index: null };
  };

  const handleImageLoad = (event, index) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) {
      return;
    }

    const ratio = clamp(naturalWidth / naturalHeight, 0.62, 1.45);
    setRatios((prev) => {
      const next = [...prev];
      next[index] = ratio;
      return next;
    });
  };

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.textColumn}>
            <SectionHeader eyebrow="ABOUT ME" title="Acerca de mi" description={introText} />
            <p className={styles.paragraph}>{detailText}</p>
            <p className={styles.paragraph}>{stackText}</p>
          </div>

          <div
            ref={visualRef}
            className={`${styles.visualColumn} ${activePolaroid ? styles.visualFocused : ''}`.trim()}
            aria-label="Galeria personal estilo polaroid"
            onPointerEnter={handleColumnEnter}
            onPointerMove={handleColumnMove}
            onPointerLeave={handleColumnLeave}
            onPointerDown={handleColumnPointerDown}
          >
            <div className={styles.focusOverlay} aria-hidden="true" />

            {POLAROID_IMAGES.map((image, index) => {
              const ratio = ratios[index] || DEFAULT_RATIO;
              const isActive = activePolaroid?.index === index;
              const widthFactor = getWidthFactor(ratio);

              return (
                <div
                  key={image.src}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  data-polaroid-slot="true"
                  className={`${styles.polaroidSlot} ${styles[`polaroid${index + 1}`]} ${
                    isActive ? styles.polaroidSlotActive : ''
                  }`.trim()}
                  onPointerEnter={(event) => handleSlotEnter(index, event)}
                  onPointerDown={(event) => handleSlotPointerDown(event, index)}
                  style={{
                    '--width-factor': widthFactor,
                    rotate: `${isActive ? 0 : randomRotations[index]}deg`,
                  }}
                >
                  <article
                    className={`${styles.polaroid} ${isActive ? styles.polaroidActive : ''}`.trim()}
                    style={{
                      '--photo-ratio': ratio,
                      '--focus-x': isActive ? `${activePolaroid.translateX}px` : '0px',
                      '--focus-y': isActive ? `${activePolaroid.translateY}px` : '0px',
                    }}
                  >
                    <div className={styles.photoFrame}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        onLoad={(event) => handleImageLoad(event, index)}
                      />
                    </div>
                    <p className={styles.caption}>{image.caption}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
