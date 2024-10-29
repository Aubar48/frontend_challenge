import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerCardModel } from '../../models/player-card.model';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {
  @Input() playerCard?: PlayerCardModel; // Individual player card

  @Output() deletePlayer = new EventEmitter<number>(); // Emite el ID para borrar
  @Output() editPlayer = new EventEmitter<number>(); // Emite el modelo para editar
  @Output() viewMore = new EventEmitter<number>(); // Emite el ID para ver más
  router: any;

  onDelete() {
    if (this.playerCard) {
      this.deletePlayer.emit(this.playerCard.id);
    } else {
      console.warn('playerCard is undefined during delete');
    }
  }
  

  onEdit() {
    if (this.playerCard) {
      this.editPlayer.emit(this.playerCard.id);
    } else {
      console.warn('playerCard is undefined during edit');
    }
  }

  onViewMore() {
    if (this.playerCard) {
      this.viewMore.emit(this.playerCard.id);
    } else {
      console.warn('playerCard is undefined during view more');
    }
  }
  
}
