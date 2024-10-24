import { Component, OnInit } from '@angular/core'; // Importa los decoradores y la interfaz necesarios desde Angular.
import { ThemeService } from '../../services/dark-mode/dark-mode.service';
import { CardMaleComponent } from "./card-male/card-male.component"; // Importa el servicio para gestionar el tema de la aplicación.

/**
 * Componente principal de la aplicación.
 * Este componente se encarga de inicializar el modo de tema al iniciar.
 */
@Component({
  selector: 'app-main', // Selector para usar este componente en plantillas.
  standalone: true, // Indica que este componente es autónomo y no requiere un módulo Angular específico.
  imports: [CardMaleComponent], // Declara los componentes que se utilizarán en este componente.
  templateUrl: './main.component.html', // Ruta del archivo de plantilla HTML del componente.
  styleUrls: ['./main.component.scss'] // Ruta del archivo de estilos SCSS del componente.
})
export class MainComponent implements OnInit {

  /**
   * Constructor del componente MainComponent.
   * @param themeService - Servicio para gestionar el tema de la aplicación.
   */
  constructor(private themeService: ThemeService) {}

  /**
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Inicializa el modo de tema mediante el servicio de tema.
   */
  ngOnInit(): void {
    this.initializeTheme(); // Llama a un método separado para inicializar el tema.
  }

  /**
   * Método para inicializar el modo de tema.
   * Se encarga de llamar al servicio de tema para establecer el modo adecuado.
   */
  private initializeTheme(): void {
    this.themeService.initModo(); // Llama al método para inicializar el modo de tema.
  }
}
