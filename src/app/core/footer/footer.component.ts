import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/dark-mode/dark-mode.service';  // Asegúrate de que la ruta es correcta

/**
 * Componente de pie de página (footer) de la aplicación.
 * Este componente se encarga de actualizar la fecha y hora en el pie de página
 * y aplicar el tema (modo claro u oscuro) al iniciar.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /**
   * Constructor del componente FooterComponent.
   * @param themeService - Servicio para gestionar el tema de la aplicación.
   */
  constructor(private themeService: ThemeService) {}

  /**
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Realiza las siguientes acciones:
   * - Actualiza la fecha y hora en el pie de página.
   * - Aplica el tema actual al iniciar.
   */
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.updateDateTime();
      this.applyTheme(); // Aplica el tema al iniciar
    }
  }

  /**
   * Función para actualizar la fecha y hora en el pie de página.
   * Obtiene la fecha y hora actuales, las formatea y las muestra en un elemento con ID 'datetime'.
   * Luego, programa la próxima actualización de la fecha y hora usando requestAnimationFrame.
   */
  updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    if (datetimeElement) {
      datetimeElement.textContent = `${date} ${time}`;
    }

    // Programar la próxima actualización
    requestAnimationFrame(() => this.updateDateTime());
  }

  /**
   * Función para aplicar el tema (modo claro u oscuro).
   * Usa el método initModo() del servicio ThemeService para inicializar el modo de tema.
   */
  applyTheme() {
    this.themeService.initModo(); // Usa el método del servicio para inicializar el modo
  }
}
