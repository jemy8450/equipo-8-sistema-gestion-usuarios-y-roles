import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Obtenemos el AuthService
  const authService = inject(AuthService);
  
  // Obtenemos el token del localStorage
  const token = authService.obtenerToken();

  // Si hay token, lo agregamos al header x-auth-token
  if (token) {
    const reqConToken = req.clone({
      headers: req.headers.set('x-auth-token', token)
    });
    return next(reqConToken);
  }

  // Si no hay token, dejamos pasar la petición sin modificar
  return next(req);
};