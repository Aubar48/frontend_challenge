import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { Subscription } from 'rxjs';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../core/pagination/pagination.component';
import { PlayerCardComponent } from '../../core/player-card/player-card.component';

@Component({
  selector: 'app-female-main',
  standalone: true,
  imports: [CommonModule, PaginationComponent, PlayerCardComponent],
  templateUrl: './female-main.component.html',
  styleUrls: ['./female-main.component.scss']
})
export class FemaleMainComponent implements OnInit, OnDestroy {
  playerCardModel?: PlayerCardModel[]; // Lista de jugadoras
  subscription = new Subscription();

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 10; // Número de elementos por página
  totalItems: number = 0; // Total de elementos
  totalPages: number = 0;

  constructor(
    private cardFemaleService: CardFemaleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeToRouteParams();
  }
/**
   * Método para suscribirse a los parámetros de la URL.
   * Actualiza la página actual y carga los jugadores.
   */
private subscribeToRouteParams(): void {
  this.subscription.add(
    this.route.params.subscribe(params => {
      const page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.currentPage = isNaN(page) ? 1 : page; // Asegurarse de que la página sea válida
      this.loadPlayers(this.currentPage);
    })
  );
}

  // Método para cargar jugadoras en función de la página
  loadPlayers(page: number) {
    this.subscription.add(
      this.cardFemaleService.getCardFemale(page, this.itemsPerPage).subscribe({
        next: res => {
          console.log('Respuesta del servicio:', res);

          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.totalItems = 181360; // Coloca el número total de jugadores. Actualiza según el backend.
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          } else {
            console.warn('La respuesta no es un array:', res);
          }
        },
        error: error => {
          console.warn('Error al obtener las tarjetas:', error);
        }
      })
    );
  }

  // Cambiar de página y actualizar la URL
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/homeFemale/page', this.currentPage]); // Actualiza la URL
      this.loadPlayers(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    // Desuscripción para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

  verMas(femaleId: number): void {
    this.router.navigate(['/female', femaleId]); // Navega a una vista de detalles directamente
  }

  // Método para borrar jugadora
  borrar(femaleId: number): void {
    this.cardFemaleService.deleteCardFemale(femaleId).subscribe({
      next: () => {
        console.log(`Borrando jugador con ID: ${femaleId}`);
        this.loadPlayers(this.currentPage); // Recargar jugadores tras la eliminación
      },
      error: error => {
        console.warn('Error al borrar el jugador:', error);
      }
    });
  }

  // Método para editar jugadora
  editar(female: PlayerCardModel): void {
    this.router.navigate(['/edit-female', female.id]); // Navega al formulario de edición
  }
}
