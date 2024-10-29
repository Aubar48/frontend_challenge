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
  imports: [ReactiveFormsModule, CommonModule, FormsModule ],
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

  ngOnInit() {}

  onUpdate() {
    if (this.playerCard) {
      const path = this.route.snapshot.url[0]?.path; // Obtener el path de la ruta actual

      // Comprobar el path y llamar al servicio correspondiente
      if (path === 'female/edit') {
        this.cardFemaleService.putCardFemale(this.playerCard).subscribe({
          next: () => {
            console.log('Tarjeta femenina actualizada con éxito');
            this.updatePlayer.emit(this.playerCard); // Emitir el evento de actualización
          },
          error: (err) => console.error('Error al actualizar tarjeta femenina:', err) // Manejo de errores
        });
      } else if (path === 'players/edit') {
        this.cardMaleService.putCardMale(this.playerCard).subscribe({
          next: () => {
            console.log('Tarjeta masculina actualizada con éxito');
            this.updatePlayer.emit(this.playerCard); // Emitir el evento de actualización
          },
          error: (err) => console.error('Error al actualizar tarjeta masculina:', err) // Manejo de errores
        });
      } else {
        console.warn('Path no reconocido:', path);
      }
    } else {
      console.warn('No hay jugador para actualizar.');
    }
  }
}
