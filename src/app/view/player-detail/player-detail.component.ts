import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule, Location } from '@angular/common';
import { CardMaleService } from '../../services/card-male/card-male.service';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  @Input() playerCard?: PlayerCardModel;
  
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() editPlayer = new EventEmitter<PlayerCardModel>();

  constructor(
    private route: ActivatedRoute,
    private cardFemaleService: CardFemaleService,
    private cardMaleService: CardMaleService,
    private location: Location
  ) {}

  ngOnInit() {
    this.onLoadId();
  }

  private onLoadId() {
    const id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url[0]?.path;

    if (id) {
      const idNumber = Number(id);
      if (path === 'female') {
        this.cardFemaleService.getCardFemaleById(idNumber).subscribe({
          next: (female) => this.playerCard = female,
          error: (err) => console.error('Error al cargar tarjeta femenina:', err)
        });
      } else if (path === 'players') {
        this.cardMaleService.getCardMaleById(idNumber).subscribe({
          next: (player) => this.playerCard = player,
          error: (err) => console.error('Error al cargar tarjeta masculina:', err)
        });
      }
    } else {
      console.warn('ID de jugador no encontrado');
    }
  }

  onDelete() {
    if (this.playerCard) {
      const path = this.route.snapshot.url[0]?.path;
      if (path === 'female') {
        this.deleteFemaleCard(this.playerCard.id);
      } else if (path === 'players') {
        this.deleteMaleCard(this.playerCard.id);
      }
      this.goBack();
    } else {
      console.warn('playerCard está indefinido durante el intento de eliminación');
    }
  }

  private deleteFemaleCard(id: number) {
    this.cardFemaleService.deleteCardFemale(id).subscribe({
      next: () => console.log('Tarjeta femenina eliminada con éxito'),
      error: (err) => console.error('Error eliminando tarjeta femenina:', err)
    });
  }

  private deleteMaleCard(id: number) {
    this.cardMaleService.deleteCardMale(id).subscribe({
      next: () => console.log('Tarjeta masculina eliminada con éxito'),
      error: (err) => console.error('Error eliminando tarjeta masculina:', err)
    });
  }

  onEdit() {
    if (this.playerCard) {
      this.editPlayer.emit(this.playerCard);
    } else {
      console.warn('playerCard está indefinido durante el intento de edición');
    }
  }

  goBack() {
    this.location.back();
  }
}
