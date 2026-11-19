import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService } from '../../../core/i18n';
import { Project } from '../../../core/models';
import {
  ButtonDirective,
  ExternalLinkDirective,
  IconComponent,
  ProjectCardComponent,
  RevealDirective,
  SectionHeaderComponent,
  NetworkBackgroundComponent,
} from '../../../shared/ui';

@Component({
  selector: 'app-projects-section',
  imports: [
    NetworkBackgroundComponent,
    ButtonDirective,
    ExternalLinkDirective,
    IconComponent,
    ProjectCardComponent,
    RevealDirective,
    SectionHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative isolate block overflow-hidden border-t border-line' },
  template: `
    <app-network-bg color="59, 130, 246" />
    <div class="container-editorial py-20 md:py-28">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <app-section-header
          index="03"
          icon="folder-git"
          [label]="t().sections.projects.label"
          [title]="t().sections.projects.title"
          [lead]="t().sections.projects.lead"
        />
        <a appButton variant="outline" appExternal [href]="githubUrl()" class="group shrink-0">
          <img src="icons/github.svg" alt="" class="size-4" />
          {{ t().sections.projects.more }}
          <app-icon
            name="arrow-up-right"
            class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <ul class="mt-12 grid gap-6 md:grid-cols-2">
        @for (project of projects(); track project.slug; let i = $index) {
          <li appReveal [revealDelay]="(i % 2) * 120">
            <app-project-card [project]="project" [index]="(i + 1).toString().padStart(2, '0')" />
          </li>
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
