import { Routes } from '@angular/router';

/** Each feature owns its routes and is lazy-loaded. */
export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES) },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.routes').then((m) => m.PROJECTS_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
