import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empleados } from '../models/empleados';
import { Respuestas} from '../models/respuestas';

import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
 RespuestasList: AngularFireList<any>;
 selectedRespuestas: Respuestas = new Respuestas();
  constructor(private firebase: AngularFireDatabase, public afAuth: AngularFireAuth, private _router: Router) { }

  agregarRespuestas(respuestas: Respuestas): void{
    this.RespuestasList = this.firebase.list('Respuestas');
    respuestas.respuesta2 = 2;
    respuestas.respuesta3 = 2;
    respuestas.respuesta4 = 2;
    respuestas.respuesta5 = 5;
    respuestas.uidEmpleado= localStorage.getItem('uidEmpleado');
    respuestas.uidEmpresa= localStorage.getItem('uidEmpresa');
    console.log(respuestas.respuesta1);
    this.RespuestasList.push({
     respuesta1: respuestas.respuesta2,
     respuesta2: respuestas.respuesta2,
     respuesta3: respuestas.respuesta3,
     respuesta4: respuestas.respuesta4,
     respuesta5: respuestas.respuesta5,
     uidEmpleado: respuestas.uidEmpleado,
     uidEmpresa: respuestas.uidEmpresa
     
    });

    Swal.fire(
      'Exito!',
      'Respuestas registradas con exito',
      'success'
    )

  }

  getRespuestas(){
    return this.RespuestasList = this.firebase.list('Respuestas');
  }

}
