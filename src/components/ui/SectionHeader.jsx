import styles from './SectionHeader.module.css';
import Tag from './Tag';

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <header className={styles.header}>
      {eyebrow ? <Tag>{eyebrow}</Tag> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
