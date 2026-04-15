import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credenciales = {
    correo: '',
    password: ''
  };

  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.mensajeError = '';

    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        // Guardamos el token en localStorage
        this.authService.guardarToken(res.token);

        // Redirigimos según el rol
        if (this.authService.esAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/perfil']);
        }
      },
      error: (err) => {
        this.mensajeError = err.error.msg || 'Credenciales incorrectas.';
      }
    });
  }
}