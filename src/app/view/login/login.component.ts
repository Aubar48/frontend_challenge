import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { Auth } from '../../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  manejarEnvio() {
    if (this.loginForm.valid) {
      const userData: Auth = this.loginForm.value;

      this.loginService.loginUser(userData).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('authToken', response.token); // Guarda el token en localStorage

          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.router.navigate(['/homeMale']); // Cambia esto a la ruta que desees
          });
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          const errorMessage = error.error?.message || 'Usuario o contraseña incorrectos.';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa correctamente el formulario.',
      });
    }
  }

  logout() {
    this.loginService.logout(); // Llama al método de logout del servicio
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      this.router.navigate(['/login']); // Redirige al usuario a la página de login u otra ruta que prefieras
    });
  }
}
