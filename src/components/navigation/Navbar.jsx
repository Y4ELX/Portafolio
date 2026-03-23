import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../../data/portfolioData';
import { useNavbarVisibility } from '../../hooks/useNavbarVisibility';
import { useActiveSection } from '../../hooks/useActiveSection';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

const sectionIds = navLinks.map((item) => item.id);

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const activeSection = useActiveSection(sectionIds);
  useNavbarVisibility(navbarRef);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  return (
    <header ref={navbarRef} className={styles.navbar}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={() => scrollToSection('hero')}
          aria-label="Ir al inicio"
        >
          <img src="/img/LOGOY.png" alt="Logo Yael Monterrubio" decoding="async" />
        </button>

        <nav className={styles.desktopNav} aria-label="Navegacion principal">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`${styles.link} ${activeSection === link.id ? styles.active : ''}`.trim()}
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
          <Button as="a" href="https://wa.link/lq502m" target="_blank" rel="noreferrer" variant="primary">
            Hablemos
          </Button>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`.trim()}>
        {navLinks.map((link) => (
          <button
            key={`mobile-${link.id}`}
            type="button"
            className={`${styles.mobileLink} ${activeSection === link.id ? styles.active : ''}`.trim()}
            onClick={() => {
              scrollToSection(link.id);
              setMenuOpen(false);
            }}
          >
            {link.label}
          </button>
        ))}
        <Button as="a" href="https://wa.link/lq502m" target="_blank" rel="noreferrer" variant="primary">
          Contactar
        </Button>
      </div>
    </header>
  );
}
