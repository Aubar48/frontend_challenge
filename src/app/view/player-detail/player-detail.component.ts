import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCardModel } from '../../models/player-card.model';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule } from '@angular/common';
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
    private router: Router,
    private route: ActivatedRoute,
    private cardFemaleService: CardFemaleService,
    private cardMaleService: CardMaleService
  ) {}

  ngOnInit() {
    // Obtener el tipo de jugador (femenino o masculino) de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url[0]?.path; // Aquí obtenemos la ruta actual

    if (id) {
      const idNumber = Number(id); // Convertir el ID a número

      // Verificar el path para determinar si es femenino o masculino
      if (path === 'female') {
        this.cardFemaleService.getCardFemaleById(idNumber).subscribe(female => {
          this.playerCard = female; // Asignar el jugador femenino a la variable
        });
      } else if (path === 'players') {
        this.cardMaleService.getCardMaleById(idNumber).subscribe(player => {
          this.playerCard = player; // Asignar el jugador masculino a la variable
        });
      }
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
