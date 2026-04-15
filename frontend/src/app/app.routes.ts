import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Ruta por defecto - redirige al login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Ruta pública - Login
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },

  // Ruta pública - Registro
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro').then(m => m.RegistroComponent)
  },

  // Ruta privada - Perfil (cualquier usuario autenticado)
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/perfil/perfil').then(m => m.PerfilComponent),
    canActivate: [authGuard]
  },

  // Ruta privada - Admin Panel (solo Admin)
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-panel/admin-panel').then(m => m.AdminPanelComponent),
    canActivate: [authGuard, adminGuard]
  },

  // Cualquier ruta desconocida redirige al login
  {
    path: '**',
    redirectTo: '/login'
  }
];