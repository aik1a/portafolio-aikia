export const mainActions = [
  {
    id: 'areas',
    title: 'Áreas de trabajo',
    description: 'Revisa mis principales líneas de trabajo.',
    screen: 'areas',
    icon: 'briefcase',
  },
  {
    id: 'idea',
    title: 'Tengo una idea',
    description: 'Ordenemos tu idea en pasos simples.',
    screen: 'idea',
    icon: 'bulb',
  },
  {
    id: 'web',
    title: 'Quiero una página web',
    description: 'Elige el tipo de página que necesitas.',
    screen: 'web',
    icon: 'laptop',
  },
  {
    id: 'collab',
    title: 'Colaboremos',
    description: 'Propuestas, alianzas o networking.',
    screen: 'collab',
    icon: 'handshake',
  },
];

export const workAreas = [
  {
    id: 'ux-ui',
    title: 'UX/UI',
    description: 'Interfaces, experiencia de usuario y claridad visual.',
    icon: 'sparkles',
  },
  {
    id: 'ai',
    title: 'IA aplicada',
    description: 'Ideas, automatizaciones y experiencias con inteligencia artificial.',
    icon: 'robot',
  },
  {
    id: 'product',
    title: 'Producto digital',
    description: 'Estructura, validación y dirección de producto.',
    icon: 'memo',
  },
  {
    id: 'websites',
    title: 'Sitios web',
    description: 'Portafolios, landings y páginas con foco claro.',
    icon: 'laptop',
  },
];

export const flowQuestions = {
  idea: [
    {
      id: 'ideaType',
      question: '¿Qué tipo de idea es?',
      icon: 'memo',
      options: ['Web o landing', 'Producto digital', 'IA aplicada', 'Mejora UX', 'No lo tengo claro'],
    },
    {
      id: 'stage',
      question: '¿En qué etapa está?',
      icon: 'compass',
      options: ['Solo idea', 'Tengo contenido', 'Tengo diseño', 'Ya existe y quiero mejorarla', 'No estoy seguro/a'],
    },
  ],
  web: [
    {
      id: 'webType',
      question: '¿Qué tipo de página necesitas?',
      icon: 'laptop',
      options: ['Portafolio', 'Landing page', 'Tienda online', 'Página de negocio', 'Página de proyecto', 'Startup o SaaS', 'No estoy seguro/a'],
    },
    {
      id: 'goal',
      question: '¿Qué necesitas lograr con la página?',
      icon: 'compass',
      options: ['Mostrar mi trabajo', 'Recibir consultas', 'Explicar una idea', 'Validar un proyecto', 'Presentar un servicio', 'Vender online'],
    },
  ],
  collab: [
    {
      id: 'collaborationType',
      question: '¿Qué tipo de colaboración imaginas?',
      icon: 'handshake',
      options: ['Producto digital', 'UX/UI', 'IA aplicada', 'Proyecto social', 'Networking', 'No lo tengo claro'],
    },
  ],
};
