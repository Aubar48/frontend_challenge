import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private route: ActivatedRoute, private cardFemaleService: CardFemaleService) {}

  ngOnInit() {
    const femaleId = this.route.snapshot.paramMap.get('id');
    if (femaleId) {
      // Convertir femaleId a number
      const idNumber = Number(femaleId);
      this.cardFemaleService.getCardFemaleById(idNumber).subscribe(player => {
        this.playerCard = player; // Asignar el jugador a la variable
      });
    }
  }

  onDelete() {
    if (this.playerCard) {
      this.deletePlayer.emit(this.playerCard.id);
    } else {
      console.warn('playerCard is undefined during delete');
    }
  }

  onEdit() {
    this.editPlayer.emit(this.playerCard);
  }

  goBack() {
    this.router.navigate(['..']); // Vuelve a la página anterior
  }
}
