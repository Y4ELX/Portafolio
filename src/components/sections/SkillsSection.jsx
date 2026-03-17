import { skillsByCategory } from '../../data/portfolioData';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import Tag from '../ui/Tag';
import styles from './SkillsSection.module.css';

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Habilidades"
          title="Stack organizado para crear interfaces premium"
          description="No es una lista plana: esta distribuido por bloques de trabajo reales para desarrollo frontend moderno."
        />

        <div className={styles.grid}>
          {skillsByCategory.map((category) => (
            <GlassCard key={category.category} className={styles.skillCard}>
              <h3>{category.category}</h3>
              <div className={styles.tags}>
                {category.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
