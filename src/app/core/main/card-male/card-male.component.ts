import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardMale } from '../../../models/card-male.model';
import { Subscription } from 'rxjs';
import { CardMaleService } from '../../../services/card-male/card-male.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-male',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-male.component.html',
  styleUrls: ['./card-male.component.scss']
})
export class CardMaleComponent implements OnInit, OnDestroy {
  cardMale?: CardMale[]; // Lista de jugadores
  subscription = new Subscription();

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 10; // Puedes ajustar el número de elementos por página
  totalItems: number = 0; // Total de elementos que se actualizará al obtener la respuesta
  totalPages: number = 0;

  constructor(
    private cardMaleService: CardMaleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Escuchar cambios en los parámetros de la URL
    this.subscription.add(
      this.route.params.subscribe(params => {
        const page = params['page'] ? parseInt(params['page'], 10) : 1;
        this.currentPage = isNaN(page) ? 1 : page; // Asegurarse de que la página sea válida
        this.loadPlayers(this.currentPage);
      })
    );
  }

  // Método para cargar jugadores en función de la página
  loadPlayers(page: number) {
    this.subscription.add(this.cardMaleService.getCardMale(page, this.itemsPerPage).subscribe({
      next: res => {
        console.log('Respuesta del servicio:', res);

        // Verifica si la respuesta es un array
        if (Array.isArray(res)) {
          this.cardMale = res;
          // Aquí actualiza el total de ítems si tu API proporciona esa información.
          // Por ejemplo: this.totalItems = res.totalItems; // Actualiza según tu backend.
          this.totalItems = 100; // Coloca el número total de jugadores. Actualiza según el backend.
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        } else {
          console.warn('La respuesta no es un array:', res);
        }
      },
      error: error => {
        console.warn('Error al obtener las tarjetas:', error);
      }
    }));
  }

  // Cambiar de página y actualizar la URL
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/homeMale/page', this.currentPage]); // Actualiza la URL
      this.loadPlayers(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    // Desuscripción para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
}
