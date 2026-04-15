import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = { nombre: '', correo: '', rol: '' };
  editando: boolean = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.authService.obtenerPerfil().subscribe({
      next: (res) => {
        this.usuario = { ...res };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar datos', err)
    });
  }

  guardar() {
    const datosNuevos = {
      nombre: this.usuario.nombre,
      correo: this.usuario.correo
    };

    this.authService.actualizarPerfil(datosNuevos).subscribe({
      next: () => {
        alert('¡Perfil actualizado!');
        this.editando = false;
        this.cargarDatos();
      },
      error: (err) => alert('Error: ' + err.error.msg)
    });
  }

  cerrarSesion() {
    this.authService.logout();
  }
}