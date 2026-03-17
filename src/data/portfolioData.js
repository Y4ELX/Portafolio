export const profile = {
  name: 'Yael Monterrubio',
  role: 'Developer',
  shortIntro:
    'Me enfoco en crear experiencias web modernas que unen diseño, desarrollo y rendimiento, buscando siempre que cada proyecto sea visualmente atractivo, funcional y memorable.',
  longIntro:
    'Soy tecnico en programacion y estudiante de Ingenieria en Sistemas Computacionales y Electronicos en la Universidad del Noreste. Me especializo en frontend y estoy en evolucion constante para crear productos web mas rapidos, claros y memorables.',
  birthdate: '2005-04-23',
  universityName: 'Universidad del Noreste',
  universityUrl: 'https://www.une.edu.mx/',
};

export const navLinks = [
  { id: 'about', label: 'Acerca de mi' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' },
];

export const skillsByCategory = [
  {
    category: 'Frontend Core',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Accesibilidad'],
  },
  {
    category: 'UI y Experiencia',
    items: ['Arquitectura de componentes', 'Animaciones sutiles', 'Design Systems', 'Microinteracciones'],
  },
  {
    category: '3D y Visual',
    items: ['Three.js', 'React Three Fiber', 'Shaders basicos', 'Lighting para interfaces'],
  },
  {
    category: 'Herramientas',
    items: ['React', 'Git', 'Vite', 'Figma handoff'],
  },
];

export const projects = [
  {
    id: 'tampiguessr',
    title: 'TAMPIGUESSR',
    summary: 'Proyecto estrella',
    description:
      'Explora calles, avenidas y colonias de Tampico, Tamaulipas y demuestra que tan tampiqueno eres realmente.',
    stack: ['React', 'Vite', 'Mapbox', 'Node.js'],
    image: '/img/projects/tg.png',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: '#',
    featured: true,
  },
  {
    id: 'willy',
    title: 'Taller de Multiservicios Willy',
    summary: 'Ecommerce sector automotriz',
    description: 'Aplicacion para comprar productos en linea para el taller.',
    stack: ['React', 'Firebase', 'CSS Modules'],
    image: '/img/projects/tmwg.png',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: '#',
    featured: false,
  },
  {
    id: 'interroute',
    title: 'InterRoute',
    summary: 'Cotizador internacional',
    description: 'Sitio para cotizar envios internacionales.',
    stack: ['React', 'TypeScript', 'API Integration'],
    image: '/img/projects/interroute.jpg',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: '#',
    featured: false,
  },
  {
    id: 'pcfolio',
    title: 'PCFolio',
    summary: 'Portafolio inmersivo',
    description: 'Una experiencia web para mostrar mi portafolio de una forma mas dinamica.',
    stack: ['React', 'Three.js', 'Motion Design'],
    image: '/img/projects/pcfolio.jpg',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: '#',
    featured: false,
  },
];

export const projectsHub = {
  title: 'Explora mas en GitHub',
  description:
    'Aqui publico avances, experimentos y versiones nuevas de mis proyectos. Si quieres ver mas codigo y proceso, este es el punto de entrada.',
  url: 'https://github.com/Y4ELX',
  cta: 'Ver perfil completo',
};

export const contactLinks = [
  {
    label: 'WhatsApp',
    value: 'Contacto directo',
    href: 'https://wa.link/lq502m',
  },
  {
    label: 'GitHub',
    value: '@Y4ELX',
    href: 'https://github.com/Y4ELX',
  },
  {
    label: 'Universidad',
    value: 'Universidad del Noreste',
    href: 'https://www.une.edu.mx/',
  },
];
