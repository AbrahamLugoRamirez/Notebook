import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  EmpresasList: AngularFireList<any>;
  selectedEmpresa: Register = new Register();
  constructor(private firebase:AngularFireDatabase){ }
 
  
  Agregar(empresa: Register ){
    this.EmpresasList = this.firebase.list('Empresas');
    console.log(empresa.clave)
    console.log(empresa.nombreEmpresa)
    this.EmpresasList.push({
      nombreRepresentante: empresa.nombreRepresentante,
      tipo: empresa.tipo,
      numDocument: empresa.numDocumento,
      correo: empresa.correo,
      nombreEmpresa: empresa.nombreEmpresa,
      telefono: empresa.telefono,
      clave: empresa.clave
    })
  }

}
