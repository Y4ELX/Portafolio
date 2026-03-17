import { SiGithub } from 'react-icons/si';
import { projects, projectsHub } from '../../data/portfolioData';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import styles from './ProjectsSection.module.css';

function hasLink(url) {
  return Boolean(url && url !== '#');
}

function StackList({ stack, className = '' }) {
  return (
    <ul className={`${styles.stackList} ${className}`.trim()} aria-label="Tecnologias principales">
      {stack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}

function ProjectActions({ project, compact = false }) {
  const hasDemo = hasLink(project.demoUrl);
  const buttonClass = compact ? styles.actionButtonCompact : styles.actionButton;

  return (
    <div className={`${styles.actions} ${compact ? styles.actionsCompact : ''}`.trim()}>
      <Button
        as="a"
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        variant="ghost"
        className={buttonClass}
      >
        GitHub
      </Button>
      {hasDemo ? (
        <Button
          as="a"
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          className={buttonClass}
        >
          Demo
        </Button>
      ) : (
        <Button as="button" type="button" variant="primary" disabled className={buttonClass}>
          Demo pronto
        </Button>
      )}
    </div>
  );
}

function FeaturedProjectCard({ project }) {
  return (
    <GlassCard className={styles.featuredCard}>
      <div className={styles.featuredMedia}>
        <span className={styles.featuredBadge}>{project.summary}</span>
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      <div className={styles.featuredBody}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <StackList stack={project.stack} className={styles.stackFeatured} />
        <ProjectActions project={project} />
      </div>
    </GlassCard>
  );
}

function ProjectCard({ project }) {
  return (
    <GlassCard className={styles.projectCard}>
      <div className={styles.projectMedia}>
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      <div className={styles.projectBody}>
        <p className={styles.projectSummary}>{project.summary}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <StackList stack={project.stack} />
        <ProjectActions project={project} compact />
      </div>
    </GlassCard>
  );
}

function GithubCard() {
  return (
    <GlassCard as="aside" className={styles.githubMiniCard}>
      <div className={styles.githubIconWrap}>
        <SiGithub className={styles.githubIcon} aria-hidden="true" focusable="false" />
      </div>
      <div className={styles.githubBody}>
        <p className={styles.githubEyebrow}>Mas proyectos</p>
        <h3>{projectsHub.title}</h3>
        <p>{projectsHub.description}</p>
      </div>
      <div className={styles.githubAction}>
        <Button
          as="a"
          href={projectsHub.url}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          className={styles.githubButton}
        >
          {projectsHub.cta}
        </Button>
      </div>
    </GlassCard>
  );
}

export default function ProjectsSection() {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const secondaryProjects = projects.filter((project) => project.id !== featuredProject?.id);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Proyectos Seleccionados</p>
          <h2>Vitrina de productos con diseno, logica y ejecucion visual</h2>
          <p className={styles.lead}>
            Cada proyecto responde a un objetivo real: interfaz clara, experiencia cuidada y tecnologia bien aplicada.
            TAMPIGUESSR lidera esta seccion como proyecto insignia.
          </p>
        </header>

        <div className={styles.showcase}>
          {featuredProject ? <FeaturedProjectCard project={featuredProject} /> : null}

          <div className={styles.secondaryGrid}>
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <GithubCard />
          </div>
        </div>
      </div>
    </section>
  );
}
