import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service'; // Asegúrate de que la ruta es correcta
import { CommonModule } from '@angular/common';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // Definir el formulario reactivo y sus validaciones
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Método para manejar el envío del formulario
  manejarEnvio() {
    if (this.loginForm.valid) {
      const userData: Login = this.loginForm.value; // Crea un objeto User
      this.loginService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
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
