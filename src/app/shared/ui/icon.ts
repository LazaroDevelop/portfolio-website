import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  BriefcaseBusiness,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  FolderGit2,
  Layers,
  LucideAngularModule,
  MapPin,
  RefreshCcw,
  Rocket,
  Send,
  TrendingUp,
  Zap,
} from 'lucide-angular';

/** Registry of the Lucide icons the site uses. Content refers to icons by these names. */
export const ICONS = {
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  award: Award,
  briefcase: Briefcase,
  'briefcase-business': BriefcaseBusiness,
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  loader: LoaderCircle,
  'folder-git': FolderGit2,
  layers: Layers,
  'map-pin': MapPin,
  refresh: RefreshCcw,
  rocket: Rocket,
  send: Send,
  'trending-up': TrendingUp,
  zap: Zap,
} as const;

export type IconName = keyof typeof ICONS;

/** Line icon (Lucide). Size it with `size`; color follows `currentColor`. */
@Component({
  selector: 'app-icon',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0', 'aria-hidden': 'true' },
  template: `<lucide-icon [img]="img()" [size]="size()" [strokeWidth]="1.75" />`,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(16);
  protected readonly img = computed(() => ICONS[this.name()]);
}
