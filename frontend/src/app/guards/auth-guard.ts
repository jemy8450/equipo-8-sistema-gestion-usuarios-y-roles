import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado() && authService.esAdmin()) {
    return true;
  }
  router.navigate(['/perfil']);
  return false;
};

export const editorGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rol = authService.obtenerRol();
  if (authService.estaAutenticado() && (rol === 'Admin' || rol === 'Editor')) {
    return true;
  }
  router.navigate(['/perfil']);
  return false;
};