export const profile = {
  name: 'Yael Monterrubio',
  role: 'Desarrollador de experiencias web',
  shortIntro:
    'Diseño y desarrollo experiencias web donde la estética, la interacción y el rendimiento trabajan juntos para crear productos memorables.',
  longIntro:
    'Soy técnico en Programación y actualmente estoy por egresar de Ingeniería en Sistemas Computacionales y Electrónicos en la Universidad del Noreste. Me especializo en frontend y en experiencias interactivas de alto impacto visual.',
  birthdate: '2005-04-23',
  universityName: 'Universidad del Noreste',
  universityUrl: 'https://www.une.edu.mx/',
};

export const navLinks = [
  { id: 'about', label: 'Acerca de mí' },
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
      'Juego web inspirado en la exploración geográfica, donde el usuario debe identificar ubicaciones de Tampico a través de Street View, con sistema de rondas, puntuación y ranking.',
    stack: ['React', 'Firebase', 'Google Maps API', 'Typescript'],
    image: '/img/projects/tampiguessrBG.png',
    githubUrl: 'https://github.com/Y4ELX/TampiGuessr',
    demoUrl: 'https://tampiguessr.com',
  },
  {
    id: 'willy',
    title: 'Taller de Multiservicios Willy',
    summary: 'Ecommerce',
    description: 'Plataforma web para la venta de refacciones y servicios automotrices, con catálogo, flujo de compra y enfoque en digitalizar la operación del negocio.',
    stack: ['Angular', 'Firebase', 'E-commerce', 'TypeScript'],
    image: '/img/projects/tallerWillyBG.png',
    demoUrl: 'https://taller-de-multiservicios-willy.web.app/',
  },
  {
    id: 'interroute',
    title: 'InterRoute',
    summary: 'Logistica',
    description: 'Plataforma de cotización logística para envíos internacionales, con cálculo basado en peso, destino y prioridad del servicio.',
    stack: ['React', 'TypeScript', 'LeafLet'],
    image: '/img/projects/interrouteBG.png',
    demoUrl: 'https://interrouteweb.web.app/',
  },
  {
    id: 'Be',
    title: 'Be Only The Brave',
    summary: 'Experiencia Web',
    description: 'Experiencia mobile-first desarrollada para la campaña “Be Only The Brave”, enfocada en una interacción dinámica, visual y alineada con la identidad de la marca.',
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
    id: 'github',
    label: 'GitHub',
    value: 'Y4ELX',
    href: 'https://github.com/Y4ELX',
  },
  {
    id: 'email',
    label: 'Correo',
    value: 'yaelmonterrubio23@gmail.com',
    href: 'mailto:yaelmonterrubio23@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Yael Monterrubio',
    href: 'https://mx.linkedin.com/in/yael-monterrubio-7ba33829a',
  },
];
