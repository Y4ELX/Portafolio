import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import styles from './tube-light-navbar.module.css';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeTab?: string;
  onTabChange?: (url: string) => void;
}

export function NavBar({ items, className, activeTab: activeTabProp, onTabChange }: NavBarProps) {
  const isControlled = typeof activeTabProp === 'string';
  const [internalActiveTab, setInternalActiveTab] = useState(items[0]?.name ?? '');
  const [isMobile, setIsMobile] = useState(false);
  const activeTab = isControlled ? (activeTabProp ?? items[0]?.name ?? '') : internalActiveTab;
  const lampTransition = isMobile
    ? { type: 'spring', stiffness: 110, damping: 28, mass: 1.25 }
    : { type: 'spring', stiffness: 165, damping: 26, mass: 1.1 };

  useEffect(() => {
    if (isControlled || items.length === 0) return;
    setInternalActiveTab((prev) => prev || items[0].name);
  }, [isControlled, items]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cn(styles.wrapper, className)}>
      <nav className={styles.navTrack} aria-label="Navegacion principal">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(event) => {
                event.preventDefault();
                if (!isControlled) {
                  setInternalActiveTab(item.name);
                }
                onTabChange?.(item.url);
              }}
              className={cn(styles.navItem, isActive ? styles.active : '')}
              aria-current={isActive ? 'page' : undefined}
              aria-label={isMobile ? item.name : undefined}
            >
              <span className={styles.navLabel}>{item.name}</span>
              <span className={styles.navIcon}>
                <Icon size={18} strokeWidth={2.2} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="tube-lamp"
                  className={styles.lamp}
                  initial={false}
                  transition={lampTransition}
                >
                  <div className={styles.lampTop}>
                    <div className={styles.glowWide} />
                    <div className={styles.glowMid} />
                    <div className={styles.glowDot} />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
