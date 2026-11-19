import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService } from '../../../core/i18n';
import { Project } from '../../../core/models';
import {
  ButtonDirective,
  ExternalLinkDirective,
  ProjectCardComponent,
  SectionHeaderComponent,
} from '../../../shared/ui';

@Component({
  selector: 'app-projects-section',
  imports: [ButtonDirective, ExternalLinkDirective, ProjectCardComponent, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-line' },
  template: `
    <div class="container-editorial py-20 md:py-28">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <app-section-header
          index="03"
          [label]="t().sections.projects.label"
          [title]="t().sections.projects.title"
          [lead]="t().sections.projects.lead"
        />
        <a appButton variant="outline" appExternal [href]="githubUrl()" class="shrink-0">
          {{ t().sections.projects.more }} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <ul class="mt-12 grid gap-6 md:grid-cols-2">
        @for (project of projects(); track project.slug; let i = $index) {
          <li><app-project-card [project]="project" [index]="(i + 1).toString().padStart(2, '0')" /></li>
        }
      </ul>
    </div>
  `,
})
export class ProjectsSectionComponent {
  readonly projects = input.required<Project[]>();
  readonly githubUrl = input.required<string>();
  protected readonly t = inject(LanguageService).t;
}
