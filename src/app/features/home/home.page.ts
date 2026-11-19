import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CONTENT_REPOSITORY } from '../../core/data';
import { PageMetaService } from '../../core/layout';
import { CertificationsSectionComponent } from './sections/certifications-section';
import { ContactSectionComponent } from './sections/contact-section';
import { ExperienceSectionComponent } from './sections/experience-section';
import { HeroSectionComponent } from './sections/hero-section';
import { ProjectsSectionComponent } from './sections/projects-section';
import { StackSectionComponent } from './sections/stack-section';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroSectionComponent,
    StackSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    CertificationsSectionComponent,
    ContactSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (profile(); as profile) {
      <app-hero-section [profile]="profile" />
    }
    @if (stack(); as stack) {
      <app-stack-section id="stack" [stack]="stack" />
    }
    <app-experience-section id="experience" [experience]="experience()" />
    <app-projects-section id="projects" [projects]="projects()" [githubUrl]="profile()?.github ?? ''" />
    <app-certifications-section id="certifications" [groups]="certifications()" />
    @if (profile(); as profile) {
      <app-contact-section id="contact" [profile]="profile" />
    }
  `,
})
export class HomePage {
  private readonly content = inject(CONTENT_REPOSITORY);

  protected readonly profile = toSignal(this.content.getProfile());
  protected readonly stack = toSignal(this.content.getStack());
  protected readonly experience = toSignal(this.content.getExperience(), { initialValue: [] });
  protected readonly projects = toSignal(this.content.getProjects(), { initialValue: [] });
  protected readonly certifications = toSignal(this.content.getCertifications(), {
    initialValue: [],
  });

  constructor() {
    inject(PageMetaService).set(null);
  }
}
