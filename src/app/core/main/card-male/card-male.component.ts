import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardMale } from '../../../models/card-male.model';
import { Subscription } from 'rxjs';
import { CardMaleService } from '../../../services/card-male/card-male.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-male',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-male.component.html',
  styleUrls: ['./card-male.component.scss']
})
export class CardMaleComponent implements OnInit, OnDestroy {
  cardMale?: CardMale[]; // Inicializa como un array vacío
  subscription = new Subscription();

  constructor(private cardMaleService: CardMaleService) {}

  ngOnInit() {
    // Suscripción al servicio para obtener las tarjetas de jugadores masculinos
    this.subscription.add(this.cardMaleService.getCardMale().subscribe({
      next: res => {
        console.log('Respuesta del servicio:', res);

        // Verifica si la respuesta es un array
        if (Array.isArray(res)) {
          this.cardMale = res; // Asigna directamente el array a cardMale
        } else {
          console.warn('La respuesta no es un array:', res);
        }
      },
      error: error => {
        console.warn('Error al obtener las tarjetas:', error);
      }
    }));
  }

  ngOnDestroy(): void {
    // Desuscripción para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
}
