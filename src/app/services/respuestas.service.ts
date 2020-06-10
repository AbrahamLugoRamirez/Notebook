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

  agregarRespuestas(): void{
    this.RespuestasList = this.firebase.list('Respuestas');

    this.RespuestasList.push({
     
    });

  }

}
