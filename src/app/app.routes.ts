import { Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SalesComponent } from './views/sales/sales.component';
import { RentsComponent } from './views/rents/rents.component';
import { ExitsComponent } from './views/exits/exits.component';
import { ContactComponent } from './views/contact/contact.component';

export const routes: Routes =
    [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: IndexComponent },
        { path: 'sales', loadComponent: () => import('./views/sales/sales.component').then(mod => mod.SalesComponent) },
        { path: 'rents', component: RentsComponent },
        { path: 'exits', component: ExitsComponent },
        { path: 'contact', component: ContactComponent }
    ];
