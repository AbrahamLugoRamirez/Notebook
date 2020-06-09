import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Register } from '../models/register';
import { Empleados} from '../models/empleados';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  EmpresasList: AngularFireList<any>;
  selectedEmpresa: Register = new Register();
  selectedEmpleados: Empleados = new Empleados();
  constructor(private firebase:AngularFireDatabase){ }

  getEmpresas(){
    return this.EmpresasList = this.firebase.list('Empresas');
  }

  getEmpleados(){
    return this.EmpresasList = this.firebase.list('Empleados');
  }
}
