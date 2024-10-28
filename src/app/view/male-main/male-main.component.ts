import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { PlayerCardComponent } from '../../core/player-card/player-card.component';
import { PaginationComponent } from '../../core/pagination/pagination.component';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCardModel } from '../../models/player-card.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlayerSearchComponent } from "../../core/player-search/player-search.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, PlayerCardComponent, PlayerSearchComponent],
  templateUrl: './male-main.component.html',
  styleUrls: ['./male-main.component.scss']
})
export class MaleMainComponent implements OnInit, OnDestroy {
  private currentSearchTerm: string = ''; // Define currentSearchTerm aquí

  playerCardModel: PlayerCardModel[] = []; // Cambiado a un array vacío por defecto
  filteredPlayerCardModel: PlayerCardModel[] = []; // Inicializa la lista filtrada

  currentPage: number = 1;
  itemsPerPage: number = 100; // Cambia esto a 100 para mostrar 100 tarjetas
  totalItems: number = 0;
  totalPages: number = 0;

  subscription = new Subscription();

  constructor(
    private cardMaleService: CardMaleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      this.cardMaleService.getCardMale(1, 1000).subscribe({
        next: res => {
          console.log('Respuesta del servicio:', res);
          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.filteredPlayerCardModel = res;
            this.totalItems = 161570; // Total de jugadoras
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
      this.router.navigate(['/homeMale/page', this.currentPage]);
      this.onSearchTermChange(this.currentSearchTerm);
    }
  }

  verMas(playerId: number): void {
    this.router.navigate(['/players', playerId]);
  }

  borrar(playerId: number): void {
    this.cardMaleService.deleteCardMale(playerId).subscribe({
      next: () => {
        console.log(`Borrando jugador con ID: ${playerId}`);
        this.loadPlayers(this.currentPage);
      },
      error: error => {
        console.warn('Error al borrar el jugador:', error);
      }
    });
  }

  editar(player: PlayerCardModel): void {
    this.router.navigate(['/edit-player', player.id]);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
