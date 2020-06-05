import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empleados } from '../models/empleados';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegistroEmpleadosService {

  EmpleadosList: AngularFireList<any>;
  selectedEmpleados: Empleados = new Empleados();

  constructor(private firebase: AngularFireDatabase, public afAuth: AngularFireAuth, private _router: Router) { }

  Agregar(empleado: Empleados, img) {
    let errorCode;
    this.EmpleadosList = this.firebase.list('Empleados');

    //Datos por defecto
    empleado.img = img;
    empleado.uidEmpresa = localStorage.getItem('uidEmpresa');
    empleado.respondio = "No";
    empleado.estado = "activo";

    this.doRegister(empleado).then(res => {

      this.EmpleadosList.push({
        nombre: empleado.nombre,
        direccion: empleado.direccion,
        respondio: empleado.respondio,
        correo: empleado.correo,
        estado: empleado.estado,
        clave: empleado.clave,
        uidEmpleado: res.user.uid,
        uidEmpresa: empleado.uidEmpresa,
        img: empleado.img
      })
      Swal.fire(
        'Exito!',
        'El empleado fue registrado con exito!',
        'success'
      )
    }, err => {
      console.log(err);
      errorCode = err.code;
      console.log(errorCode)

      if (errorCode == "auth/email-already-in-use") {
        Swal.fire({
          title: 'Espere',
          text: "Correo electronico ya registrado",
          icon: 'warning',
        })
      } else {
        if (errorCode == "auth/invalid-email") {
          Swal.fire({
            title: 'Espere',
            text: "Correo electronico incorrecto",
            icon: 'warning',
          })

        } else {
          if (errorCode == "auth/operation-not-allowed") {
            Swal.fire({
              title: 'Espere',
              text: "Correo electronico inhabilitado",
              icon: 'warning',
            })
          } else {
            if (errorCode == "auth/weak-password") {
              Swal.fire({
                title: 'Espere',
                text: "Contraseña no es segura",
                icon: 'warning',
              })
            }
          }
        }
      }
    })

  }

  doRegister(value) {

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.correo, value.clave)
        .then(res => {
          resolve(res);
          this.VerificarGmail();
        }, err => reject(err))
    })
  }

  VerificarGmail() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
      // Email sent.
    }).catch(function (error) {
      // An error happened.
    });
  }
}
