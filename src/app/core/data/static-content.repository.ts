import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CERTIFICATIONS } from '../../content/certifications.data';
import { EXPERIENCE } from '../../content/experience.data';
import { PROFILE } from '../../content/profile.data';
import { PROJECTS } from '../../content/projects.data';
import { STACK } from '../../content/stack.data';
import { CertificationGroup, Experience, Profile, Project, Stack } from '../models';
import { ContentRepository } from './content.repository';

/** Serves the bundled content in `src/app/content`. */
@Injectable()
export class StaticContentRepository implements ContentRepository {
  getProfile(): Observable<Profile> {
    return of(PROFILE);
  }

  getStack(): Observable<Stack> {
    return of(STACK);
  }

  getExperience(): Observable<Experience[]> {
    return of(EXPERIENCE);
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProject(slug: string): Observable<Project | undefined> {
    return of(PROJECTS.find((project) => project.slug === slug));
  }

  getCertifications(): Observable<CertificationGroup[]> {
    return of(CERTIFICATIONS);
  }
}
