import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent {
  playerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cardMaleService: CardMaleService,
    private cardFemaleService: CardFemaleService,
    private route: ActivatedRoute,
    private router: Router // Inyección del servicio Router para la redirección
  ) {
    this.playerForm = this.fb.group({
      fifa_version: ['', Validators.required],
      fifa_update: ['', Validators.required],
      player_face_url: ['', Validators.required],
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      overall: [0, Validators.required],
      potential: [0, Validators.required],
      age: [null, Validators.required]
    });
  }

  createPlayer() {
    const pathSegments = this.route.snapshot.url.map(segment => segment.path);
    const relevantPath = pathSegments.slice(0, 2).join('/');

    if (this.playerForm.valid) {
      const newPlayerData = this.playerForm.value as PlayerCardModel;

      Swal.fire({
        title: '¿Deseas crear este jugador?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          if (relevantPath === 'players/create') {
            this.cardMaleService.postCardMale(newPlayerData).subscribe({
              next: (response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Creación exitosa',
                  text: 'El jugador ha sido creado correctamente',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true
                }).then(() => {
                  this.router.navigate(['/homeMale']); // Redirección a la vista masculina
                });
              },
              error: (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Hubo un problema al crear el jugador.',
                });
                console.error('Error al crear jugador masculino:', err);
              }
            });
          } else if (relevantPath === 'female/create') {
            this.cardFemaleService.postCardFemale(newPlayerData).subscribe({
              next: (response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Creación exitosa',
                  text: 'La jugadora ha sido creada correctamente',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true
                }).then(() => {
                  this.router.navigate(['/homeFemale']); // Redirección a la vista femenina
                });
              },
              error: (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Hubo un problema al crear la jugadora.',
                });
                console.error('Error al crear jugadora femenina:', err);
              }
            });
          } else {
            console.warn('Path no reconocido:', relevantPath);
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos obligatorios.'
      });
    }
  }
}
