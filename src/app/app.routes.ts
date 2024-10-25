import { Routes } from '@angular/router'; // Importa la interfaz Routes desde el módulo de enrutamiento de Angular.
import { NotFoundComponent } from './view/not-found/not-found.component'; // Importa el componente de página no encontrada.

export const routes: Routes = [ // Rutas de la aplicación.
  
  // Redirige la ruta raíz a 'homeMale' si no se proporciona otra ruta.
  { path: '', redirectTo: 'homeMale', pathMatch: 'full' },

  // Define rutas usando la carga de componentes (loadComponent).
  // Agrega parámetros opcionales para la paginación, como `page`.
  {
    path: 'homeMale',
    loadComponent: () => import('./core/main/main.component').then(m => m.MainComponent),
  },
  {
    path: 'homeMale/page/:page', // Ruta que permite navegación con un parámetro de página.
    loadComponent: () => import('./core/main/main.component').then(m => m.MainComponent),
  },
  {
    path: 'homeFemale',
    loadComponent: () => import('./view/female-main/female-main.component').then(m => m.FemaleMainComponent),
  },
  { 
    path: 'homeFemale/page/:page', // Ruta que permite navegación con un parámetro de página.
    loadComponent: () => import('./view/female-main/female-main.component').then(m => m.FemaleMainComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./view/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./view/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./view/contact/contact.component').then(m => m.ContactComponent),
  },
  
  // Ruta comodín que carga el NotFoundComponent si no hay coincidencias.
  { path: '**', component: NotFoundComponent },
];
