export const profile = {
  name: 'Yael Monterrubio',
  role: 'Desarrollador',
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
    summary: 'Videojuego',
    description:
      'Juego web para reconocer zonas de Tampico en mapa, con rondas, puntuacion y ranking local.',
    stack: ['React', 'Firebase', 'Google Maps API', 'Typescript'],
    image: '/img/projects/tampiguessrBG.png',
    githubUrl: 'https://github.com/Y4ELX/TampiGuessr',
    demoUrl: 'https://tampiguessr.com',
  },
  {
    id: 'willy',
    title: 'Taller de Multiservicios Willy',
    summary: 'Ecommerce',
    description: 'Tienda online para refacciones y servicios automotrices con flujo completo de compra.',
    stack: ['Angular', 'Firebase', 'E-commerce', 'TypeScript'],
    image: '/img/projects/tallerWillyBG.png',
    demoUrl: 'https://taller-de-multiservicios-willy.web.app/',
  },
  {
    id: 'interroute',
    title: 'InterRoute',
    summary: 'Logistica',
    description: 'Plataforma para cotizar envios internacionales con reglas por peso, destino y prioridad.',
    stack: ['React', 'TypeScript', 'LeafLet'],
    image: '/img/projects/interrouteBG.png',
    demoUrl: 'https://interrouteweb.web.app/',
  },
  {
    id: 'Be',
    title: 'Be Only The Brave',
    summary: 'Experiencia Web',
    description: 'Experiencia móvil desarrollada para la campaña “Be Only The Brave”, diseñada para ofrecer una interacción dinámica y alineada con la identidad de la marca.',
    stack: ['LeafLet', 'Three.js', 'Motion Design'],
    image: '/img/projects/beOnlyTheBrave.png',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://y4elx.github.io/Be/',
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
