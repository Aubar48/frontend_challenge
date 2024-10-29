import { AfterViewInit, Component, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/dark-mode/dark-mode.service';
import { MenuElementoComponent } from "../header/menu-elemento/menu-elemento.component";
import { BurgerMenuElementoComponent } from './burger-menu-elemento/burger-menu-elemento.component';
import { MenuItem } from '../../models/menu-item.model';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MenuElementoComponent, BurgerMenuElementoComponent]
})

export class HeaderComponent implements AfterViewInit, OnDestroy {
  private platformId: Object;
  private resizeListener: () => void;
  
  isAuthenticated: boolean = false; // Estado de autenticación

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private themeService: ThemeService,
    private loginService: LoginService,
    private router: Router, // Inyecta el Router
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef


  ) {
    this.platformId = platformId;
    this.resizeListener = this.onResize.bind(this);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initModo();
      window.addEventListener('resize', this.resizeListener);
      this.checkAuthentication(); // Verificar autenticación al cargar el componente
      this.updateMenuItems();

    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  initModo() {
    this.themeService.initModo();
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    switches.forEach(switchElement => {
      if (switchElement instanceof HTMLInputElement) {
        switchElement.checked = this.themeService.getModoActual() === 'noche';
        switchElement.addEventListener('change', () => this.cambiarModo());
      }
    });
  }

  cambiarModo() {
    this.themeService.cambiarModo();
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchElement => {
      if (switchElement instanceof HTMLInputElement) {
        switchElement.checked = this.themeService.getModoActual() === 'noche';
      }
    });
  }

  toggleMenu() {
    if (isPlatformBrowser(this.platformId)) {
      const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
      if (mobileMenu) {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
      }
    }
  }

  private onResize() {
    if (isPlatformBrowser(this.platformId)) {
      const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
      if (window.innerWidth >= 600 && mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    }
  }

  menuItems: MenuItem[] = []; // Inicializamos el arreglo vacío

  updateMenuItems() {
    if (this.isAuthenticated) {
      this.menuItems = [
        { text: 'Male Fifa', route: '/homeMale' },
        { text: 'Female Fifa', route: '/homeFemale' },
        { text: 'Contact', route: '/contact' },
        { text: 'Create', route: '/create-player' },
        { text: 'Logout', route:'/login', event: () => this.logout() }
      ];
    } else {
      this.menuItems = [
        { text: 'Male Fifa', route: '/homeMale' },
        { text: 'Female Fifa', route: '/homeFemale' },
        { text: 'Login', route: '/login' },
        { text: 'Register', route: '/register' },
        { text: 'Contact', route: '/contact' }
      ];
    }
    this.cdr.detectChanges(); // Forzar detección de cambios

  }
  
  checkAuthentication() {
    this.isAuthenticated = this.loginService.isAuthenticated();
    this.updateMenuItems();
    this.router.navigate(['/homeMale']); // Redirige a la página de inicio de sesión
    // Actualiza el menú según el estado de autenticación
  }

  logout() {
    this.loginService.logout(); // Cerrar sesión y eliminar el token
    this.isAuthenticated = false; // Actualiza el estado de autenticación
    this.updateMenuItems(); // Actualiza el menú después de cerrar sesión
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión

  }
}
