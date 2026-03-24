import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    return 'actualmente estoy por egresar de Ingeniería en Sistemas Computacionales y Electrónicos';
  }

  return 'soy Ingeniero en Sistemas Computacionales y Electrónicos';
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
  const fineHoverRef = useRef(false);
  const hoverSessionRef = useRef({ locked: false, index: null });
  const [ratios, setRatios] = useState(() => POLAROID_IMAGES.map(() => DEFAULT_RATIO));
  const [activePolaroid, setActivePolaroid] = useState(null);
  const activePolaroidIndex = activePolaroid?.index ?? null;
  const randomRotations = useMemo(
    () => POLAROID_IMAGES.map(() => Number((Math.random() * 18 - 9).toFixed(2))),
    []
  );

  const introText = (
    <>
      <strong>Tengo {age} años</strong>, soy <strong>técnico en Programación</strong> y{' '}
      <strong>{academicStatus}</strong>.
    </>
  );

  const detailText = (
    <>
      Desde pequeño me ha apasionado la tecnología, y con el tiempo esa curiosidad se convirtió en una forma de crear
      soluciones, resolver problemas y transformar ideas en experiencias digitales.
    </>
  );

  const stackText = (
    <>
      Disfruto desarrollar proyectos completos que integran diseño, lógica y funcionalidad, con especial interés en
      interfaces web modernas, experiencias interactivas y productos bien construidos de principio a fin. He trabajado
      con <strong>React, Angular, Firebase, JavaScript, TypeScript y Python</strong>.
    </>
  );

  const growthText = (
    <>
      Me interesa seguir creciendo en desarrollo frontend, experiencia de usuario y construcción de productos digitales
      con identidad visual sólida.
    </>
  );

  const updateFocusPosition = useCallback((index) => {
    const slot = cardRefs.current[index];
    if (!slot) {
      return;
    }

    const rect = slot.getBoundingClientRect();
    const targetX = window.innerWidth * 0.5;
    const targetY = window.innerHeight * 0.52;
    const translateX = targetX - (rect.left + rect.width / 2);
    const translateY = targetY - (rect.top + rect.height / 2);

    setActivePolaroid((prev) => {
      if (
        prev &&
        prev.index === index &&
        Math.abs(prev.translateX - translateX) < 0.5 &&
        Math.abs(prev.translateY - translateY) < 0.5
      ) {
        return prev;
      }

      return {
        index,
        translateX,
        translateY,
      };
    });
  }, []);

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
    if (activePolaroidIndex === null) {
      return;
    }

    let frameId = null;
    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateFocusPosition(activePolaroidIndex);
      });
    };

    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [activePolaroidIndex, updateFocusPosition]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      fineHoverRef.current = media.matches;
    };

    sync();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', sync);
      return () => media.removeEventListener('change', sync);
    }

    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

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

    if (!fineHoverRef.current) {
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

    if (!fineHoverRef.current) {
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

  const handleColumnPointerDown = (event) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

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
      if (Math.abs(prev[index] - ratio) < 0.01) {
        return prev;
      }

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
            <SectionHeader eyebrow="Acerca de mí" title="Acerca de mí" description={introText} />
            <p className={styles.paragraph}>{detailText}</p>
            <p className={styles.paragraph}>{stackText}</p>
            <p className={styles.paragraph}>{growthText}</p>
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
                        decoding="async"
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
