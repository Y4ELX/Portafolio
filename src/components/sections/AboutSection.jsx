import { profile } from '../../data/portfolioData';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import styles from './AboutSection.module.css';

function getAge(dateString) {
  const birthdate = new Date(dateString);
  const now = new Date();
  let age = now.getFullYear() - birthdate.getFullYear();
  const monthDiff = now.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())) {
    age -= 1;
  }

  return age;
}

export default function AboutSection() {
  const age = getAge(profile.birthdate);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Acerca de mi"
          title="Construyo experiencias frontend con enfoque en detalle"
          description="Mantengo la esencia tech de mi estilo, pero con una ejecucion mas madura: arquitectura limpia, interfaces elegantes y foco real en calidad de producto."
        />

        <GlassCard className={styles.contentCard}>
          <p>
            Tengo <strong>{age} anos</strong>. {profile.longIntro}{' '}
            <a href={profile.universityUrl} target="_blank" rel="noreferrer">
              {profile.universityName}
            </a>
            .
          </p>
          <p>
            Me gusta combinar precision tecnica con una capa visual fuerte para que cada proyecto no solo funcione bien, sino que tambien se sienta memorable.
          </p>

          <div className={styles.actions}>
            <Button as="a" href="https://github.com/Y4ELX" target="_blank" rel="noreferrer" variant="ghost">
              Ver GitHub
            </Button>
            <Button as="a" href="https://wa.link/lq502m" target="_blank" rel="noreferrer" variant="primary">
              Escribirme por WhatsApp
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
