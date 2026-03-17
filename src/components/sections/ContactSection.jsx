import { contactLinks } from '../../data/portfolioData';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Contacto"
          title="Si tienes una idea, la convertimos en una experiencia web"
          description="Canales directos para colaborar en sitios y productos frontend de alto impacto visual."
        />

        <div className={styles.grid}>
          {contactLinks.map((item) => (
            <GlassCard key={item.label} as="a" className={styles.contactCard} href={item.href} target="_blank" rel="noreferrer">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </GlassCard>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <Button as="a" href="https://wa.link/lq502m" target="_blank" rel="noreferrer" variant="primary">
            Iniciar conversacion
          </Button>
          <Button as="a" href="https://github.com/Y4ELX" target="_blank" rel="noreferrer" variant="ghost">
            Revisar codigo
          </Button>
        </div>
      </div>
    </section>
  );
}
