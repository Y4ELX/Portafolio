import { useEffect, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { projects, projectsHub } from '../../data/portfolioData';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import styles from './ProjectsSection.module.css';

function StackBadges({ stack = [], featured = false }) {
  const visibleStack = stack.slice(0, featured ? 3 : 2);
  const hiddenCount = stack.length - visibleStack.length;

  return (
    <ul className={`${styles.stackList} ${featured ? styles.stackFeatured : ''}`.trim()}>
      {visibleStack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
      {hiddenCount > 0 ? <li className={styles.stackMore}>+{hiddenCount}</li> : null}
    </ul>
  );
}

function ProjectDescription({ project, featured = false, isExpanded = false, onToggle }) {
  const threshold = featured ? 88 : 72;
  const canExpand = project.description.length > threshold;
  const summaryClass = featured ? styles.featuredDescription : styles.projectDescription;
  const revealClass = `${styles.descriptionReveal} ${isExpanded ? styles.descriptionRevealOpen : ''}`.trim();

  return (
    <div className={styles.descriptionBlock}>
      <p className={summaryClass}>{project.description}</p>

      {canExpand ? (
        <>
          <button
            type="button"
            className={styles.descriptionToggle}
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Ocultar' : 'Ver mas'} informacion de ${project.title}`}
          >
            {isExpanded ? 'Mostrar menos' : 'Ver mas'}
          </button>

          <div className={revealClass} aria-hidden={!isExpanded}>
            <p>{project.description}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function ProjectsSection() {
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const secondaryProjects = projects.filter((project) => project.id !== featuredProject.id).slice(0, 3);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedProjectId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleProjectDetails = (projectId) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  if (!featuredProject) {
    return null;
  }

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

        <div className={styles.showcase}>
          <GlassCard className={styles.featuredCard}>
            <div className={styles.featuredMedia}>
              <img src={featuredProject.image} alt={featuredProject.title} loading="lazy" decoding="async" />
              <span className={styles.featuredBadge}>{featuredProject.summary}</span>
            </div>

            <div className={styles.featuredBody}>
              <h3>{featuredProject.title}</h3>
              <ProjectDescription
                project={featuredProject}
                featured
                isExpanded={expandedProjectId === featuredProject.id}
                onToggle={() => toggleProjectDetails(featuredProject.id)}
              />
              <StackBadges stack={featuredProject.stack} featured />
            </div>
          </GlassCard>

          <div className={styles.secondaryGrid}>
            {secondaryProjects.map((project) => (
              <GlassCard key={project.id} className={styles.projectCard}>
                <div className={styles.projectMedia}>
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                </div>

                <div className={styles.projectBody}>
                  <p className={styles.projectSummary}>{project.summary}</p>
                  <h3>{project.title}</h3>
                  <ProjectDescription
                    project={project}
                    isExpanded={expandedProjectId === project.id}
                    onToggle={() => toggleProjectDetails(project.id)}
                  />
                  <StackBadges stack={project.stack} />
                </div>
              </GlassCard>
            ))}

            <GlassCard className={styles.githubMiniCard}>
              <div className={styles.githubIconWrap} aria-hidden="true">
                <FiGithub className={styles.githubIcon} />
              </div>

              <div className={styles.githubBody}>
                <p className={styles.githubEyebrow}>GitHub</p>
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
                  className={`${styles.actionButtonCompact} ${styles.githubButton}`.trim()}
                >
                  {projectsHub.cta}
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
