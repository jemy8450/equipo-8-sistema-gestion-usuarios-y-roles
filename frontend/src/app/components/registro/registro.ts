import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  nuevoUsuario = {
    nombre: '',
    correo: '',
    password: '',
    rol: 'Viewer'
  };

  constructor(private authService: AuthService, private router: Router) {}

  ejecutarRegistro() {
    this.authService.registrar(this.nuevoUsuario).subscribe({
      next: () => {
        alert('¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Error en el registro: ' + (err.error.msg || 'Intenta de nuevo'));
      }
    });
  }
}