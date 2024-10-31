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
  http: any;

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
      this.route.paramMap.subscribe(params => {
        const page = params.get('page');
        this.currentPage = page ? parseInt(page, 10) : 1;
        this.loadPlayers(this.currentPage);
      })
    );

    // Captura los parámetros de consulta
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.currentSearchTerm = params['search'] || ''; // Captura el término de búsqueda
        this.onSearchTermChange(this.currentSearchTerm); // Filtra los jugadores
      })
    );
  }

  loadPlayers(page: number): void {
    this.subscription.add(
      this.cardMaleService.getCardMale(1, 1000).subscribe({
        next: res => {
          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.filteredPlayerCardModel = res;
            this.totalItems = 161570; // Total de jugadoras
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.updateFilteredPlayerCards(); // Actualiza la lista filtrada después de cargar los jugadores

            // Actualiza la URL con la página actual (sin parámetros de consulta)
            this.router.navigate(['/homeMale/page', this.currentPage], {
              queryParams: { search: this.currentSearchTerm }, // Solo mantiene el término de búsqueda
              queryParamsHandling: 'merge' // Mantiene otros parámetros de consulta
            });
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
  
    // Navegar a la misma ruta con el parámetro de búsqueda
    this.router.navigate([], {
      queryParams: { 
        search: this.currentSearchTerm // Solo agrega el parámetro de búsqueda
      },
      queryParamsHandling: 'merge' // Mantiene otros parámetros de consulta
    });
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
      this.loadPlayers(this.currentPage); // Carga los jugadores de la nueva página
      this.onSearchTermChange(this.currentSearchTerm); // Actualiza el término de búsqueda
    }
  }

  verMas(playerId: number): void {
    this.router.navigate(['/players', playerId]);
  }

  goToCreatePlayer() {
    this.router.navigate(['/players/create']); // Ajusta la ruta según tu configuración
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
    this.router.navigate(['/players/edit', player.id]);
  }

  // Método para invocar la descarga de CSV
  onDownloadCSV(): void {
    this.cardMaleService.downloadCSV();
  }
  onconvertCsvToExcel(): void {
    this.cardMaleService.convertCsvToExcel();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
