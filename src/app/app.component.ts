import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { MainComponent } from './core/main/main.component';
import { ThemeService } from './services/dark-mode/dark-mode.service'; // Importa el servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeService: ThemeService // Inyecta el servicio
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Cambiar el título de la página si es "Home"
      this.changeTitleIfHome();
      // Inicializar el tema
      this.themeService.initModo();
    }
  }

  changeTitleIfHome() {
    if (isPlatformBrowser(this.platformId)) {
      if (document.title === 'Home') {
        let alertShow = false;
        setInterval(() => {
          document.title = alertShow ? 'Home' : 'xAcademy';
          alertShow = !alertShow;
        }, 1000);
      }
    }
  }
}
