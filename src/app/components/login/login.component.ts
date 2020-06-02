import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Register } from '../../models/register';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _login: LoginService, private _router: Router, private elRef: ElementRef) { }


  EmpresaList: Register[];
  ngOnInit(): void {
  }

  verificar(): void {

    let empresa = this.elRef.nativeElement.querySelector('#gridRadios1').checked;
    let correo = this.elRef.nativeElement.querySelector('#correo').value;
    let clave = this.elRef.nativeElement.querySelector('#clave').value;
    if (correo.length != 0 && clave.length != 0) {
      if (empresa) {
        this.getEmpresa(correo, clave)
      } else {
        this.getEmpleado();
      }
    }
  }

  getEmpresa(correo: String, clave: String): void {
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
          if (element.correo == correo && element.clave == clave) {
            contador = true;
            localStorage.setItem('uid', element.correo );
            
          }
        });
        if (contador) {
          
          this._router.navigate(['/panel-empresa']);
        } else {
          alert('Usuario o contraseña incorrecta')
        }
      })
  }

  getEmpleado(): void {

  }



}
