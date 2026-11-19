import { Experience } from '../core/models';

export const EXPERIENCE: Experience[] = [
  {
    company: 'Doce Leguas S.L.',
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    location: { es: 'España · Plataforma OCRE (Openbravo ERP)', en: 'Spain · OCRE platform (Openbravo ERP)' },
    start: '2025-06',
    end: '2026-07',
    highlights: [
      {
        es: 'Construí el backend completo del Delivery Management System y del Warehouse Management System, con aplicaciones de integración para Openbravo ERP.',
        en: 'Built the full backend of the Delivery Management System and the Warehouse Management System, including integration apps for Openbravo ERP.',
      },
      {
        es: 'Diseñé el módulo de autenticación y autorización y la capa de integración segura con terceros.',
        en: 'Designed the authentication and authorization module and the secure third-party integration layer.',
      },
      {
        es: 'Optimicé PostgreSQL con EXPLAIN ANALYZE, triggers y procedimientos almacenados; reportes con Jasper Reports.',
        en: 'Tuned PostgreSQL with EXPLAIN ANALYZE, triggers and stored procedures; built reports with Jasper Reports.',
      },
      {
        es: 'Automatizaciones con n8n y agentes de IA/RAG sobre WhatsApp Evolution API y Telegram.',
        en: 'Delivered n8n automations and AI/RAG agent flows on WhatsApp Evolution API and Telegram.',
      },
      {
        es: 'Despliegue en AWS EC2 con Docker y Tomcat sobre Linux, con pipelines de GitLab CI/CD.',
        en: 'Deployed to AWS EC2 with Docker and Tomcat on Linux, using GitLab CI/CD pipelines.',
      },
    ],
    stack: ['Java', 'Hibernate', 'PostgreSQL', 'n8n', 'React', 'AWS EC2', 'Docker'],
  },
  {
    company: 'DATYS',
    role: { es: 'Ingeniero de Software', en: 'Software Engineer' },
    location: { es: 'Santiago de Cuba, Cuba', en: 'Santiago de Cuba, Cuba' },
    start: '2022-06',
    end: '2025-05',
    highlights: [
      {
        es: 'Hice multiinstancia el descargador de datos que escribe en Elasticsearch y Kafka: cada fuente de datos pasó a descargarse entre 3 y 4 veces más rápido.',
        en: 'Made the data downloader that writes to Elasticsearch and Kafka multi-instance, so each data source now downloads 3–4× faster.',
        impact: true,
      },
      {
        es: 'Mejoré alrededor de un 20 % el rendimiento de servicios legacy mediante refactorización.',
        en: 'Improved legacy service performance by around 20% through refactoring.',
        impact: true,
      },
      {
        es: 'Migré microservicios de Java 8 / Spring Boot 2 a Java 21 / Spring Boot 3.',
        en: 'Migrated microservices from Java 8 / Spring Boot 2 to Java 21 / Spring Boot 3.',
      },
      {
        es: 'Desarrollé y monitoreé pipelines de Kafka Streams; diseñé consultas y plantillas de Elasticsearch.',
        en: 'Built and monitored Kafka Streams pipelines; designed Elasticsearch queries and templates.',
      },
      {
        es: 'Dockericé servicios con CI/CD en GitLab y Jenkins; calidad con JUnit, Mockito, Cucumber, TDD y BDD.',
        en: 'Dockerized services with GitLab and Jenkins CI/CD; ensured quality with JUnit, Mockito, Cucumber, TDD and BDD.',
      },
    ],
    stack: ['Java 21', 'Spring Boot', 'Kafka Streams', 'Elasticsearch', 'Oracle', 'Angular'],
  },
  {
    company: 'Best Vision Solutions',
    role: { es: 'Ingeniero de Software', en: 'Software Engineer' },
    location: { es: 'Suiza', en: 'Switzerland' },
    start: '2023-11',
    end: '2025-05',
    partTime: true,
    highlights: [
      {
        es: 'Funcionalidades bancarias en una plataforma monolítica con Java, Spring MVC y Oracle PL/SQL.',
        en: 'Built banking features on a large monolithic platform with Java, Spring MVC and Oracle PL/SQL.',
      },
      {
        es: 'Optimicé cálculos financieros heredados y resolví más de 15 incidencias de producción.',
        en: 'Optimized legacy financial calculations and resolved 15+ production incidents.',
        impact: true,
      },
    ],
    stack: ['Java', 'Spring MVC', 'Oracle PL/SQL', 'Tomcat', 'Maven'],
  },
  {
    company: 'Biutix',
    role: { es: 'Ingeniero de Software', en: 'Software Engineer' },
    location: { es: 'Dresde, Alemania', en: 'Dresden, Germany' },
    start: '2024-12',
    end: '2025-02',
    partTime: true,
    highlights: [
      {
        es: 'Servicios backend con Spring Boot, Spring Cloud y WebFlux; facturas UBL y autenticación 2FA.',
        en: 'Backend services with Spring Boot, Spring Cloud and WebFlux; UBL invoicing and 2FA authentication.',
      },
      {
        es: 'Consultas de agregación en MongoDB e interfaces de administración con Angular.',
        en: 'MongoDB aggregation queries and admin interfaces in Angular.',
      },
    ],
    stack: ['Spring WebFlux', 'Spring Cloud', 'MongoDB', 'Angular', 'Firebase'],
  },
  {
    company: 'BTECH',
    role: { es: 'Ingeniero de Software', en: 'Software Engineer' },
    location: { es: 'México / Chile', en: 'Mexico / Chile' },
    start: '2023-09',
    end: '2024-04',
    partTime: true,
    highlights: [
      {
        es: 'Funcionalidades backend con Spring Boot y Spring Cloud, cerca de un 40 % más rápidas tras optimizarlas.',
        en: 'Backend features with Spring Boot and Spring Cloud, running about 40% faster after optimization.',
        impact: true,
      },
      {
        es: 'Generación y firma de PDF, exportación a Excel y módulos de búsqueda en Angular Material.',
        en: 'PDF generation and signing, Excel export, and search modules with Angular Material.',
      },
    ],
    stack: ['Spring Boot', 'Spring Data', 'Spring Cloud', 'Angular'],
  },
];
