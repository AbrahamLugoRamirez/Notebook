import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Register } from '../../models/register';


@Component({
  selector: 'app-panel-empresa',
  templateUrl: './panel-empresa.component.html',
  styleUrls: ['./panel-empresa.component.css']
})
export class PanelEmpresaComponent implements OnInit {
  nombreE: String;
  nombreRepresentante: String;
  numDocumento: number;
  correo: string;
  telefono: number; 
  
  constructor(private _login: LoginService, private _router: Router, public afAuth: AngularFireAuth) { 
    var user = firebase.auth().currentUser;
    if (user) {
     // User is signed in.
     console.log(user.uid);
     this.getEmpresa();
   } else {
     // No user is signed in.     
     this._router.navigate(['/home']);
   }
  }
  EmpresaList: Register[];
  
  ngOnInit(): void {
  }

  getEmpresa(): void {
    this._login.getEmpresas()
      .snapshotChanges()
      .subscribe(item => {
        this.EmpresaList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.EmpresaList.push(x as Register);
        })
        let contador = false;
        var user = firebase.auth().currentUser;
        this.EmpresaList.forEach(element => {
          if (element.uid == user.uid) {
           this.nombreE= element.nombreEmpresa;
           this.correo = element.correo;
           this.nombreRepresentante = element.nombreRepresentante;
           this.correo = element.correo
           this.telefono = element.telefono
           

          //TODO
            
          }
        });       
      })
  }



}
