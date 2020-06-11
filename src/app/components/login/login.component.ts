import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Register } from '../../models/register';
import { Empleados } from '../../models/empleados';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { element } from 'protractor';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _login: LoginService, private _router: Router, private elRef: ElementRef, public afAuth: AngularFireAuth) {
    localStorage.clear();
  }


  EmpresaList: Register[];
  EmpleadosList: Empleados[];
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
        this.getEmpleado(correo, clave);
      }
    } else {
      Swal.fire({
        title: 'Espere',
        text: "Uno o mas campos vacios",
        icon: 'warning',
      })


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
            localStorage.setItem('uidEmpresa', element.uid);

            this.Login();
          }
        });
        if (contador) {
          this._router.navigate(['/panel-empresa']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrecta!',
          })
        }
      })
  }

  getEmpleado(correo: String, clave: String): void {

    this._login.getEmpleados()
      .snapshotChanges()
      .subscribe(item => {
        this.EmpleadosList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.EmpleadosList.push(x as Empleados);
        })

        let contador = false;
        let activo = false;
        this.EmpleadosList.forEach(element => {

          if (element.correo == correo && element.clave == clave) {

            if (element.estado == "Activo") {
              activo = true;
            }
            contador = true;
            localStorage.setItem('uidEmpleado', element.uidEmpleado);
            localStorage.setItem('uidEmpresa', element.uidEmpresa);
            this.Login();
            console.log("Se inicio")
          }
        });
        if (contador) {
          if(activo){
            this._router.navigate(['/panel-empleado']);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario Bloqueado!',
            })
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrecta!',
          })
        }
      })


  }
  Login() {
    let correo = this.elRef.nativeElement.querySelector('#correo').value;
    let clave = this.elRef.nativeElement.querySelector('#clave').value;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(correo, clave)
        .then(res => {
          resolve(res);
          console.log("Winnnnn")
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })



        }, err => reject(err))
    })
  }


}
