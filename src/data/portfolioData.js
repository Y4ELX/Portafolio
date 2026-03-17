export const profile = {
  name: 'Yael Monterrubio',
  role: 'Frontend Developer',
  shortIntro:
    'Construyo interfaces web modernas con foco en detalle visual, rendimiento y experiencias interactivas con 3D.',
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
    title: 'Portafolio 3D Interactivo',
    description:
      'Rediseno de portafolio personal con arquitectura React, experiencia inmersiva con 3D y enfoque en rendimiento.',
    stack: ['React', 'Three.js', 'R3F', 'CSS Modules'],
    image: '/img/THREEJSlogo.png',
    codeUrl: 'https://github.com/Y4ELX',
    liveUrl: '#',
    featured: true,
  },
  {
    title: 'UI Landing de Alto Impacto',
    description:
      'Landing orientada a conversion con jerarquia visual fuerte, animaciones cuidadas y secciones modulares.',
    stack: ['React', 'CSS', 'UX Writing'],
    image: '/img/HTMLlogo.png',
    codeUrl: 'https://github.com/Y4ELX',
    liveUrl: '#',
    featured: false,
  },
  {
    title: 'Panel Frontend Escalable',
    description:
      'Interfaz dashboard con componentes reutilizables, estados claros y base lista para crecimiento de producto.',
    stack: ['React', 'State Management', 'Reusable UI'],
    image: '/img/JSlogo.png',
    codeUrl: 'https://github.com/Y4ELX',
    liveUrl: '#',
    featured: false,
  },
];

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
