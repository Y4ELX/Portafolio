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

function scrollToSection(url) {
  const id = url.replace('#', '');
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navbar() {
  const activeSection = useActiveSection(navItems.map((item) => item.url.replace('#', '')));
  const activeTab = navItems.find((item) => item.url === `#${activeSection}`)?.name ?? navItems[0].name;

  return <TubeLightNavBar items={navItems} activeTab={activeTab} onTabChange={scrollToSection} />;
}
