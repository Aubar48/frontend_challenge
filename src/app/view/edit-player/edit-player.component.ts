import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  @Input() playerCard!: PlayerCardModel;
  @Output() updatePlayer = new EventEmitter<PlayerCardModel>();

  constructor(
    private cardFemaleService: CardFemaleService,
    private cardMaleService: CardMaleService,
    private route: ActivatedRoute,
    private router: Router // Inyección del servicio Router para la redirección
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const pathSegments = this.route.snapshot.url.map(segment => segment.path);
      const relevantPath = pathSegments.slice(0, 2).join('/');

      if (relevantPath === 'female/edit') {
        this.cardFemaleService.getCardFemaleById(+id).subscribe({
          next: (player) => {
            this.playerCard = player;
          },
          error: (err) => {
            console.error('Error al obtener la jugadora:', err);
          }
        });
      } else if (relevantPath === 'players/edit') {
        this.cardMaleService.getCardMaleById(+id).subscribe({
          next: (player) => {
            this.playerCard = player;
          },
          error: (err) => {
            console.error('Error al obtener el jugador:', err);
          }
        });
      } else {
        console.warn('Path no reconocido:', relevantPath);
      }
    } else {
      console.warn('No se ha proporcionado un ID válido.');
    }
  }

  onUpdate() {
    Swal.fire({
      title: '¿Deseas actualizar los datos del jugador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && this.playerCard) {
        const pathSegments = this.route.snapshot.url.map(segment => segment.path);
        const relevantPath = pathSegments.slice(0, 2).join('/');

        if (relevantPath === 'female/edit') {
          this.cardFemaleService.putCardFemale(this.playerCard).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'La tarjeta femenina ha sido actualizada correctamente',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
              }).then(() => {
                this.router.navigate(['/homeFemale']); // Redirección a la vista femenina
              });
              this.updatePlayer.emit(this.playerCard);
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar la tarjeta femenina.',
              });
              console.error('Error al actualizar tarjeta femenina:', err);
            }
          });
        } else if (relevantPath === 'players/edit') {
          this.cardMaleService.putCardMale(this.playerCard).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'La tarjeta masculina ha sido actualizada correctamente',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
              }).then(() => {
                this.router.navigate(['/homeMale']); // Redirección a la vista masculina
              });
              this.updatePlayer.emit(this.playerCard);
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar la tarjeta masculina.',
              });
              console.error('Error al actualizar tarjeta masculina:', err);
            }
          });
        } else {
          console.warn('Path no reconocido:', relevantPath);
        }
      } else {
        console.warn('No hay jugador para actualizar.');
      }
    });
  }
}
