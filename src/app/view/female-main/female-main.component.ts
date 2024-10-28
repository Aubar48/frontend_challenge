import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { Subscription } from 'rxjs';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../core/pagination/pagination.component';
import { PlayerCardComponent } from '../../core/player-card/player-card.component';
import { FormsModule } from '@angular/forms';
import { PlayerSearchComponent } from '../../core/player-search/player-search.component';

@Component({
  selector: 'app-female-main',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, PlayerCardComponent, PlayerSearchComponent],
  templateUrl: './female-main.component.html',
  styleUrls: ['./female-main.component.scss']
})
export class FemaleMainComponent implements OnInit, OnDestroy {
  playerCardModel: PlayerCardModel[] = [];
  filteredPlayerCardModel: PlayerCardModel[] = [];
  currentSearchTerm: string = '';
  subscription = new Subscription();

  currentPage: number = 1;
  itemsPerPage: number = 100; // Cambiar a 100 para mostrar más en la paginación
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private cardFemaleService: CardFemaleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        const page = params['page'] ? parseInt(params['page'], 10) : 1;
        this.currentPage = isNaN(page) ? 1 : page;
        this.loadPlayers(this.currentPage);
      })
    );
  }

  loadPlayers(page: number): void {
    this.subscription.add(
      this.cardFemaleService.getCardFemale(this.currentPage, 1000).subscribe({
        next: res => {
          console.log('Respuesta del servicio:', res);
          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.filteredPlayerCardModel = res;
            this.totalItems = 181347; // Total de jugadoras
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.updateFilteredPlayerCards(); // Actualiza la lista filtrada después de cargar los jugadores
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

  onSearchTermChange(term: string): void {
    this.currentSearchTerm = term;

    // Filtrar jugadores basados en el término de búsqueda
    if (term.trim() === '') {
      this.filteredPlayerCardModel = this.playerCardModel.slice();
    } else {
      const isOnlyNumbers = /^\d+$/.test(term.trim());
      if (!isOnlyNumbers) {
        const searchTerm = term.toLowerCase();
        this.filteredPlayerCardModel = this.playerCardModel.filter(player => {
          return (
            player.long_name.toLowerCase().includes(searchTerm) ||
            (player.club_name && player.club_name.toLowerCase().includes(searchTerm)) ||
            (player.nationality_name && player.nationality_name.toLowerCase().includes(searchTerm)) ||
            (player.player_positions && player.player_positions.toLowerCase().includes(searchTerm)) ||
            (player.preferred_foot && player.preferred_foot.toLowerCase().includes(searchTerm)) ||
            (player.body_type && player.body_type.toLowerCase().includes(searchTerm))
          );
        });
      } else {
        this.filteredPlayerCardModel = this.playerCardModel.slice();
      }
    }

    // Actualizar la paginación después de filtrar
    this.updateFilteredPlayerCards();
  }

  updateFilteredPlayerCards(): void {
    // Aplicar la paginación a los resultados filtrados
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredPlayerCardModel = this.filteredPlayerCardModel.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/homeFemale/page', this.currentPage]);
      this.updateFilteredPlayerCards(); // Actualiza los cards mostrados
    }
  }

  

  verMas(femaleId: number): void {
    this.router.navigate(['/female', femaleId]);
  }

  borrar(femaleId: number): void {
    this.cardFemaleService.deleteCardFemale(femaleId).subscribe({
      next: () => {
        console.log(`Borrando jugadora con ID: ${femaleId}`);
        this.loadPlayers(this.currentPage);
      },
      error: error => {
        console.warn('Error al borrar la jugadora:', error);
      }
    });
  }

  editar(female: PlayerCardModel): void {
    this.router.navigate(['/edit-female', female.id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
