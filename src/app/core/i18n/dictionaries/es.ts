/** Spanish UI strings. This object defines the dictionary shape; `en.ts` must match it. */
export const es = {
  meta: {
    title: 'Lazaro Guerra · Ingeniero Backend Java',
    description:
      'Portafolio de Lazaro Guerra, ingeniero backend con Java, Spring Boot, Kafka, PostgreSQL y AWS.',
  },
  nav: {
    stack: 'Stack',
    experience: 'Experiencia',
    projects: 'Proyectos',
    certifications: 'Certificaciones',
    contact: 'Contacto',
    language: 'Idioma',
    themeDark: 'Activar tema oscuro',
    themeLight: 'Activar tema claro',
    skip: 'Saltar al contenido',
  },
  hero: {
    status: 'Disponible para proyectos',
    ctaGithub: 'Ver mi GitHub',
    ctaLinkedin: 'LinkedIn',
    ctaProjects: 'Ver proyectos',
  },
  sections: {
    stack: {
      label: 'Stack técnico',
      title: 'Herramientas con las que construyo sistemas',
      lead: 'Backend en Java y Spring Boot, mensajería orientada a eventos y despliegue en contenedores y nube.',
    },
    experience: {
      label: 'Trayectoria',
      title: 'Experiencia profesional',
      present: 'Actualidad',
      partTime: 'Tiempo parcial',
    },
    projects: {
      label: 'Trabajo seleccionado',
      title: 'Proyectos en GitHub',
      lead: 'Código abierto que muestra cómo diseño servicios, integraciones e infraestructura.',
      repo: 'Repositorio',
      caseStudy: 'Ver detalle',
      featured: 'Destacado',
      more: 'Ver todos los repositorios',
    },
    certifications: {
      label: 'Credenciales',
      title: 'Certificaciones',
      verify: 'Verificar',
    },
    contact: {
      label: 'Contacto',
      title: '¿Construimos algo sólido?',
      lead: 'Cuéntame sobre tu proyecto con el formulario, revisa mi código en GitHub o escríbeme por LinkedIn.',
      form: {
        title: 'Envíame un mensaje',
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@empresa.com',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntame sobre el proyecto, el stack y los plazos…',
        submit: 'Enviar mensaje',
        sending: 'Enviando…',
        required: 'Este campo es obligatorio.',
        invalidEmail: 'Introduce un email válido.',
        tooShort: 'Escribe al menos 10 caracteres.',
        success: '¡Mensaje enviado! Te responderé lo antes posible.',
        sendAnother: 'Enviar otro mensaje',
        error: 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por LinkedIn.',
        notConfigured: 'El formulario aún no está activo. Mientras tanto, escríbeme por LinkedIn.',
        privacy: 'Solo uso tus datos para responderte.',
      },
    },
  },
  project: {
    back: 'Volver a proyectos',
    overview: 'Resumen',
    keyPoints: 'Puntos clave',
    stack: 'Stack',
    links: 'Enlaces',
    repo: 'Código en GitHub',
    next: 'Siguiente proyecto',
  },
  footer: {
    built: 'Hecho con Angular 20 y Tailwind CSS',
  },
};

export type Dictionary = typeof es;
