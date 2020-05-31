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
    this.EmpresasList.push({
      tipo: empresa.tipo,
      identificacion: empresa.identificacion,
      correo: empresa.correo,
      nombreEmpresa: empresa.nombreEmpresa,
      telefono: empresa.telefono,
      contraseña: empresa.contraseña
    })
  }
}
