import { House, UserRound, Sparkles, FolderKanban, Mail } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { NavBar as TubeLightNavBar } from '../ui/tube-light-navbar';

const navItems = [
  { name: 'Inicio', url: '#hero', icon: House },
  { name: 'Acerca', url: '#about', icon: UserRound },
  { name: 'Habilidades', url: '#skills', icon: Sparkles },
  { name: 'Proyectos', url: '#projects', icon: FolderKanban },
  { name: 'Contacto', url: '#contact', icon: Mail },
];
const sectionIds = navItems.map((item) => item.url.replace('#', ''));

function scrollToSection(url) {
  const id = url.replace('#', '');
  const target = document.getElementById(id);
  if (!target) return;

  const topPadding = Number.parseFloat(window.getComputedStyle(target).paddingTop) || 0;
  const isDesktop = window.innerWidth >= 768;
  const fixedTopOffset = isDesktop ? 86 : Math.min(18, topPadding * 0.24);
  const targetTop = window.scrollY + target.getBoundingClientRect().top;
  const nextScrollTop = Math.max(0, targetTop + topPadding - fixedTopOffset);

  window.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
}

export default function Navbar() {
  const activeSection = useActiveSection(sectionIds);
  const activeTab = navItems.find((item) => item.url === `#${activeSection}`)?.name ?? navItems[0].name;

  return <TubeLightNavBar items={navItems} activeTab={activeTab} onTabChange={scrollToSection} />;
}
