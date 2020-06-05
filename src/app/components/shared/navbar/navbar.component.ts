import { Component, OnInit } from '@angular/core';

import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  iniciar:boolean;
  cerrar:boolean;
  constructor(public afAuth: AngularFireAuth){
    
  }
  ngOnInit(): void { 
    
  }

  ngDoCheck(): void{
    if(localStorage.getItem('uidEmpresa') != null){
      this.cerrar = true;
      this.iniciar = false;
    }else{
      this.cerrar = false;
      this.iniciar = true;
    }
  
  }

 cerrarSesion():void{
  localStorage.clear();
 }


}
