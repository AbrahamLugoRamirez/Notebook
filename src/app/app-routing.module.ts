import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { PanelEmpresaComponent } from './components/panel-empresa/panel-empresa.component'
import { RegistrarEmpleadosComponent } from './components/registrar-empleados/registrar-empleados.component'
import { EmpleadosComponent } from './components/empleados/empleados.component'


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'panel-empresa', component: PanelEmpresaComponent},
  {path: 'registrar-empleado', component: RegistrarEmpleadosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: '',  redirectTo: 'home', pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
