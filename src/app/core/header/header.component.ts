import { AfterViewInit, Component, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/dark-mode/dark-mode.service';
import { MenuElementoComponent } from "../header/menu-elemento/menu-elemento.component";
import { BurgerMenuElementoComponent } from './burger-menu-elemento/burger-menu-elemento.component';
import { MenuItem } from '../../models/menu-item.model';

/**
 * Componente HeaderComponent
 * 
 * Este componente maneja la visualización del encabezado, incluyendo el menú hamburguesa y el tema de la aplicación.
 * Implementa la interfaz `AfterViewInit` para realizar inicializaciones después de que la vista se haya cargado completamente
 * y `OnDestroy` para limpiar los recursos al destruir el componente.
 */
@Component({
  selector: 'app-header', // Selector para usar este componente en plantillas HTML
  standalone: true, // Marca el componente como independiente para la carga
  templateUrl: './header.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./header.component.scss'] // Ruta al archivo de estilos SCSS del componente
  ,
  imports: [MenuElementoComponent,BurgerMenuElementoComponent]
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private platformId: Object; // Identificador de la plataforma actual
  private resizeListener: () => void; // Función para manejar el evento de redimensionamiento

  /**
   * Constructor del componente HeaderComponent
   * 
   * @param platformId - Identificador de la plataforma (navegador o servidor)
   * @param themeService - Servicio para manejar la lógica del tema (modo claro/oscuro)
   */
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private themeService: ThemeService
  ) {
    this.platformId = platformId;
    // Vincular la función de redimensionamiento al contexto del componente
    this.resizeListener = this.onResize.bind(this);
  }

  /**
   * Método del ciclo de vida AfterViewInit
   * 
   * Se ejecuta después de que la vista se haya inicializado completamente. Aquí se configura el tema y se añade el listener
   * para el evento de redimensionamiento de la ventana.
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initModo(); // Inicializa el modo del tema
      // Añadir listener para el evento de redimensionamiento
      window.addEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Método del ciclo de vida OnDestroy
   * 
   * Se ejecuta cuando el componente se destruye. Aquí se elimina el listener para evitar posibles fugas de memoria.
   */
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Eliminar el listener para el evento de redimensionamiento
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Inicializa el modo del tema (día/noche) en base a la configuración guardada en localStorage.
   * También configura el estado de los interruptores del tema en función del modo actual.
   */
  initModo() {
    this.themeService.initModo();
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    switches.forEach(switchElement => {
      if (switchElement instanceof HTMLInputElement) {
        // Configura el estado del interruptor según el modo actual
        switchElement.checked = this.themeService.getModoActual() === 'noche';
        // Añade un listener para el evento de cambio en el interruptor
        switchElement.addEventListener('change', () => this.cambiarModo());
      }
    });
  }

  /**
   * Cambia el modo del tema (día/noche) y actualiza el estado de los interruptores.
   */
  cambiarModo() {
    this.themeService.cambiarModo();
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchElement => {
      if (switchElement instanceof HTMLInputElement) {
        // Actualiza el estado del interruptor según el nuevo modo
        switchElement.checked = this.themeService.getModoActual() === 'noche';
      }
    });
  }

  /**
   * Alterna la visibilidad del menú hamburguesa en la vista móvil.
   * 
   * El menú se muestra si está oculto y se oculta si está mostrado.
   */
  toggleMenu() {
    if (isPlatformBrowser(this.platformId)) {
      const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
      if (mobileMenu) {
        // Alterna la visibilidad del menú móvil
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
      }
    }
  }

  /**
   * Maneja el evento de redimensionamiento de la ventana.
   * 
   * Oculta el menú hamburguesa si la ventana se redimensiona a un tamaño mayor o igual a 600 píxeles.
   */
  private onResize() {
    if (isPlatformBrowser(this.platformId)) {
      const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
      if (window.innerWidth >= 600 && mobileMenu) {
        // Oculta el menú hamburguesa al volver al modo desktop
        mobileMenu.style.display = 'none';
      }
    }
  }
/**Elementos del menu para desktop */
  menuItems: MenuItem[] = [
   {text:'Male Fifa', route:'/homeMale'},
   {text:'Female Fifa', route: '/homeFemale'},
   {text:'Login', route:'/login'},
   {text:'Register', route:'/register'},
   {text:'Contact', route:'/contact'}
  ]
}
