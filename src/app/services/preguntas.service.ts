import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Preguntas } from '../models/preguntas';
import * as firebase from 'firebase/app';
import Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  PreguntasList: AngularFireList<any>;
  selectedPreguntas: Preguntas = new Preguntas();
  constructor(private firebase:AngularFireDatabase) { }

  getPreguntas(){
    return this.PreguntasList = this.firebase.list('Preguntas');
  }

  Agregar(preguntas: Preguntas){
    this.PreguntasList = this.firebase.list('Preguntas');
  
    preguntas.uid=localStorage.getItem('uidEmpresa');   
    this.PreguntasList.push({
    pregunta1: preguntas.pregunta1,
    pregunta2: preguntas.pregunta2,
    pregunta3: preguntas.pregunta3,
    pregunta4: preguntas.pregunta4,
    pregunta5: preguntas.pregunta5,
    uid: preguntas.uid
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Preguntas agregadas con exito!',
      showConfirmButton: false,
      timer: 1500
    })

  }
}
