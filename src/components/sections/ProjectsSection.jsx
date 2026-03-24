import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../../data/portfolioData';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import styles from './ProjectsSection.module.css';

function ProjectCard({ project }) {
  const stackPreview = project.stack.slice(0, 4);

  return (
    <GlassCard className={styles.projectCard}>
      <div className={styles.projectMedia}>
        <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
        <span className={styles.projectSummary}>{project.summary}</span>
      </div>

      <div className={styles.projectBody}>
        <h3>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        <ul className={styles.stackList} aria-label={`Tecnologias de ${project.title}`}>
          {stackPreview.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        <Button
          as="a"
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          className={styles.actionButton}
        >
          <FiExternalLink aria-hidden="true" />
          Probar
        </Button>

        <Button
          as="a"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          variant="ghost"
          className={styles.actionButton}
        >
          <FiGithub aria-hidden="true" />
          Ver en GitHub
        </Button>
      </div>
    </GlassCard>
  );
}

export default function ProjectsSection() {
  const visibleProjects = projects.slice(0, 9);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Proyectos</p>
          <h2>Estos son algunos de mis proyectos</h2>
          <p className={styles.lead}>
            Vitrina de productos con enfoque visual moderno, decisiones tecnicas claras y ejecucion orientada a
            rendimiento.
          </p>
        </header>

        <div className={styles.grid}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
