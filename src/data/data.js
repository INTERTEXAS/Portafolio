export const developerInfo = {
  name: "Miguel Lagunes",
  title: "Software Engineer & Backend Automation Specialist",
  specialties: ["Ingeniería de Software", "Automatización de Procesos", "Bases de Datos Relacionales"],
  email: "malz_98@hotmail.com",
  socials: {
    github: "#",
    linkedin: "#",
    twitter: "#",
    discord: "#"
  }
};

export const projects = [
  {
    id: "cuadrapro",
    title: "CuadraPro",
    subtitle: "Plataforma de gestión técnica empresarial",
    description: "Sistema enterprise para el control de inventarios técnicos, flujos de trabajo de mantenimiento y gestión de personal especializado en campo con roles granulares de usuario.",
    problem: "Las empresas técnicas suelen perder trazabilidad en las reparaciones físicas y asignaciones de equipos de alto valor debido al uso de múltiples herramientas desconectadas.",
    solution: "Una consola centralizada de operaciones que sincroniza la asignación de hardware con órdenes de trabajo específicas, gestionando permisos por roles e integrando reportes automáticos.",
    architecture: "Arquitectura modular SPA con cliente en React + Tailwind CSS, consumiendo una API REST robusta construida en Python que orquesta transacciones ACID sobre PostgreSQL.",
    stack: ["React", "Tailwind CSS", "Python", "PostgreSQL", "RBAC Security"],
    category: "Enterprise"
  },
  {
    id: "weather-alpha",
    title: "Weather Alpha (SPA)",
    subtitle: "Consola climática avanzada",
    description: "Aplicación web de página única (SPA) interactiva para pronóstico meteorológico de precisión y telemetría de condiciones locales en tiempo real.",
    problem: "Las interfaces climáticas tradicionales están saturadas de publicidad molesta y adolecen de latencias elevadas para cargar datos históricos de geolocalización.",
    solution: "Consumo directo y paralelizado de Open-Meteo API bajo una interfaz limpia, optimizada con caché local y actualizaciones instantáneas basadas en coordenadas geográficas.",
    architecture: "Cliente ligero desarrollado en React.js, utilizando Tailwind CSS para la interfaz y hooks personalizados para la sincronización asíncrona de datos de telemetría climática.",
    stack: ["React", "Tailwind CSS", "Open-Meteo API", "SPA Architecture"],
    category: "Frontend"
  },
  {
    id: "discord-infrastructure",
    title: "Gestor de Infraestructura Discord",
    subtitle: "Automatización y orquestación backend",
    description: "Script industrial de automatización para la creación, configuración y auditoría de permisos en servidores de alta concurrencia en Discord.",
    problem: "Configurar manualmente canales, categorías y jerarquías complejas de roles para miles de usuarios toma horas y es propenso a errores humanos de seguridad.",
    solution: "Orquestador programático en Python que levanta estructuras completas de servidores en segundos mediante blueprints definidos en JSON o YAML.",
    architecture: "Script autónomo con arquitectura asíncrona (Asyncio) que consume el API de Discord de manera eficiente, previniendo penalizaciones por Rate Limiting.",
    stack: ["Python", "Asyncio", "Discord API", "Infrastructure as Code"],
    category: "Automation"
  },
  {
    id: "stakeflow",
    title: "stakeflow",
    subtitle: "Herramienta analítica de flujos financieros",
    description: "Plataforma analítica interactiva para visualizar flujos transaccionales y distribución de tokens o capital dentro de redes complejas.",
    problem: "Dificultad para rastrear visualmente cómo se bifurcan o consolidan los fondos en transacciones encadenadas, perdiendo de vista la procedencia de los fondos.",
    solution: "Visualizaciones dinámicas basadas en diagramas de flujo interactivos que permiten a los analistas seguir la ruta del dinero o tokens a través de múltiples nodos.",
    architecture: "Interfaz React de alto rendimiento, optimizada para renderizar gráficos orientados a objetos con animaciones fluidas utilizando Framer Motion.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Data Visualization"],
    category: "Analytics"
  },
  {
    id: "reqlens",
    title: "ReqLens",
    subtitle: "Auditoría visual y requerimientos",
    description: "Plataforma de inspección y correlación visual de especificaciones de diseño versus código fuente y requerimientos de ingeniería de software.",
    problem: "Desconexión entre los documentos de requerimientos técnicos escritos y la implementación visual final de las interfaces del usuario.",
    solution: "Un lienzo digital que sobrepone los requerimientos directamente en las capturas o maquetados interactivos, validando la conformidad técnica de manera visual.",
    architecture: "Canvas interactivo en React que soporta superposiciones semánticas, filtros dinámicos y exportación de reportes de auditoría en formato PDF.",
    stack: ["React", "Tailwind CSS", "Canvas API", "Software Engineering"],
    category: "Enterprise"
  },
  {
    id: "turnos-medico",
    title: "Turnos-Medico-Prototipo",
    subtitle: "Sistema CRUD de reservas médicas",
    description: "Prototipo funcional para el agendamiento, modificación y cancelación de citas médicas con validación de disponibilidad en tiempo real.",
    problem: "Solapamiento de citas médicas y lentitud en la actualización de la disponibilidad de los especialistas clínicos.",
    solution: "Sistema CRUD con bloqueo optimista de transacciones para garantizar la disponibilidad exclusiva de cada slot de tiempo en la agenda médica.",
    architecture: "Estructura monolítica ligera en backend para la API CRUD con persistencia de base de datos relacional y un frontend interactivo autogestionado.",
    stack: ["React", "Tailwind CSS", "REST API", "PostgreSQL", "CRUD Operations"],
    category: "Enterprise"
  },
  {
    id: "aquanova-21",
    title: "Aquanova 2.1",
    subtitle: "Plataforma de control y telemetría industrial",
    description: "Consola avanzada para el monitoreo en tiempo real y telemetría de sistemas de purificación de agua y distribución de fluidos.",
    problem: "Los operarios de plantas industriales carecen de interfaces accesibles en campo para evaluar la calidad del agua, dependiendo de costosos paneles físicos PLC.",
    solution: "Panel digital responsivo compatible con dispositivos móviles que refleja al instante variables críticas como pH, turbidez, flujo de agua y alarmas de sistema.",
    architecture: "Dashboard interactivo con WebSockets para datos en vivo de baja latencia, respaldado por un backend robusto que interactúa con hardware IoT.",
    stack: ["React", "Tailwind CSS", "WebSockets", "IoT Dashboard", "Framer Motion"],
    category: "Automation"
  },
  {
    id: "catfacts",
    title: "Catfacts (isa8970)",
    subtitle: "Consumo de API REST y renderizado dinámico",
    description: "Aplicación interactiva y ligera enfocada en demostrar buenas prácticas en el consumo de recursos de APIs REST públicas y paginación reactiva.",
    problem: "Muchas aplicaciones frontend básicas gestionan deficientemente los estados de carga (loading), error y caché al interactuar con servicios externos.",
    solution: "Una interfaz limpia con layouts adaptables, animaciones de entrada fluidas y manejo de estados asíncronos mediante promesas y control robusto de errores.",
    architecture: "SPA en React que consume endpoints REST públicos, utilizando patrones de diseño modular para los componentes de tarjetas y cargadores visuales.",
    stack: ["React", "Tailwind CSS", "REST API", "Asynchronous JavaScript"],
    category: "Frontend"
  },
  {
    id: "intertexas",
    title: "Intertexas",
    subtitle: "E-commerce de simulación y mercado virtual",
    description: "Plataforma de comercio electrónico inspirada en el universo de Star Citizen, con diseño publicitario inmersivo y flujos de pago simulados.",
    problem: "Los portales tradicionales de e-commerce son visualmente monótonos y no transmiten la ambientación temática requerida por comunidades de simulación espacial.",
    solution: "Tienda virtual con diseño de ciencia ficción y efectos 'cyberpunk' que gestiona un catálogo interactivo de naves espaciales, servicios in-game y transacciones ficticias.",
    architecture: "E-commerce React modular con layouts responsivos basados en CSS Grid, carrito de compras sincronizado en LocalStorage y pasarela de pago simulada de alta fidelidad.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "E-commerce Engine"],
    category: "Analytics"
  }
];

export const skills = [
  { name: "React", category: "Frontend", level: 90 },
  { name: "Python", category: "Backend", level: 85 },
  { name: "PostgreSQL", category: "Database", level: 80 },
  { name: "Tailwind CSS", category: "Frontend", level: 95 },
  { name: "Framer Motion", category: "Frontend", level: 80 },
  { name: "Git / GitHub", category: "Workflow", level: 85 },
  { name: "Optimización de Hardware", category: "Hardware", level: 75 },
  { name: "Asyncio (Python)", category: "Backend", level: 80 }
];
