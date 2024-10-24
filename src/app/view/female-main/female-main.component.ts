import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CardFemale } from '../../models/card-female.model';

@Component({
  selector: 'app-female-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './female-main.component.html',
  styleUrls: ['./female-main.component.scss']
})
export class FemaleMainComponent implements OnInit, OnDestroy {
  cardFemale?: CardFemale[]; // Inicializa como un array vacío
  subscription = new Subscription();

  constructor(private cardFemaleService: CardFemaleService) {}

  ngOnInit() {
    // Suscripción al servicio para obtener las tarjetas de jugadores masculinos
    this.subscription.add(this.cardFemaleService.getCardFemale().subscribe({
      next: res => {
        console.log('Respuesta del servicio:', res);

        // Verifica si la respuesta es un array
        if (Array.isArray(res)) {
          this.cardFemale = res; // Asigna directamente el array a cardMale
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
