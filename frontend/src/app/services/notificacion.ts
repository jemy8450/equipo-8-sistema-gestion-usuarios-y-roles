import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notificacion {
  mensaje: string;
  tipo: 'exito' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificacionSubject = new BehaviorSubject<Notificacion | null>(null);
  notificacion$ = this.notificacionSubject.asObservable();

  mostrar(mensaje: string, tipo: 'exito' | 'error' | 'info' = 'exito') {
    this.notificacionSubject.next({ mensaje, tipo });
    setTimeout(() => this.notificacionSubject.next(null), 3000);
  }

  exito(mensaje: string) { this.mostrar(mensaje, 'exito'); }
  error(mensaje: string) { this.mostrar(mensaje, 'error'); }
  info(mensaje: string) { this.mostrar(mensaje, 'info'); }
}