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
    title: 'Frontend Core',
    items: [
      { name: 'HTML', icon: SiHtml5, hue: 22 },
      { name: 'CSS', icon: SiCss, hue: 205 },
      { name: 'JavaScript', icon: SiJavascript, hue: 48 },
      { name: 'TypeScript', icon: SiTypescript, hue: 212 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks y UI',
    items: [
      { name: 'React', icon: SiReact, hue: 190 },
      { name: 'Angular', icon: SiAngular, hue: 350 },
      { name: 'Tailwind', icon: SiTailwindcss, hue: 176 },
      { name: 'Bootstrap', icon: SiBootstrap, hue: 262 },
    ],
  },
  {
    id: 'logic',
    title: 'Lógica y datos',
    items: [
      { name: 'Python', icon: SiPython, hue: 210 },
      { name: 'C#', icon: SiDotnet, hue: 236 },
      { name: 'Kotlin', icon: SiKotlin, hue: 310 },
      { name: 'MySQL', icon: SiMysql, hue: 196 },
    ],
  },
  {
    id: 'workflow',
    title: 'Herramientas de producto',
    items: [
      { name: 'Git', icon: SiGit, hue: 16 },
      { name: 'Figma', icon: SiFigma, hue: 332 },
    ],
  },
  {
    id: 'interactive',
    title: '3D e interacción',
    items: [
      { name: 'Unity', icon: SiUnity, hue: 232 },
      { name: 'Blender', icon: SiBlender, hue: 32 },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware y prototipado',
    items: [{ name: 'Arduino', icon: SiArduino, hue: 168 }],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <p className={styles.eyebrow}>Stack profesional</p>
            <h2>Base técnica</h2>
            <p className={styles.lead}>
              Mi stack combina desarrollo frontend, lógica, herramientas visuales e interacción para construir
              experiencias funcionales y bien cuidadas.
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
