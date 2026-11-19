import { CertificationGroup } from '../core/models';

export const CERTIFICATIONS: CertificationGroup[] = [
  {
    title: { es: 'Nube, contenedores e IA', en: 'Cloud, containers & AI' },
    items: [
      {
        name: 'AWS Cloud Technical Essentials',
        issuer: 'Coursera',
        url: 'https://coursera.org/share/ab95773cda0d27fb274b352c108e7e29',
      },
      {
        name: 'AWS Educate: Introduction to Generative AI',
        issuer: 'Credly',
        url: 'https://www.credly.com/earner/earned/badge/452dc027-7226-4821-a81c-271ef5fae914',
      },
      { name: 'Docker Professional Foundation', issuer: 'LinkedIn Learning' },
      {
        name: 'Claude 101',
        issuer: 'Claude Academy',
        url: 'https://academy.claude.com/verify/9bab527e059e3c986746e98c5c018bb5',
      },
      {
        name: 'Claude Code 101',
        issuer: 'Claude Academy',
        url: 'https://academy.claude.com/verify/4fd78b044900247ab6d4e530e6429231',
      },
    ],
  },
  {
    title: { es: 'Java y Spring', en: 'Java & Spring' },
    items: [
      {
        name: 'Oracle Java Foundation',
        issuer: 'Coursera',
        url: 'https://coursera.org/share/d9c54266d06972405f5e4388abe7a15c',
      },
      {
        name: 'Core Java Specialization',
        issuer: 'Coursera',
        url: 'https://coursera.org/share/d3d3c5b379c5d780a580bb2495ca377b',
      },
      {
        name: 'Spring: Ecosystem and Core',
        issuer: 'Coursera',
        url: 'https://coursera.org/share/e0bde24b7ef588714cef15345b68f030',
      },
      {
        name: 'Spring MVC, Spring Boot and REST Controllers',
        issuer: 'Coursera',
        url: 'https://coursera.org/share/f5b5114ffdd98fb64e51de78e6984e7c',
      },
    ],
  },
  {
    title: { es: 'HackerRank', en: 'HackerRank' },
    items: [
      {
        name: 'Software Engineer',
        issuer: 'HackerRank',
        url: 'https://www.hackerrank.com/certificates/341529f6f1a1',
      },
      {
        name: 'Problem Solving',
        issuer: 'HackerRank',
        url: 'https://www.hackerrank.com/certificates/98389c467fb0',
      },
      { name: 'Java', issuer: 'HackerRank', url: 'https://www.hackerrank.com/certificates/3c445611cb78' },
      {
        name: 'SQL (Advanced)',
        issuer: 'HackerRank',
        url: 'https://www.hackerrank.com/certificates/27480addfa69',
      },
      {
        name: 'JavaScript',
        issuer: 'HackerRank',
        url: 'https://www.hackerrank.com/certificates/230646a2a453',
      },
      {
        name: 'Angular (Intermediate)',
        issuer: 'HackerRank',
        url: 'https://www.hackerrank.com/certificates/f04081993f8a',
      },
    ],
  },
  {
    title: { es: 'Idiomas y otros', en: 'Languages & other' },
    items: [
      { name: 'English C1 (EF SET)', issuer: 'EF SET', url: 'https://www.efset.org/cert/UYCq8z' },
      {
        name: 'Crash Course on Python',
        issuer: 'Coursera',
        url: 'https://coursera.org/share/bf7ada9c37c33231765944957ea256ab',
      },
    ],
  },
];
