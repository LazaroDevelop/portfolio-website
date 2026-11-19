import { Project } from '../core/models';

export const PROJECTS: Project[] = [
  {
    slug: 'rag-ai-assistant',
    name: { es: 'Asistente de IA con RAG', en: 'RAG AI Assistant' },
    tagline: {
      es: 'Chat con recuperación aumentada usando modelos locales.',
      en: 'Retrieval-augmented chat running on local models.',
    },
    overview: {
      es: 'Asistente conversacional construido con Spring Boot 3, Spring AI y Java 21. Usa modelos locales de Ollama y guarda los embeddings en PostgreSQL con pgvector, todo orquestado con Docker Compose.',
      en: 'Conversational assistant built with Spring Boot 3, Spring AI and Java 21. It runs local Ollama models and stores embeddings in PostgreSQL with pgvector, all orchestrated with Docker Compose.',
    },
    keyPoints: [
      {
        es: 'Pipeline RAG con Spring AI: ingesta, embeddings y búsqueda por similitud.',
        en: 'RAG pipeline with Spring AI: ingestion, embeddings and similarity search.',
      },
      {
        es: 'Modelos locales con Ollama, sin depender de APIs externas.',
        en: 'Local models via Ollama, with no dependency on external APIs.',
      },
      {
        es: 'Almacén vectorial en PostgreSQL + pgvector.',
        en: 'Vector store on PostgreSQL + pgvector.',
      },
      {
        es: 'Entorno reproducible con Docker Compose.',
        en: 'Reproducible environment with Docker Compose.',
      },
    ],
    stack: ['Java 21', 'Spring Boot 3', 'Spring AI', 'Ollama', 'pgvector', 'Docker'],
    repoUrl: 'https://github.com/LazaroDevelop/chat-assitant-spring-ai',
    featured: true,
  },
  {
    slug: 'spring-localstack-aws',
    name: { es: 'Spring Boot + LocalStack + Terraform', en: 'Spring Boot + LocalStack + Terraform' },
    tagline: {
      es: 'Flujo orientado a eventos SNS → SQS aprovisionado como código.',
      en: 'Event-driven SNS → SQS flow provisioned as code.',
    },
    overview: {
      es: 'Servicio en Java 21 y Spring Boot 3.4 que publica y consume eventos a través de AWS SNS y SQS. La infraestructura se aprovisiona con Terraform sobre LocalStack para desarrollar y probar AWS en local.',
      en: 'Java 21 and Spring Boot 3.4 service that publishes and consumes events through AWS SNS and SQS. Infrastructure is provisioned with Terraform on LocalStack to develop and test AWS locally.',
    },
    keyPoints: [
      {
        es: 'Arquitectura orientada a eventos: fan-out de SNS hacia colas SQS.',
        en: 'Event-driven architecture: SNS fan-out to SQS queues.',
      },
      {
        es: 'Infraestructura como código con Terraform.',
        en: 'Infrastructure as code with Terraform.',
      },
      {
        es: 'Emulación de AWS con LocalStack, sin costes de nube.',
        en: 'AWS emulation with LocalStack, at no cloud cost.',
      },
    ],
    stack: ['Java 21', 'Spring Boot 3.4', 'AWS SNS', 'AWS SQS', 'Terraform', 'LocalStack'],
    repoUrl: 'https://github.com/LazaroDevelop/spring-localstack-aws-integration',
    featured: true,
  },
  {
    slug: 'microservices-infrastructure',
    name: { es: 'Infraestructura de microservicios', en: 'Microservices infrastructure' },
    tagline: {
      es: 'Gateway, descubrimiento y configuración centralizada con Spring Cloud.',
      en: 'Gateway, discovery and centralized config with Spring Cloud.',
    },
    overview: {
      es: 'Base de microservicios con Java 17 y Spring Boot: Spring Cloud Gateway como punto de entrada, Eureka para el descubrimiento de servicios y Config Server para la configuración, más un módulo núcleo compartido y un servicio de pedidos.',
      en: 'Microservices foundation with Java 17 and Spring Boot: Spring Cloud Gateway as the entry point, Eureka for service discovery and Config Server for configuration, plus a shared core module and an orders service.',
    },
    keyPoints: [
      {
        es: 'Enrutamiento centralizado con Spring Cloud Gateway.',
        en: 'Centralized routing with Spring Cloud Gateway.',
      },
      { es: 'Descubrimiento de servicios con Eureka.', en: 'Service discovery with Eureka.' },
      {
        es: 'Configuración externalizada con Config Server.',
        en: 'Externalized configuration with Config Server.',
      },
      {
        es: 'Módulo núcleo reutilizable entre servicios.',
        en: 'Core module reused across services.',
      },
    ],
    stack: ['Java 17', 'Spring Boot', 'Spring Cloud Gateway', 'Eureka', 'Config Server'],
    repoUrl: 'https://github.com/LazaroDevelop/intercomunication-services',
  },
  {
    slug: 'charging-stations-service',
    name: { es: 'Charging Stations Service', en: 'Charging Stations Service' },
    tagline: {
      es: 'Microservicio REST con caché, pruebas y documentación OpenAPI.',
      en: 'REST microservice with caching, tests and OpenAPI docs.',
    },
    overview: {
      es: 'Microservicio REST para gestionar estaciones de carga, construido con Spring Boot y Spring Data JPA sobre MySQL, con caché en Redis, pruebas con JUnit y Mockito, documentación Swagger/OpenAPI y empaquetado con Docker.',
      en: 'REST microservice for managing charging stations, built with Spring Boot and Spring Data JPA on MySQL, with Redis caching, JUnit and Mockito tests, Swagger/OpenAPI docs and Docker packaging.',
    },
    keyPoints: [
      { es: 'Persistencia con Spring Data JPA y MySQL.', en: 'Persistence with Spring Data JPA and MySQL.' },
      { es: 'Caché de lecturas con Redis.', en: 'Read caching with Redis.' },
      { es: 'Pruebas unitarias con JUnit y Mockito.', en: 'Unit tests with JUnit and Mockito.' },
      { es: 'Contrato documentado con OpenAPI.', en: 'Contract documented with OpenAPI.' },
    ],
    stack: ['Spring Boot', 'Spring Data JPA', 'MySQL', 'Redis', 'JUnit', 'Docker'],
    repoUrl: 'https://github.com/LazaroDevelop/Charging-Stations-Service',
  },
  {
    slug: 'nestjs-microservices',
    name: { es: 'Microservicios con NestJS', en: 'NestJS microservices' },
    tagline: {
      es: 'Gateway de cliente y servicio de pedidos en TypeScript.',
      en: 'Client gateway and orders service in TypeScript.',
    },
    overview: {
      es: 'Sistema de microservicios con NestJS: un client gateway que expone la API y un microservicio de pedidos con Prisma y PostgreSQL, ejecutados con Docker Compose.',
      en: 'NestJS microservices system: a client gateway exposing the API and an orders microservice using Prisma and PostgreSQL, run with Docker Compose.',
    },
    keyPoints: [
      { es: 'Gateway como único punto de entrada.', en: 'Gateway as the single entry point.' },
      { es: 'Acceso a datos con Prisma y PostgreSQL.', en: 'Data access with Prisma and PostgreSQL.' },
      { es: 'Orquestación local con Docker Compose.', en: 'Local orchestration with Docker Compose.' },
    ],
    stack: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/NestJS-MIcroservices-LS/client-gateway',
    extraLinks: [
      {
        label: { es: 'Servicio de pedidos', en: 'Orders service' },
        url: 'https://github.com/NestJS-MIcroservices-LS/orders-microservice',
      },
    ],
  },
];
