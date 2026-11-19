import { Profile } from '../core/models';

export const PROFILE: Profile = {
  name: 'Lazaro Noel Guerra Medina',
  initials: 'LG',
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
    { value: '5+', label: { es: 'años de experiencia', en: 'years of experience' } },
    { value: '−70%', label: { es: 'tiempo de procesamiento', en: 'data processing time' } },
    { value: '+50%', label: { es: 'rendimiento en legacy', en: 'legacy service performance' } },
    { value: '8 → 21', label: { es: 'migración de Java', en: 'Java migration' } },
  ],
  github: 'https://github.com/LazaroDevelop',
  linkedin: 'https://www.linkedin.com/in/lazarogm13',
};
