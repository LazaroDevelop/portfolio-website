import type { IconName } from '../../shared/ui/icon';

export type { IconName };

export type Lang = 'es' | 'en';

/** Text available in every supported language. */
export type Localized = Record<Lang, string>;

export interface ExternalLink {
  label: Localized;
  url: string;
}

export interface Metric {
  value: string;
  label: Localized;
  icon: IconName;
}

/** An experience bullet; `impact` marks measurable results (shown with a trend icon). */
export type Highlight = Localized & { impact?: boolean };

export interface Photo {
  /** Large square image (hero). */
  src: string;
  /** JPEG fallback for `src`. */
  fallback: string;
  /** Small square image (header avatar). */
  srcSmall: string;
  alt: Localized;
}

export interface Profile {
  name: string;
  initials: string;
  photo: Photo;
  role: Localized;
  headline: Localized;
  location: string;
  summary: Localized;
  metrics: Metric[];
  github: string;
  linkedin: string;
  /** Only shown when set. */
  email?: string;
}

export interface Tech {
  name: string;
  /** File name in public/icons without extension. */
  icon: string;
}

export interface StackGroup {
  title: Localized;
  items: string[];
}

export interface Stack {
  primary: Tech[];
  secondary: Tech[];
  groups: StackGroup[];
}

export interface Experience {
  company: string;
  role: Localized;
  location: Localized;
  /** ISO year-month, e.g. `2025-06`. */
  start: string;
  end: string;
  partTime?: boolean;
  highlights: Highlight[];
  stack: string[];
}

export interface Project {
  slug: string;
  name: Localized;
  tagline: Localized;
  overview: Localized;
  keyPoints: Localized[];
  stack: string[];
  repoUrl: string;
  extraLinks?: ExternalLink[];
  featured?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  url?: string;
}

export interface CertificationGroup {
  title: Localized;
  items: Certification[];
}
