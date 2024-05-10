import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ContactComponent } from './pages/contact/contact.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
];
