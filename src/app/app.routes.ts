import { Routes } from '@angular/router'; // Importa la interfaz Routes desde el módulo de enrutamiento de Angular.
import { NotFoundComponent } from './view/not-found/not-found.component'; // Importa el componente de página no encontrada.

export const routes: Routes = [ // Rutas de la aplicación.
  
  // Redirige la ruta raíz a 'homeMale' si no se proporciona otra ruta.
  { path: '', redirectTo: 'homeMale', pathMatch: 'full' },

  // Define rutas usando la carga de componentes (loadComponent).
  // Agrega parámetros opcionales para la paginación, como `page`.
  {
    path: 'homeMale',
    loadComponent: () => import('./view/male-main/male-main.component').then(m => m.MaleMainComponent),
  },
  {
    path: 'homeMale/page/:page', // Ruta que permite navegación con un parámetro de página.
    loadComponent: () => import('./view/male-main/male-main.component').then(m => m.MaleMainComponent),
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
   // Nueva ruta para ver más detalles del jugador femenino
   {
    path: 'female/:id',  // Ruta para ver más detalles del jugador
    loadComponent: () => import('./view/player-detail/player-detail.component').then(m => m.PlayerDetailComponent), // Reemplaza 'path-to-your' con la ruta correcta
  },
  {
    path: 'players/:id',  // Ruta para ver más detalles del jugador
    loadComponent: () => import('./view/player-detail/player-detail.component').then(m => m.PlayerDetailComponent), // Reemplaza 'path-to-your' con la ruta correcta
  },
  // Nueva ruta para editar detalles del jugador femenino
  {
    path: 'female/edit/:id',  // Ruta para ver más detalles del jugador
    loadComponent: () => import('./view/edit-player/edit-player.component').then(m => m.EditPlayerComponent), // Reemplaza 'path-to-your' con la ruta correcta
  },
  {
    path: 'players/edit/:id',  // Ruta para ver más detalles del jugador
    loadComponent: () => import('./view/edit-player/edit-player.component').then(m => m.EditPlayerComponent), // Reemplaza 'path-to-your' con la ruta correcta
  },
  
  // Nueva ruta para crear un jugador
  {
    path: 'create-player',
    loadComponent: () => import('./core/player-create/player-create.component').then(m => m.PlayerCreateComponent), // Asegúrate de que la ruta sea correcta
  },

  // Ruta comodín que carga el NotFoundComponent si no hay coincidencias.
  { path: '**', component: NotFoundComponent },
];
