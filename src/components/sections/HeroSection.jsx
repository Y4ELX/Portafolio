import { useEffect, useState } from 'react';
import { profile } from '../../data/portfolioData';
import Button from '../ui/Button';
import { SpecialText } from '../ui/special-text';
import LogoCanvas from '../three/LogoCanvas';
import styles from './HeroSection.module.css';

const PRETITLE_TEXT = 'Hola, mi nombre es';
const PRETITLE_TYPE_SPEED_MS = 85;
const NAME_REVEAL_SPEED_MS = 30;
const NAME_REVEAL_DELAY_SECONDS = 2;

function scrollTo(sectionId) {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroSection() {
  const [typedPretitle, setTypedPretitle] = useState('');

  useEffect(() => {
    let index = 0;

    const typeInterval = window.setInterval(() => {
      index += 1;
      setTypedPretitle(PRETITLE_TEXT.slice(0, index));

      if (index >= PRETITLE_TEXT.length) {
        window.clearInterval(typeInterval);
      }
    }, PRETITLE_TYPE_SPEED_MS);

    return () => window.clearInterval(typeInterval);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          <p className={styles.pretitleTerminal} aria-label={PRETITLE_TEXT}>
            <span>{typedPretitle}</span>
            <span className={styles.terminalCursor} aria-hidden="true">
              |
            </span>
          </p>
          <h1 className={styles.heroTitle}>
            <SpecialText className={styles.nameReveal} speed={NAME_REVEAL_SPEED_MS} delay={NAME_REVEAL_DELAY_SECONDS}>
              {profile.name}
            </SpecialText>
          </h1>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.description}>{profile.shortIntro}</p>

          <div className={styles.actions}>
            <Button onClick={() => scrollTo('projects')} variant="primary">
              Ver proyectos
            </Button>
            <Button onClick={() => scrollTo('contact')} variant="ghost">
              Contactarme
            </Button>
          </div>
        </div>

        <div className={styles.visualBlock}>
          <LogoCanvas />
        </div>
      </div>
    </section>
  );
}
