import { Routes } from '@angular/router';
import { authGuard, editorGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro').then(m => m.RegistroComponent)
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/perfil/perfil').then(m => m.PerfilComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-panel/admin-panel').then(m => m.AdminPanelComponent),
    canActivate: [authGuard, editorGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];