import { projects } from '../../data/portfolioData';
import SectionHeader from '../ui/SectionHeader';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import styles from './ProjectsSection.module.css';

function ProjectCard({ project }) {
  return (
    <GlassCard className={`${styles.card} ${project.featured ? styles.featured : ''}`.trim()}>
      <div className={styles.imageWrap}>
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      <div className={styles.cardBody}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className={styles.stack}>
          {project.stack.map((tech) => (
            <Tag key={`${project.title}-${tech}`}>{tech}</Tag>
          ))}
        </div>

        <div className={styles.actions}>
          <Button as="a" href={project.codeUrl} target="_blank" rel="noreferrer" variant="ghost">
            Codigo
          </Button>
          {project.liveUrl !== '#' ? (
            <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer" variant="primary">
              Demo
            </Button>
          ) : (
            <Button as="button" variant="primary" disabled>
              Demo pronto
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Proyectos"
          title="Trabajo frontend con enfoque en impacto visual y claridad"
          description="Cards con jerarquia limpia para mostrar descripcion, stack y accesos rapidos."
        />

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
