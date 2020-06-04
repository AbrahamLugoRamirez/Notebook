import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Register } from '../models/register';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  EmpresasList: AngularFireList<any>;
  selectedEmpresa: Register = new Register();
  
  constructor(private firebase:AngularFireDatabase, public afAuth: AngularFireAuth){ }
  
  Agregar(empresa: Register, img ){
    let errorCode;
    this.EmpresasList = this.firebase.list('Empresas');
    console.log(empresa.clave)
    console.log(empresa.nombreEmpresa)
    empresa.img = img;
    this.doRegister(empresa) .then(res => {
      console.log(res);
      console.log(res.user.uid);
      this.EmpresasList.push({
        nombreRepresentante: empresa.nombreRepresentante,
        tipo: empresa.tipo,
        numDocument: empresa.numDocumento,
        correo: empresa.correo,
        nombreEmpresa: empresa.nombreEmpresa,
        telefono: empresa.telefono,
        clave: empresa.clave,
        uid: res.user.uid,
        img: empresa.img
      })
      Swal.fire(
        'Exito!',
        'Su empresa fue registrada con exito!',
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

  doRegister(value){
  
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
