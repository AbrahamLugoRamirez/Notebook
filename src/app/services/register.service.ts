import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Register } from '../models/register';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  EmpresasList: AngularFireList<any>;
  selectedEmpresa: Register = new Register();
  
  constructor(private firebase:AngularFireDatabase, public afAuth: AngularFireAuth){ }
  
 
  
  Agregar(empresa: Register ){
    this.EmpresasList = this.firebase.list('Empresas');
    console.log(empresa.clave)
    console.log(empresa.nombreEmpresa)
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
        uid: res.user.uid
      })
    })
   
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.correo, value.clave)
      .then(res => {
        resolve(res);
        
      }, err => reject(err))
    })
  }
  

}
