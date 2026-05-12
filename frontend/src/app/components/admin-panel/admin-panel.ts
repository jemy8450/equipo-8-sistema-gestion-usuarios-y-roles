import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanelComponent implements OnInit {
  usuarios: any[] = [];
  usuarioEditando: any = null;
  esAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.usuarios = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
    this.cdr.detectChanges();
  }

  guardarCambios() {
    const datos: any = {
      nombre: this.usuarioEditando.nombre,
      correo: this.usuarioEditando.correo
    };

    if (this.esAdmin) {
      datos.rol = this.usuarioEditando.rol;
    }

    this.authService.actualizarUsuario(this.usuarioEditando._id, datos).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.usuarioEditando = null;
        this.cargarUsuarios();
      },
      error: (err) => alert('Error: ' + err.error.msg)
    });
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.authService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.cargarUsuarios();
        },
        error: (err) => alert('Error: ' + err.error.msg)
      });
    }
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
    this.cdr.detectChanges();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}