import { Profile } from '../core/models';

export const PROFILE: Profile = {
  name: 'Lazaro Noel Guerra Medina',
  initials: 'LG',
  photo: {
    src: 'images/profile-800.webp',
    fallback: 'images/profile-800.jpg',
    srcSmall: 'images/profile-160.webp',
    alt: {
      es: 'Lazaro Guerra sonriendo en la Plaza Independencia de Montevideo',
      en: 'Lazaro Guerra smiling at Plaza Independencia in Montevideo',
    },
  },
  role: {
    es: 'Ingeniero Backend',
    en: 'Backend Engineer',
  },
  headline: {
    es: 'Construyo backends robustos con Java, Spring Boot y arquitecturas orientadas a eventos.',
    en: 'I build robust backends with Java, Spring Boot and event-driven architectures.',
  },
  location: 'Montevideo, Uruguay',
  summary: {
    es: 'Ingeniero backend con 5 años de experiencia en sistemas empresariales con Java, Spring Boot, Hibernate, PostgreSQL y Oracle. Construí el backend completo de un Warehouse Management System y un Delivery Management System integrados con Openbravo ERP. Trabajo con APIs REST, microservicios, Kafka, Kafka Streams, SNS/SQS y Elasticsearch.',
    en: 'Backend engineer with 5 years of experience building enterprise systems with Java, Spring Boot, Hibernate, PostgreSQL and Oracle. I built the full backend of a Warehouse Management System and a Delivery Management System integrated with Openbravo ERP. I work with REST APIs, microservices, Kafka, Kafka Streams, SNS/SQS and Elasticsearch.',
  },
  metrics: [
    {
      value: '5+',
      label: { es: 'años de experiencia', en: 'years of experience' },
      icon: 'briefcase-business',
    },
    {
      value: '10+',
      label: { es: 'proyectos exitosos', en: 'successful projects' },
      icon: 'circle-check',
    },
    {
      value: '3–4×',
      label: { es: 'ingesta más rápida por fuente', en: 'faster ingestion per source' },
      icon: 'zap',
    },
    {
      value: '+20%',
      label: { es: 'rendimiento en legacy', en: 'legacy service performance' },
      icon: 'rocket',
    },
  ],
  github: 'https://github.com/LazaroDevelop',
  linkedin: 'https://www.linkedin.com/in/lazarogm13',
};
