import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { contactLinks } from '../../data/portfolioData';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import styles from './ContactSection.module.css';

const ICON_BY_ID = {
  github: FiGithub,
  email: FiMail,
  linkedin: FiLinkedin,
};
const HUE_BY_ID = {
  github: 214,
  email: 168,
  linkedin: 198,
};

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Contacto"
          title="Si buscas construir una experiencia web moderna, hablemos"
          description="Estos son mis canales directos para colaboraciones, proyectos freelance y oportunidades profesionales."
        />

        <div className={styles.grid}>
          {contactLinks.map((item) => {
            const Icon = ICON_BY_ID[item.id] ?? FiMail;
            const isExternal = !item.href.startsWith('mailto:');
            const hue = HUE_BY_ID[item.id] ?? 180;

            return (
              <GlassCard
                key={item.id}
                as="a"
                className={styles.contactCard}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                style={{ '--contact-hue': `${hue}` }}
              >
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={18} className={styles.iconSvg} />
                </span>

                <div className={styles.copy}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <span className={styles.arrowWrap} aria-hidden="true">
                  <FiArrowUpRight size={16} />
                </span>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
