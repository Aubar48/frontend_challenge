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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, PlayerCardComponent, PlayerSearchComponent],
  templateUrl: './male-main.component.html',
  styleUrls: ['./male-main.component.scss']
})
export class MaleMainComponent implements OnInit, OnDestroy {
  private currentSearchTerm: string = ''; 

  playerCardModel: PlayerCardModel[] = []; 
  filteredPlayerCardModel: PlayerCardModel[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 100; 
  totalItems: number = 0;
  totalPages: number = 0;
  limit: number = 4000;
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
      this.route.paramMap.subscribe(params => {
        const page = params.get('page');
        this.currentPage = page ? parseInt(page, 10) : 1;
        this.loadPlayers(this.currentPage);
      })
    );

    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.currentSearchTerm = params['search'] || '';
        
        // Llama a `onSearchTermChange` solo si hay un término de búsqueda
        if (this.currentSearchTerm) {
          this.onSearchTermChange(this.currentSearchTerm);
        } else {
          // Si no hay término de búsqueda, navega sin `search` en la URL
          this.router.navigate(['/homeMale/page', this.currentPage]);
        }
      })
    );
}

  loadPlayers(page: number): void {
    this.subscription.add(
      this.cardMaleService.getCardMale(page, this.limit).subscribe({
        next: res => {
          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.filteredPlayerCardModel = res;
            this.totalItems = 161570; 
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.updateFilteredPlayerCards(); 

            this.router.navigate(['/homeMale/page', this.currentPage], {
              queryParams: { search: this.currentSearchTerm },
              queryParamsHandling: 'merge' 
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
  
    this.updateFilteredPlayerCards();
  
    this.router.navigate([], {
      queryParams: { 
        search: this.currentSearchTerm
      },
      queryParamsHandling: 'merge'
    });
  }

  updateFilteredPlayerCards(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredPlayerCardModel = this.filteredPlayerCardModel.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPlayers(this.currentPage);
      this.onSearchTermChange(this.currentSearchTerm); 
    }
  }

  verMas(playerId: number): void {
    Swal.fire({
      icon: 'success',
      title: 'VER MÁS',
      text: `Vamos a ver los detalles del jugador con ID: ${playerId}`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).then(() => {
      this.router.navigate(['/players', playerId]);
    });
  }

  goToCreatePlayer() {
    Swal.fire({
      title: 'Vamoo a crear un nuevo jugador',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).then(() => {
        this.router.navigate(['/players/create']);
    });
  }

  borrar(playerId: number): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar este jugador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardMaleService.deleteCardMale(playerId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Jugador borrado',
              text: `El jugador con ID: ${playerId} ha sido eliminado.`,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true
            });
            this.loadPlayers(this.currentPage);
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al intentar borrar el jugador.',
            });
            console.warn('Error al borrar el jugador:', error);
          }
        });
      }
    });
  }

  editar(player: PlayerCardModel): void {

    Swal.fire({
      title: `Vamoo a editar al jugador con ID: ${player.id}`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).then(() => {
      this.router.navigate(['/players/edit', player.id]);
    });
    
  }

   onDownloadCSV(): void {
    Swal.fire({
      title: '¿Quieres descargar el CSV de los jugadores?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, descargar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardMaleService.downloadCSV();
      }
    });
  }

  onconvertCsvToExcel(): void {
    Swal.fire({
      title: '¿Quieres descargar el LXSX de los jugadores?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, descargar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardMaleService.convertCsvToExcel();
      }
    });
  }
  
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Aquí llamas al servicio para importar el archivo CSV
      this.cardMaleService.importDataFromCSV(file).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Archivo importado exitosamente',
            text: response.message, // Suponiendo que la respuesta tiene un mensaje
            timer: 2000,
            showConfirmButton: false
          });
          this.loadPlayers(this.currentPage); // Volver a cargar los jugadores
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al importar',
            text: 'No se pudo importar el archivo. Inténtalo de nuevo más tarde.'
          });
          console.error('Error importando CSV:', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
