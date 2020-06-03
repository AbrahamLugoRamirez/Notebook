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
    this.iniciar=true;
    this.cerrar=true;
  }
  ngOnInit(): void { 
  }

  ngDoCheck(): void{
  
  }

 cerrarSesion():void{
  firebase.auth().signOut().then(function() {
    console.log("Sesion cerrada");
  }).catch(function(error) {
    // An error happened.
  });
 }


}
