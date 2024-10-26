import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service'; // Asegúrate de que la ruta es correcta
import { CommonModule } from '@angular/common';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { // Inyecta Router
    // Definir el formulario reactivo y sus validaciones
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Método para manejar el envío del formulario
  manejarEnvio() {
    if (this.loginForm.valid) {
      const userData: Login = this.loginForm.value; // Crea un objeto User
      this.loginService.loginUser(userData).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          
          // Almacena el token en el almacenamiento local
          localStorage.setItem('token', response.token); // Asegúrate de que el token está en la respuesta
          
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            // Redirigir al usuario a la página deseada después de que el usuario cierre la alerta
            this.router.navigate(['/homeMale']); // Cambia esto a la ruta que desees
          });
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos.',
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
}
