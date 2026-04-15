import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// Guard para verificar si el usuario está autenticado
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  }

  // Si no está autenticado, lo mandamos al login
  router.navigate(['/login']);
  return false;
};

// Guard para verificar si el usuario es Admin
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado() && authService.esAdmin()) {
    return true;
  }

  // Si no es Admin, lo mandamos al perfil
  router.navigate(['/perfil']);
  return false;
};