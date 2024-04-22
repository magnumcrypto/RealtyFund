import { Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';

export const routes: Routes =
    [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: IndexComponent },
        { path: 'sales', loadComponent: () => import('./views/sales/sales.component').then(mod => mod.SalesComponent) },
        { path: 'rents', loadComponent: () => import('./views/rents/rents.component').then(mod => mod.RentsComponent) },
        { path: 'exits', loadComponent: () => import('./views/exits/exits.component').then(mod => mod.ExitsComponent) },
        { path: 'contact', loadComponent: () => import('./views/contact/contact.component').then(mod => mod.ContactComponent) }
    ];
