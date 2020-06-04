import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
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
  tipo: string;
  img: String;
  constructor(private _login: LoginService, private _router: Router, public afAuth: AngularFireAuth, private elRef: ElementRef) {

  }
  EmpresaList: Register[];

  ngOnInit(): void {
    if (localStorage.getItem('uidEmpresa') != null) {
      console.log(localStorage.getItem('uidEmpresa'))
      this.getEmpresa(localStorage.getItem('uidEmpresa'));
    } else {
      this._router.navigate(['/login']);
    }
  }

  getEmpresa(uidEmpresa): void {
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
        
        this.EmpresaList.forEach(element => {
          if (element.uid == uidEmpresa) {
            this.elRef.nativeElement.querySelector('#imagen').src = element.img;
            this.nombreE = element.nombreEmpresa;
            this.correo = element.correo;
            this.nombreRepresentante = element.nombreRepresentante;
            this.correo = element.correo;
            this.telefono = element.telefono;
            this.tipo = element.tipo;
            this.numDocumento = element.numDocumento;
            //TODO
          }
        });
      })
  }



}
