import { profile } from '../../data/portfolioData';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import LogoCanvas from '../three/LogoCanvas';
import styles from './HeroSection.module.css';

function scrollTo(sectionId) {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          <p className={styles.pretitle}>Hola, mi nombre es</p>
          <h1>{profile.name}</h1>
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

          <ul className={styles.quickFacts}>
            <li>
              <strong>UI cuidada</strong>
              <span>Dise�o visual con identidad propia</span>
            </li>
            <li>
              <strong>3D moderno</strong>
              <span>Escenas fluidas y optimizadas</span>
            </li>
            <li>
              <strong>Arquitectura limpia</strong>
              <span>Componentes mantenibles y escalables</span>
            </li>
          </ul>
        </div>

        <div className={styles.visualBlock}>
          <div className={styles.glow} aria-hidden="true" />
          <LogoCanvas />
        </div>
      </div>
    </section>
  );
}
