import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Servicio para gestionar el tema de la aplicación (modo claro u oscuro).
 * Este servicio maneja la inicialización del tema según el valor almacenado en el almacenamiento local
 * y proporciona métodos para cambiar el modo de tema.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private body: HTMLElement | null = null;  // Referencia al elemento <body>
  private isBrowser: boolean;  // Flag para verificar si se está en el entorno del navegador

  /**
   * Constructor del servicio ThemeService.
   * @param platformId - Identificador del entorno (navegador o servidor).
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Verifica si está en el navegador
    if (this.isBrowser) {
      this.initModo(); // Inicializa el modo al crear el servicio si está en el navegador
    }
  }

  /**
   * Establece la referencia al elemento <body> en el navegador.
   * Solo se ejecuta si está en el entorno del navegador.
   */
  private setBody() {
    if (this.isBrowser) {
      this.body = document.querySelector('body');
    }
  }

  /**
   * Inicializa el modo de tema (claro u oscuro) según el valor almacenado en localStorage.
   * Agrega o elimina la clase 'noche' al elemento <body> según el valor de 'modo'.
   */
  initModo() {
    if (!this.isBrowser) return; // No hacer nada si no está en el navegador

    this.setBody(); // Inicializa el `body` en el navegador
    const modoActual = localStorage.getItem('modo'); // Obtiene el modo actual de localStorage

    if (modoActual === 'noche' && this.body) {
      this.body.classList.add('noche'); // Agrega la clase 'noche' si el modo es 'noche'
    } else if (this.body) {
      this.body.classList.remove('noche'); // Elimina la clase 'noche' si el modo es 'día'
    }
  }

  /**
   * Cambia el modo de tema entre claro y oscuro.
   * Alterna la clase 'noche' en el elemento <body> y actualiza el valor en localStorage.
   */
  cambiarModo() {
    if (!this.isBrowser) return; // No hacer nada si no está en el navegador

    this.setBody(); // Inicializa el `body` en el navegador
    const modoActual = localStorage.getItem('modo'); // Obtiene el modo actual de localStorage

    if (modoActual === 'dia' && this.body) {
      this.body.classList.add('noche'); // Agrega la clase 'noche' si el modo actual es 'día'
      localStorage.setItem('modo', 'noche'); // Actualiza el valor en localStorage a 'noche'
    } else if (this.body) {
      this.body.classList.remove('noche'); // Elimina la clase 'noche' si el modo actual es 'noche'
      localStorage.setItem('modo', 'dia'); // Actualiza el valor en localStorage a 'día'
    }
  }

  /**
   * Obtiene el modo de tema actual desde localStorage.
   * @returns El valor del modo actual ('noche', 'día') o null si no está en el navegador.
   */
  getModoActual(): string | null {
    if (!this.isBrowser) return null; // No hacer nada si no está en el navegador
    return localStorage.getItem('modo'); // Retorna el valor del modo actual desde localStorage
  }
}
