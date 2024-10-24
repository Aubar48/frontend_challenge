import { Routes } from '@angular/router'; // Importa la interfaz Routes desde el módulo de enrutamiento de Angular.
import { NotFoundComponent } from './view/not-found/not-found.component'; // Importa el componente de página no encontrada.
/*
import { MainComponent } from './core/main/main.component'; // Importa el componente principal.
import { ContactComponent } from './views/contact/contact.component'; // Importa el componente de contacto.
import { PricingComponent } from './views/pricing/pricing.component'; // Importa el componente de precios.
import { ServicesComponent } from './views/services/services.component'; // Importa el componente de servicios.
import { FeaturesComponent } from './views/features/features.component'; // Importa el componente de características.
*/
export const routes: Routes = [ // Define las rutas de la aplicación.
    /*
    {
        path: '', // Ruta raíz.
        component: MainComponent // Se carga el MainComponent para la ruta raíz.
    },
    {
        path: 'home', // Ruta para 'home'.
        component: MainComponent // Se carga el MainComponent para la ruta 'home'.
    },
    {
        path: 'contact', // Ruta para 'contact'.
        component: ContactComponent // Se carga el ContactComponent para la ruta 'contact'.
    },
    {
        path: 'pricing', // Ruta para 'pricing'.
        component: PricingComponent // Se carga el PricingComponent para la ruta 'pricing'.
    },
    {
        path: 'services', // Ruta para 'services'.
        component: ServicesComponent // Se carga el ServicesComponent para la ruta 'services'.
    },
    {
        path: 'features', // Ruta para 'features'.
        component: FeaturesComponent // Se carga el FeaturesComponent para la ruta 'features'.
    },
    {
        path: '**', // Ruta comodín para manejar rutas no definidas.
        component: NotFoundComponent // Se carga el NotFoundComponent para rutas no encontradas.
    },
    */
    { path: '', redirectTo: 'homeMale', pathMatch: 'full' }, // Redirige la ruta raíz a 'home' si no se proporciona otra ruta.
    
    // Define rutas usando la carga de componentes (loadComponent).
    { path: 'homeMale', loadComponent: () => import('./core/main/main.component').then(m => m.MainComponent) },
    { path: 'homeFemale', loadComponent: () => import('./view/female-main/female-main.component').then(m => m.FemaleMainComponent) },
    { path: 'login', loadComponent: () => import('./view/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./view/register/register.component').then(m => m.RegisterComponent) },
    { path: 'contact', loadComponent: () => import('./view/contact/contact.component').then(m => m.ContactComponent) }, 
     // Carga el ContactComponent para la ruta 'contact'.
    
    { path: '**', component: NotFoundComponent } // Ruta comodín que carga el NotFoundComponent si no hay coincidencias.
];
