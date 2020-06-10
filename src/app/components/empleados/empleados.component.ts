import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empleados } from '../../models/empleados';
import  Swal from 'sweetalert2';
import { RespuestasService } from '../../services/respuestas.service';
import { Respuestas} from '../../models/respuestas';
import { Preguntas } from '../../models/preguntas';

import { PreguntasService } from '../../services/preguntas.service';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  EmpleadosList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase, public respuestasService: RespuestasService ,  public preguntasService: PreguntasService) { }
  EmpleadoList: Empleados[];
  EmpleadoList2: Empleados[];
  RespuestasList: Respuestas[];
  PreguntaList: Preguntas[];
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;
  respuesta5: string;

  pregunta1: String;
  pregunta2: String;
  pregunta3: String;
  pregunta4: String;
  pregunta5: String;
  ngOnInit(): void {
    this.obtenerEmpleados()
      .snapshotChanges()
      .subscribe(item => {
        this.EmpleadoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.EmpleadoList.push(x as Empleados);
        })

        this.limpiarArray();
      })
  }

  limpiarArray() {
    this.EmpleadoList2 = [];
    for (let i = 0; i < this.EmpleadoList.length; i++) {
      if (this.EmpleadoList[i].uidEmpresa == localStorage.getItem('uidEmpresa')) {
        this.EmpleadoList2.push(this.EmpleadoList[i]);
      }
    }
  }

  obtenerEmpleados() {
    return this.EmpleadosList = this.firebase.list('Empleados')
  }

  verRespuestas(uid: String): void{
    this.preguntasService.getPreguntas()
    .snapshotChanges()
    .subscribe(item => {
      this.PreguntaList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.PreguntaList.push(x as Preguntas);
      })
     
      this.PreguntaList.forEach(element => {
        console.log(localStorage.getItem('uidEmpresa'));
        if (element.uid == localStorage.getItem('uidEmpresa')) {
          
          this.pregunta1 = element.pregunta1;
          this.pregunta2 = element.pregunta2;
          this.pregunta3 = element.pregunta3;
          this.pregunta4 = element.pregunta4;
          this.pregunta5 = element.pregunta5;
        }
      });
     
    })
   
    
    this.respuestasService.getRespuestas()
    .snapshotChanges()
    .subscribe(item => {
      this.RespuestasList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.RespuestasList.push(x as Respuestas);
      })
      
      this.RespuestasList.forEach(element => {
        console.log(uid);
        if (element.uidEmpleado == uid) {        
          console.log('entroo')
          this.respuesta1 = element.respuesta1;
          this.respuesta2 = element.respuesta2+'';
          this.respuesta3 = element.respuesta3+'';
          this.respuesta4 = element.respuesta4+'';
          this.respuesta5 = element.respuesta5+'';

        }
      });    
    })

    console.log(this.respuesta1);

    this.swal();
  }

  swal(){

    Swal.mixin({      
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4', '5']
    }).queue([
      {
        title: this.pregunta1,
        text: this.respuesta1+''
      },
      {
        title: this.pregunta2,
        text: this.respuesta2
      },
      {
        title: this.pregunta3,
        text: this.respuesta3
      },
      {
        title: this.pregunta4,
        text: this.respuesta4
      },
      {
        title: this.pregunta5,
        text: this.respuesta5
      },
    ]);


  }

  
}
