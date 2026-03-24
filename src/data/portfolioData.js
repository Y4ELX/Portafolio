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
    summary: 'Videojuego',
    description:
      'Juego web para reconocer zonas de Tampico en mapa, con rondas, puntuacion y ranking local.',
    stack: ['React', 'Firebase', 'Google Maps API', 'Typescript'],
    image: '/img/projects/tampiguessrBG.png',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://tampiguessr.com',
  },
  {
    id: 'willy',
    title: 'Taller de Multiservicios Willy',
    summary: 'Ecommerce',
    description: 'Tienda online para refacciones y servicios automotrices con flujo completo de compra.',
    stack: ['Angular', 'Firebase', 'E-commerce', 'TypeScript'],
    image: '/img/projects/tallerWillyBG.png',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://taller-de-multiservicios-willy.web.app/',
  },
  {
    id: 'interroute',
    title: 'InterRoute',
    summary: 'Logistica',
    description: 'Plataforma para cotizar envios internacionales con reglas por peso, destino y prioridad.',
    stack: ['React', 'TypeScript', 'LeafLet'],
    image: '/img/projects/interrouteBG.png',
    demoUrl: 'https://example.com',
  },
  {
    id: 'Be',
    title: 'Be Only The Brave',
    summary: 'Experiencia Web',
    description: 'Cuestionario interactivo desarrollado para la campaña "Be Only The Brave".',
    stack: ['LeafLet', 'Three.js', 'Motion Design'],
    image: '/img/projects/beOnlyTheBrave.png',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://y4elx.github.io/Be/',
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    summary: 'Productividad',
    description: 'Gestor de tareas colaborativo con tableros, prioridades y seguimiento por sprint.',
    stack: ['React', 'Supabase', 'Charts'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://example.com',
  },
  {
    id: 'fitpulse',
    title: 'FitPulse',
    summary: 'Salud',
    description: 'Dashboard fitness con metricas semanales, rutinas personalizadas y progreso visual.',
    stack: ['React', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://example.com',
  },
  {
    id: 'studyhub',
    title: 'StudyHub',
    summary: 'Educacion',
    description: 'Plataforma para organizar cursos, recursos y notas con enfoque en aprendizaje continuo.',
    stack: ['React', 'Express', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://example.com',
  },
  {
    id: 'eventora',
    title: 'Eventora',
    summary: 'Eventos',
    description: 'Landing y panel para gestionar registros, boletos y agenda en eventos tecnologicos.',
    stack: ['React', 'Next API', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://example.com',
  },
  {
    id: 'greenmarket',
    title: 'GreenMarket',
    summary: 'Marketplace',
    description: 'Marketplace sostenible para productores locales con filtros avanzados y checkout rapido.',
    stack: ['React', 'Redux', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/Y4ELX',
    demoUrl: 'https://example.com',
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
