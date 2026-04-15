import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // ==========================================
  // AUTENTICACIÓN
  // ==========================================

  // Registrar nuevo usuario
  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registrar`, datos);
  }

  // Iniciar sesión
  login(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, datos);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // ==========================================
  // MANEJO DEL TOKEN
  // ==========================================

  // Guardar token en localStorage
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener token
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si hay sesión activa
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  // Obtener el rol del usuario desde el token
  obtenerRol(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;

    try {
      // El token JWT tiene 3 partes separadas por puntos
      // La parte del medio (index 1) tiene los datos del usuario
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.usuario.rol;
    } catch (error) {
      return null;
    }
  }

  // Verificar si el usuario es Admin
  esAdmin(): boolean {
    return this.obtenerRol() === 'Admin';
  }

  // ==========================================
  // PERFIL DE USUARIO
  // ==========================================

  // Obtener mi perfil
  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/perfil`);
  }

  // Actualizar mi perfil
  actualizarPerfil(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/perfil`, datos);
  }

  // ==========================================
  // CRUD ADMIN
  // ==========================================

  // Obtener todos los usuarios (solo Admin)
 obtenerUsuarios(): Observable<any> {
  return this.http.get(`${this.apiUrl}/usuarios`, {
    headers: { 'Cache-Control': 'no-cache' }
  });
}

  // Actualizar cualquier usuario (solo Admin)
  actualizarUsuario(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, datos);
  }

  // Eliminar usuario (solo Admin)
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}