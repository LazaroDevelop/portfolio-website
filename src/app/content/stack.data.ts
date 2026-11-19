import { Stack } from '../core/models';

export const STACK: Stack = {
  primary: [
    { name: 'Java', icon: 'java-original' },
    { name: 'Spring Boot', icon: 'spring-original' },
    { name: 'Apache Kafka', icon: 'apachekafka-original' },
    { name: 'Docker', icon: 'docker-original' },
    { name: 'AWS', icon: 'amazonwebservices-original' },
  ],
  secondary: [
    { name: 'PostgreSQL', icon: 'postgresql-original' },
    { name: 'Elasticsearch', icon: 'elasticsearch-original' },
    { name: 'Terraform', icon: 'terraform-original' },
    { name: 'Angular', icon: 'angular-original' },
    { name: 'React', icon: 'react-original' },
  ],
  groups: [
    {
      title: { es: 'Backend', en: 'Backend' },
      items: [
        'Java 21',
        'Spring Boot',
        'Spring WebFlux',
        'Spring Data',
        'Spring Security',
        'Spring Cloud',
        'Hibernate',
        'REST',
        'Microservices',
      ],
    },
    {
      title: { es: 'Datos', en: 'Data' },
      items: ['PostgreSQL', 'Oracle PL/SQL', 'Elasticsearch', 'MongoDB', 'Jasper Reports'],
    },
    {
      title: { es: 'Mensajería', en: 'Messaging' },
      items: ['Kafka', 'Kafka Streams', 'RabbitMQ', 'AWS SNS/SQS', 'n8n'],
    },
    {
      title: { es: 'Nube y DevOps', en: 'Cloud & DevOps' },
      items: ['AWS EC2', 'LocalStack', 'Docker', 'Terraform', 'GitLab CI/CD', 'Jenkins', 'Linux'],
    },
    {
      title: { es: 'Testing', en: 'Testing' },
      items: ['JUnit', 'Mockito', 'Cucumber', 'TDD', 'BDD'],
    },
    {
      title: { es: 'IA', en: 'AI' },
      items: ['Spring AI', 'Ollama', 'RAG', 'pgvector', 'Claude Code'],
    },
  ],
};
