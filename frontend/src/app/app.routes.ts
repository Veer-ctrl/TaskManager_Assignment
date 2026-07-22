import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then((m) => m.Login),
    canActivate: [loginGuard],
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/task-page/task-page').then((m) => m.TaskPage),
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];