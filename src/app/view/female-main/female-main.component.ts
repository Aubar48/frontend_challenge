import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerCardModel } from '../../models/player-card.model';
import { Subscription } from 'rxjs';
import { CardFemaleService } from '../../services/card-female/card-female.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  itemsPerPage: number = 100;
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
      this.route.paramMap.subscribe(params => {
        const page = params.get('page');
        this.currentPage = page ? parseInt(page, 10) : 1;
        this.loadPlayers(this.currentPage);
      })
    );

    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.currentSearchTerm = params['search'] || '';
        this.onSearchTermChange(this.currentSearchTerm);
      })
    );
  }

  loadPlayers(page: number): void {
    this.subscription.add(
      this.cardFemaleService.getCardFemale(page, 1000).subscribe({
        next: res => {
          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.filteredPlayerCardModel = res;
            this.totalItems = 181347;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.updateFilteredPlayerCards();

            this.router.navigate(['/homeFemale/page', this.currentPage], {
              queryParams: { search: this.currentSearchTerm },
              queryParamsHandling: 'merge'
            });
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
      queryParams: { search: this.currentSearchTerm },
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
    }
  }

  verMas(femaleId: number): void {

    Swal.fire({
      icon: 'success',
      title: 'VER MAS',
      text: `Vamoo a ver los detalles de la jugadora con ID: ${femaleId} `,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).then(() => {
      this.router.navigate(['/female', femaleId]);
    })
  }

  goToCreatePlayer() {
    Swal.fire({
      title: 'Vamoo a crear a una nueva jugadora',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).then(() => {
        this.router.navigate(['/female/create']);
    });
  }

  borrar(femaleId: number): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar esta jugadora?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardFemaleService.deleteCardFemale(femaleId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Jugadora Borrada',
              text: `La jugadora con ID: ${femaleId} ha sido borrada exitosamente.`,
              timer: 2000,
              showConfirmButton: false
            });
            this.loadPlayers(this.currentPage);
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error al Borrar',
              text: 'No se pudo borrar la jugadora. Inténtalo de nuevo más tarde.'
            });
          }
        });
      }
    });
  }

  editar(female: PlayerCardModel): void {
    Swal.fire({
      title: `Vamoo a editar a la jugadora con ID: ${female.id}`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).then(() => {
        this.router.navigate(['/female/edit', female.id]);
    });
  }

  onDownloadCSV(): void {
    Swal.fire({
      title: '¿Quieres descargar el CSV de las jugadoras?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, descargar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardFemaleService.downloadCSV();
      }
    });
  }

  onconvertCsvToExcel(): void {
    Swal.fire({
      title: '¿Quieres descargar el LXSX de las jugadoras?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, descargar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardFemaleService.convertCsvToExcel();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
