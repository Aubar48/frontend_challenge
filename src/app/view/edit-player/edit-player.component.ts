import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  @Input() playerCard!: PlayerCardModel; // No debe ser opcional si se va a editar
  @Output() updatePlayer = new EventEmitter<PlayerCardModel>();

  constructor(
    private cardFemaleService: CardFemaleService,
    private cardMaleService: CardMaleService,
    private route: ActivatedRoute // Para acceder a la ruta actual
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del parámetro de la ruta
    if (id) {
      const pathSegments = this.route.snapshot.url.map(segment => segment.path);
      const relevantPath = pathSegments.slice(0, 2).join('/'); // Obtener solo los dos primeros segmentos
  
      // Obtener el jugador por ID según el tipo
      if (relevantPath === 'female/edit') {
        this.cardFemaleService.getCardFemaleById(+id).subscribe({
          next: (player) => {
            this.playerCard = player; // Cargar los datos del jugador femenino en el componente
          },
          error: (err) => {
            console.error('Error al obtener la jugadora:', err);
            // Manejar el error adecuadamente, tal vez redirigir o mostrar un mensaje
          }
        });
      } else if (relevantPath === 'players/edit') {
        this.cardMaleService.getCardMaleById(+id).subscribe({
          next: (player) => {
            this.playerCard = player; // Cargar los datos del jugador masculino en el componente
          },
          error: (err) => {
            console.error('Error al obtener el jugador:', err);
            // Manejar el error adecuadamente, tal vez redirigir o mostrar un mensaje
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
    if (this.playerCard) {
      const pathSegments = this.route.snapshot.url.map(segment => segment.path);
      const relevantPath = pathSegments.slice(0, 2).join('/'); // Obtener solo los dos primeros segmentos

      // Comprobar el path y llamar al servicio correspondiente
      if (relevantPath === 'female/edit') {
        this.cardFemaleService.putCardFemale(this.playerCard).subscribe({
          next: () => {
            console.log('Tarjeta femenina actualizada con éxito');
            this.updatePlayer.emit(this.playerCard); // Emitir el evento de actualización
          },
          error: (err) => console.error('Error al actualizar tarjeta femenina:', err) // Manejo de errores
        });
      } else if (relevantPath === 'players/edit') {
        this.cardMaleService.putCardMale(this.playerCard).subscribe({
          next: () => {
            console.log('Tarjeta masculina actualizada con éxito');
            this.updatePlayer.emit(this.playerCard); // Emitir el evento de actualización
          },
          error: (err) => console.error('Error al actualizar tarjeta masculina:', err) // Manejo de errores
        });
      } else {
        console.warn('Path no reconocido:', relevantPath);
      }
    } else {
      console.warn('No hay jugador para actualizar.');
    }
  }
}
