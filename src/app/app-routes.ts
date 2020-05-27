import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';


const APP_ROUTE: Routes = [
    { path: 'home', component: HomeComponent },      
    { path: 'login', component: LoginComponent }, 
    { path: 'registro', component: RegistroComponent }, 
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTE);
