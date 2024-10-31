import { AfterViewInit, Component, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/dark-mode/dark-mode.service';
import { MenuElementoComponent } from "../header/menu-elemento/menu-elemento.component";
import { BurgerMenuElementoComponent } from './burger-menu-elemento/burger-menu-elemento.component';
import { MenuItem } from '../../models/menu-item.model';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  private authSubscription: Subscription = new Subscription();
  
  isAuthenticated: boolean = false;
  menuItems: MenuItem[] = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private themeService: ThemeService,
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.platformId = platformId;
    this.resizeListener = this.onResize.bind(this);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initModo();
      window.addEventListener('resize', this.resizeListener);
      this.checkAuthentication();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeListener);
    }
    this.authSubscription.unsubscribe();
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

  updateMenuItems() {
    if (this.isAuthenticated) {
      this.menuItems = [
        { text: 'Male Fifa', route: '/homeMale' },
        { text: 'Female Fifa', route: '/homeFemale' },
        { text: 'Contact', route: '/contact' },
        { text: 'Logout', event: () => this.logout() }
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
    this.cdr.detectChanges();
  }

  checkAuthentication() {
    this.authSubscription = this.loginService.authenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.updateMenuItems();
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
