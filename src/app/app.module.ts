import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

//RUTAS
import {  APP_ROUTING} from './app-routes';
import { FooterComponent } from './components/footer/footer.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebase } from '../environments/firebase';


//SERVICIOS

import { RegisterService } from './services/register.service';
import { PanelEmpresaComponent } from './components/panel-empresa/panel-empresa.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RecuperarComponent,
    PanelEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    APP_ROUTING,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
