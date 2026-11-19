import { Routes } from '@angular/router';

export const PROJECTS_ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':slug',
    loadComponent: () => import('./project-detail.page').then((m) => m.ProjectDetailPage),
  },
];
