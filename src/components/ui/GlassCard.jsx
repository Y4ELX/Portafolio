import styles from './GlassCard.module.css';

export default function GlassCard({ as = 'article', className = '', children, ...props }) {
  const Comp = as;
  return (
    <Comp className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </Comp>
  );
}
