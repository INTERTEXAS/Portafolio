export const aboutMe = {
  name: "Miguel Lagunes",
  role: "Software Engineering Student & Junior Full-Stack Developer",
  email: "malz_98@hotmail.com",
  goal: "Estudiante de Ingeniería de Software orientado al desarrollo Full-Stack y la arquitectura de datos relacionales. Mi objetivo es incorporarme a un equipo dinámico como Desarrollador Frontend o Junior Full-Stack, aportando mis competencias en React, Python y PostgreSQL para estructurar soluciones escalables, optimizar la experiencia de usuario y automatizar procesos complejos.",
  bio: "Mi pasión por la programación nace de la capacidad de transformar conceptos complejos en estructuras visuales e interfaces interactivas claras. Me caracterizo por un enfoque de aprendizaje visual: diseño y entiendo la arquitectura desde sus cimientos utilizando diagramas de flujo y modelos de datos relacionales. Mi stack abarca React, Tailwind CSS, Python y PostgreSQL, respaldado por un trasfondo técnico en optimización de hardware y sistemas.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    discord: "https://discord.com"
  },
  web3formsKey: "b96b701c-616e-4c7b-91ff-9a8ac33f684a",
  skills: [
    { name: "React", level: 90, icon: "Code2", category: "Frontend" },
    { name: "Tailwind CSS", level: 95, icon: "Palette", category: "Frontend" },
    { name: "Python", level: 85, icon: "Terminal", category: "Backend" },
    { name: "PostgreSQL", level: 80, icon: "Database", category: "Database" },
    { name: "Framer Motion", level: 85, icon: "Sparkles", category: "Frontend" },
    { name: "Arquitectura de Datos", level: 88, icon: "Network", category: "Architecture" }
  ]
};

export const skills = aboutMe.skills;

// Aliased export for compatibility
export const developerInfo = aboutMe;

export const projects = [
  {
    id: "cuadrapro",
    title: "CuadraPro",
    subtitle: "Plataforma Enterprise de Gestión Técnica",
    category: "Enterprise",
    reto: "Plataforma integral de gestión técnica con múltiples roles de usuario y persistencia segura.",
    solucion: "Arquitectura Full-Stack con React, Tailwind y PostgreSQL/Supabase.",
    aprendizaje: "Manejo avanzado del ciclo de vida de una aplicación Full-Stack, optimización de consultas relacionales y gestión de políticas de seguridad.",
    description: "Sistema empresarial completo diseñado para el control de inventarios, permisos de usuario por roles (RBAC) y flujo de trabajo técnico con trazabilidad en tiempo real.",
    stack: ["React", "Tailwind CSS", "PostgreSQL", "Supabase", "RBAC"]
  },
  {
    id: "reqlens",
    title: "ReqLens",
    subtitle: "Inspección Visual con Inteligencia Artificial",
    category: "AI & Engineering",
    reto: "Automatizar la creación de documentación técnica y modelos de BD desde interfaces visuales.",
    solucion: "Herramienta de IA que analiza capturas de SPAs para autogenerar IEEE 830 y modelos de entidades.",
    aprendizaje: "Integración de modelos de IA para procesamiento de datos no estructurados y traducción de requisitos visuales a modelos relacionales.",
    description: "Plataforma de ingeniería inversa visual que audita interfaces de usuario y traduce diagramas o capturas directamente a estándares de requisitos de software e esquemas de base de datos.",
    stack: ["React", "Tailwind CSS", "IA / Vision", "IEEE 830", "Modelos Relacionales"]
  },
  {
    id: "turnos-medico",
    title: "Turnos-Medico-Prototipo",
    subtitle: "Lógica y Asignación de Agendamiento Clínico",
    category: "Logic & Health",
    reto: "Evitar la mala distribución en sistemas de salud mediante un modelo equitativo.",
    solucion: "Prototipo con algoritmo de distribución para asignación justa de turnos y validación de disponibilidad.",
    aprendizaje: "Diseño de algoritmos de distribución, control estricto de estados concurrentes y validación de reglas de negocio.",
    description: "Motor de asignación de turnos médicos que elimina el sobrecupo y optimiza la carga de trabajo en centros de atención mediante validaciones algorítmicas de disponibilidad.",
    stack: ["React", "Tailwind CSS", "Python", "Algoritmos", "Estado Concurrente"]
  },
  {
    id: "stakeflow",
    title: "stakeflow",
    subtitle: "Análisis y Visualización de Flujos Continuos",
    category: "Analytics",
    reto: "Registro y análisis claro del flujo de datos continuos.",
    solucion: "Herramienta analítica para monitoreo, estructuración y visualización de eventos.",
    aprendizaje: "Estructuración de tuberías de datos (pipelines) y técnicas de representación visual gráfica.",
    description: "Consola interactiva de telemetría de eventos que renderiza bifurcaciones y consolidaciones de datos en tiempo real mediante diagramas de flujo sinópticos y animaciones de alta velocidad.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Tuberías de Datos", "Gráficos Interactivos"]
  }
];
