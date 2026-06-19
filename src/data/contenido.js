export const contenido = {
  hero: {
    annotation: "diseñador de producto · ux/ui · santiago, chile",
    name: "Aikia Riveros",
    rolePrefix: "Diseñador",
    roleItalic: "de producto.",
    tagline: "Especializado en experiencias con IA e impacto social. Construyo desde la curiosidad, con perspectiva humana y social como base.",
    ctas: {
      proyectos: "ver proyectos",
      contacto: "contacto"
    }
  },
  sobreMi: {
    title: "Sobre",
    titleItalic: "mí.",
    marker: "// 01",
    biografia: "Diseñador de producto y co-fundador de startups con IA. Estudiante de Ingeniería en Ejecución Informática en IP Santo Tomás, combinando formación técnica con visión centrada en el usuario. Desde 2019 trabajo con PYMEs en Santiago, base concreta para entender problemas reales de negocio.",
    fraseHighlight: "Construyo desde la curiosidad, con perspectiva humana y social como base.",
    valores: [
      "diseño con propósito",
      "tecnología accesible",
      "impacto medible"
    ]
  },
  habilidades: {
    title: "Habili",
    titleItalic: "dades.",
    marker: "// 02",
    categorias: [
      {
        nombre: "DISEÑO Y UX",
        items: [
          { name: "UX/UI", type: "normal" },
          { name: "Wireframing", type: "light" },
          { name: "Prototipado", type: "normal" },
          { name: "Diseño mobile", type: "light" },
          { name: "Identidad de marca", type: "accent" },
          { name: "Research", type: "light" },
          { name: "Figma", type: "normal" }
        ]
      },
      {
        nombre: "PRODUCTO",
        items: [
          { name: "Lean Canvas", type: "normal" },
          { name: "Estrategia de producto", type: "light" },
          { name: "Visión de producto", type: "accent" },
          { name: "Design Thinking", type: "light" },
          { name: "Roadmapping", type: "normal" }
        ]
      },
      {
        nombre: "IA APLICADA",
        items: [
          { name: "Integración APIs IA", type: "normal" },
          { name: "Experiencias con IA", type: "light" },
          { name: "Prompt engineering", type: "accent" },
          { name: "Gemini API", type: "light" }
        ]
      },
      {
        nombre: "STACK Y MÉTODOS",
        items: [
          { name: "Git/GitHub", type: "light" },
          { name: "Firebase", type: "normal" },
          { name: "Vercel", type: "light" },
          { name: "Scrum", type: "normal" },
          { name: "Kanban", type: "light" }
        ]
      }
    ]
  },
  proyectos: {
    title: "Pro",
    titleItalic: "yectos.",
    marker: "// 03",
    items: [
      {
        id: "sagaflow",
        nombre: "SagaFlow",
        tag: "PRODUCTO DIGITAL",
        subtitulo: "App de productividad para personas neurodivergentes",
        descripcion: "Los gestores de tareas convencionales están diseñados para un tipo de mente que no es la de los usuarios neurodivergentes. SagaFlow convierte tareas reales en misiones narrativas de fandoms con IA generativa, con un flujo gamificado que engancha sin convertirse en otro juego.",
        meta: [
          { label: "VALIDACIÓN", value: "3 ferias estudiantiles" },
          { label: "ESTADO", value: "MVP + waitlist activa" },
          { label: "ROL", value: "Co-fundador · UX/UI" }
        ],
        stack: ["React 19", "TypeScript", "Gemini AI", "Dexie.js"],
        decisionLabel: "DECISIÓN DE DISEÑO",
        // Texto obligatorio e inmutable especificado en AGENTS.md
        decisionCorta: "La IA inventaba elementos de los fandoms. Se diseñó un protocolo de memoria con datos predefinidos y un sistema de búsqueda rápida.",
        gradient: "from-pink to-pink-light"
      },
      {
        id: "lleken",
        nombre: "Llekén",
        tag: "PWA · IMPACTO SOCIAL",
        subtitulo: "App de cuidado de plantas con IA para entornos urbanos",
        descripcion: "Las personas pierden sus plantas porque la información disponible no considera el contexto local ni el nombre real con el que conocen cada especie. Llekén entrega cuidados personalizados según el clima local en tiempo real.",
        meta: [
          { label: "RANKING", value: "110 / 1.300" },
          { label: "HITO", value: "Innova Sostenible 2026" },
          { label: "ROL", value: "Co-fundador · UX/UI · Branding" }
        ],
        stack: ["Gemini Vision", "Open-Meteo", "Firebase", "Vercel"],
        decisionLabel: "DECISIÓN DE DISEÑO",
        // Texto obligatorio e inmutable especificado en AGENTS.md
        decisionCorta: "Se creó una base de datos de especies locales con los nombres que usa la gente. El kit de marca fue validado con usuarios del Huerto PAC.",
        gradient: "from-blue to-blue-lleken"
      },
      {
        id: "kellun",
        nombre: "Kellun",
        tag: "B2B · SAAS",
        subtitulo: "IA conversacional reemplaza encuestas UX",
        descripcion: "Los equipos de producto dependen de encuestas UX lentas y sesgadas. Kellun usa agentes conversacionales de IA para reemplazar ese proceso y extraer insights en tiempo real.",
        meta: [
          { label: "VALIDACIÓN", value: "3 equipos de producto" },
          { label: "PROCESO", value: "Ideación → pivote → pitch" },
          { label: "ROL", value: "CPO · Co-fundador" }
        ],
        stack: [],
        decisionLabel: "APRENDIZAJE CENTRAL",
        // Texto obligatorio e inmutable especificado en AGENTS.md
        decisionCorta: "La validación confirmó el problema, pero reveló que la solución no convencía. El producto pivotó.",
        gradient: "from-yellow to-yellow-kellun"
      }
    ]
  },
  formacion: {
    title: "Forma",
    titleItalic: "ción.",
    marker: "// 04",
    items: [
      {
        tipo: "ACADÉMICO",
        titulo: "Ingeniería en Ejecución Informática",
        inst: "IP Santo Tomás · 2026",
        enCurso: false
      },
      {
        tipo: "EXPERIENCIA",
        titulo: "Kai Tech — Soporte IT para PYMEs",
        inst: "Santiago · 2019–2024",
        enCurso: false
      },
      {
        tipo: "CERTIFICACIÓN",
        titulo: "IT Essentials",
        inst: "Cisco",
        enCurso: false
      },
      {
        tipo: "CERTIFICACIÓN",
        titulo: "Certificado Profesional de Diseño UX",
        inst: "Google",
        enCurso: true
      },
      {
        tipo: "FORMACIÓN",
        titulo: "Publicidad Digital: datos, IA y legalidad",
        inst: "Santander Open Academy",
        enCurso: true
      },
      {
        tipo: "CERTIFICACIÓN",
        titulo: "Scrum Master y Metodologías Ágiles",
        inst: "Microsoft · IP Santo Tomás",
        enCurso: true
      }
    ]
  },
  contacto: {
    title: "Busco colaborar en productos ",
    titleItalic: "que importen.",
    marker: "// 05",
    email: "aikia.riv.c@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/aikia-riveros-7b1630404/", active: true },
      { label: "aikia.riv.c@gmail.com", url: "mailto:aikia.riv.c@gmail.com", active: true },
      { label: "Behance", url: "https://www.behance.net/aikiariveros", active: true },
      { label: "Portfolio · en construcción", url: "#", active: false }
    ]
  },
  footer: {
    text: "Aikia Riveros · Diseñador de Producto · Santiago, Chile",
    year: "2026"
  }
};
