import { Routes } from '@angular/router';
import { NotFoundComponent } from './view/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homeMale', pathMatch: 'full' },
  
  { path: 'homeMale', loadComponent: () => import('./view/male-main/male-main.component').then(m => m.MaleMainComponent) },
  { path: 'homeMale/page/:page', loadComponent: () => import('./view/male-main/male-main.component').then(m => m.MaleMainComponent) },
  
  { path: 'homeFemale', loadComponent: () => import('./view/female-main/female-main.component').then(m => m.FemaleMainComponent) },
  { path: 'homeFemale/page/:page', loadComponent: () => import('./view/female-main/female-main.component').then(m => m.FemaleMainComponent) },
  
  { path: 'login', loadComponent: () => import('./view/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./view/register/register.component').then(m => m.RegisterComponent) },
  { path: 'contact', loadComponent: () => import('./view/contact/contact.component').then(m => m.ContactComponent) },
  
  { path: 'players/:id', loadComponent: () => import('./view/player-detail/player-detail.component').then(m => m.PlayerDetailComponent) },
  { path: 'female/:id', loadComponent: () => import('./view/player-detail/player-detail.component').then(m => m.PlayerDetailComponent) },
  
  { path: 'players/edit/:id', loadComponent: () => import('./view/edit-player/edit-player.component').then(m => m.EditPlayerComponent) },
  { path: 'female/edit/:id', loadComponent: () => import('./view/edit-player/edit-player.component').then(m => m.EditPlayerComponent) },
  
  { path: 'players/create', loadComponent: () => import('./view/create-player/create-player.component').then(m => m.CreatePlayerComponent) },
  { path: 'female/create', loadComponent: () => import('./view/create-player/create-player.component').then(m => m.CreatePlayerComponent) },
  
  { path: '**', component: NotFoundComponent }
];
