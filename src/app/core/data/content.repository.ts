import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificationGroup, Experience, Profile, Project, Stack } from '../models';

/**
 * Source of all portfolio content. Pages depend only on this token, so swapping the
 * static implementation for an HTTP one (a future backend) is a one-line provider change.
 */
export interface ContentRepository {
  getProfile(): Observable<Profile>;
  getStack(): Observable<Stack>;
  getExperience(): Observable<Experience[]>;
  getProjects(): Observable<Project[]>;
  getProject(slug: string): Observable<Project | undefined>;
  getCertifications(): Observable<CertificationGroup[]>;
}

export const CONTENT_REPOSITORY = new InjectionToken<ContentRepository>('CONTENT_REPOSITORY');
