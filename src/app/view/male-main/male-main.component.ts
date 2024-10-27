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
  itemsPerPage: number = 10;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.cardMaleService.getCardMale(page, this.itemsPerPage).subscribe({
        next: res => {
          console.log('Respuesta del servicio:', res);

          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.filteredPlayerCardModel = res; // Inicializa la lista filtrada
            this.totalItems = 161583; // Total de jugadores
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

  onSearchTermChange(term: string): void {
    this.currentSearchTerm = term; // Actualiza el término de búsqueda actual
  
    if (this.playerCardModel.length > 0) {
      // Filtrar jugadores según el término de búsqueda
      const filteredPlayers = this.playerCardModel.filter(player => {
        const searchTerm = term.toLowerCase(); // Convertir término de búsqueda a minúsculas
  
        return (
          player.long_name.toLowerCase().includes(searchTerm) || 
          (player.club_name && player.club_name.toLowerCase().includes(searchTerm)) ||
          (player.nationality_name && player.nationality_name.toLowerCase().includes(searchTerm)) ||
          (player.player_positions && player.player_positions.toLowerCase().includes(searchTerm)) ||
          (player.age.toString().includes(searchTerm)) || // Buscar por edad
          (player.overall.toString().includes(searchTerm)) || // Buscar por overall
          (player.potential.toString().includes(searchTerm)) || // Buscar por potencial
          (player.value_eur && player.value_eur.toString().includes(searchTerm)) || // Buscar por valor
          (player.wage_eur && player.wage_eur.toString().includes(searchTerm)) || // Buscar por salario
          (player.preferred_foot && player.preferred_foot.toLowerCase().includes(searchTerm)) ||
          (player.height_cm && player.height_cm.toString().includes(searchTerm)) || // Buscar por altura
          (player.weight_kg && player.weight_kg.toString().includes(searchTerm)) || // Buscar por peso
          (player.weak_foot && player.weak_foot.toString().includes(searchTerm)) || // Buscar por weak foot
          (player.skill_moves && player.skill_moves.toString().includes(searchTerm)) || // Buscar por skill moves
          (player.international_reputation && player.international_reputation.toString().includes(searchTerm)) || // Buscar por reputación internacional
          (player.work_rate && player.work_rate.toLowerCase().includes(searchTerm)) || // Buscar por work rate
          (player.body_type && player.body_type.toLowerCase().includes(searchTerm)) || // Buscar por body type
          (player.pace && player.pace.toString().includes(searchTerm)) || // Buscar por pace
          (player.shooting && player.shooting.toString().includes(searchTerm)) || // Buscar por shooting
          (player.passing && player.passing.toString().includes(searchTerm)) || // Buscar por passing
          (player.dribbling && player.dribbling.toString().includes(searchTerm)) || // Buscar por dribbling
          (player.defending && player.defending.toString().includes(searchTerm)) || // Buscar por defending
          (player.physic && player.physic.toString().includes(searchTerm)) // Buscar por physic
        );
      });
  
      // Aplicar paginación
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
  
      this.filteredPlayerCardModel = filteredPlayers.slice(startIndex, endIndex);
    }
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/homeMale/page', this.currentPage]);
      this.onSearchTermChange(this.currentSearchTerm);

      //this.loadPlayers(this.currentPage);
      
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
}
