import { Component, OnDestroy, OnInit } from '@angular/core'; // Importa los decoradores y la interfaz necesarios desde Angular.
import { PlayerCardComponent } from '../../core/player-card/player-card.component';
import { PaginationComponent } from '../../core/pagination/pagination.component';
import { CardMaleService } from '../../services/card-male/card-male.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCardModel } from '../../models/player-card.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * Componente principal de la aplicación.
 * Este componente se encarga de inicializar el modo de tema al iniciar.
 */
@Component({
  selector: 'app-main', // Selector para usar este componente en plantillas.
  standalone: true, // Indica que este componente es autónomo y no requiere un módulo Angular específico.
  imports: [CommonModule, PaginationComponent, PlayerCardComponent], // Declara los componentes que se utilizarán en este componente.
  templateUrl: './male-main.component.html', // Ruta del archivo de plantilla HTML del componente.
  styleUrls: ['./male-main.component.scss'] // Ruta del archivo de estilos SCSS del componente.
})
export class MaleMainComponent implements OnInit, OnDestroy {
  
  // Lista de jugadores
  playerCardModel?: PlayerCardModel[];

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 10; // Puedes ajustar el número de elementos por página
  totalItems: number = 0; // Total de elementos que se actualizará al obtener la respuesta
  totalPages: number = 0;

  // Para suscribirse y desuscribirse de observables
  subscription = new Subscription();

  /**
   * Constructor del componente MainComponent.
   * @param cardMaleService - Servicio para obtener datos de las tarjetas de jugadores.
   * @param route - Servicio para trabajar con rutas activas.
   * @param router - Servicio para trabajar con la navegación y las rutas.
   */
  constructor(
    private cardMaleService: CardMaleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Inicializa el modo de tema mediante el servicio de tema.
   */
  ngOnInit(): void {
    this.subscribeToRouteParams(); // Escuchar cambios en los parámetros de la URL
  }

  /**
   * Método del ciclo de vida de Angular que se llama al destruir el componente.
   * Desuscribe las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  /**
   * Método para cargar jugadores en función de la página.
   * @param page - Página actual de jugadores que se va a cargar.
   */
  loadPlayers(page: number): void {
    this.subscription.add(
      this.cardMaleService.getCardMale(page, this.itemsPerPage).subscribe({
        next: res => {
          console.log('Respuesta del servicio:', res);

          // Verifica si la respuesta es un array
          if (Array.isArray(res)) {
            this.playerCardModel = res;
            this.totalItems = 100; // Coloca el número total de jugadores. Actualiza según el backend.
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

  /**
   * Método para cambiar de página y actualizar la URL.
   * @param page - Número de la página a la que se desea cambiar.
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/homeMale/page', this.currentPage]);
      this.loadPlayers(this.currentPage);
    }
  }
}
