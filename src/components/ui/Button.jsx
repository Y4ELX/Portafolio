import styles from './Button.module.css';

export default function Button({ as = 'button', variant = 'primary', className = '', ...props }) {
  const Comp = as;
  const classes = `${styles.button} ${styles[variant] || ''} ${className}`.trim();
  return <Comp className={classes} {...props} />;
}
