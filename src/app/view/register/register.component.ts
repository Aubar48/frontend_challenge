import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register/register.service';
import { Auth } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    // Definir el formulario reactivo y sus validaciones
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Método para manejar el envío del formulario
  manejarEnvio() {
    if (this.registerForm.valid) {
      const userData: Auth = this.registerForm.value;
      this.registerService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado',
            text: 'El registro se ha realizado con éxito',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
          this.registerForm.reset(); // Limpiar el formulario
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: 'No se pudo completar el registro. Por favor, inténtalo de nuevo.',
            showConfirmButton: true
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Inválido',
        text: 'Por favor completa correctamente el formulario.',
        showConfirmButton: true
      });
    }
  }
}
