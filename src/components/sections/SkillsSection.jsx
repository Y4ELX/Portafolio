import styles from './SkillsSection.module.css';
import {
  SiAngular,
  SiArduino,
  SiBlender,
  SiBootstrap,
  SiCss,
  SiDotnet,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from 'react-icons/si';

const SKILL_BLOCKS = [
  {
    id: 'frontend',
    title: 'Desarrollo Frontend',
    summary: '',
    items: [
      { name: 'HTML', icon: SiHtml5, hue: 22 },
      { name: 'CSS', icon: SiCss, hue: 205 },
      { name: 'JavaScript', icon: SiJavascript, hue: 48 },
      { name: 'TypeScript', icon: SiTypescript, hue: 212 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks y Librerias',
    summary: 'Arquitectura de componentes para producto real y evolutivo.',
    items: [
      { name: 'React', icon: SiReact, hue: 190 },
      { name: 'Angular', icon: SiAngular, hue: 350 },
      { name: 'Tailwind', icon: SiTailwindcss, hue: 176 },
      { name: 'Bootstrap', icon: SiBootstrap, hue: 262 },
    ],
  },
  {
    id: 'logic',
    title: 'Logica, Lenguajes y Datos',
    summary: 'Del comportamiento interno a la persistencia de datos en proyectos funcionales.',
    items: [
      { name: 'Python', icon: SiPython, hue: 210 },
      { name: 'C#', icon: SiDotnet, hue: 236 },
      { name: 'Kotlin', icon: SiKotlin, hue: 310 },
      { name: 'MySQL', icon: SiMysql, hue: 196 },
    ],
  },
  {
    id: 'workflow',
    title: 'Flujo de Producto',
    summary: 'Versionado, colaboracion y criterio visual en ciclos de entrega rapidos.',
    items: [
      { name: 'Git', icon: SiGit, hue: 16 },
      { name: 'Figma', icon: SiFigma, hue: 332 },
    ],
  },
  {
    id: 'interactive',
    title: '3D e Interactivo',
    summary: 'Experiencias inmersivas para proyectos con narrativa y profundidad visual.',
    items: [
      { name: 'Unity', icon: SiUnity, hue: 232 },
      { name: 'Blender', icon: SiBlender, hue: 32 },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware y Prototipado',
    summary: 'Integracion de software con prototipos fisicos y pruebas de interaccion.',
    items: [{ name: 'Arduino', icon: SiArduino, hue: 168 }],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <p className={styles.eyebrow}>Skills Architecture</p>
            <h2>Stack compacto, versatil y orientado a construir producto completo</h2>
            <p className={styles.lead}>
              Organizo mis habilidades por frentes de ejecucion reales para mantener claridad tecnica, velocidad de
              implementacion y consistencia visual de punta a punta.
            </p>
          </div>
        </header>

        <div className={styles.matrix}>
          {SKILL_BLOCKS.map((block) => (
            <article key={block.id} className={styles.cluster}>
              <div className={styles.clusterTop}>
                <h3>{block.title}</h3>
                <span className={styles.clusterCount}>{block.items.length}</span>
              </div>

              {block.summary ? <p className={styles.clusterSummary}>{block.summary}</p> : null}

              <ul className={styles.badges} aria-label={block.title}>
                {block.items.map((item) => (
                  <li key={item.name}>
                    <span className={styles.badge} style={{ '--badge-hue': `${item.hue}` }}>
                      <span className={styles.badgeIconWrap}>
                        <item.icon className={styles.badgeIcon} aria-hidden="true" focusable="false" />
                      </span>
                      <span className={styles.badgeName}>{item.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
