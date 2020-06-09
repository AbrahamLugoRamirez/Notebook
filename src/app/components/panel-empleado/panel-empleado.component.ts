import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { PreguntasService } from '../../services/preguntas.service';
import { Preguntas } from '../../models/preguntas';
import { Empleados } from '../../models/empleados';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-panel-empleado',
  templateUrl: './panel-empleado.component.html',
  styleUrls: ['./panel-empleado.component.css']
})
export class PanelEmpleadoComponent implements OnInit {
  PreguntaList: Preguntas[];
  EmpleadosList: Empleados[];
  contador: boolean;
  pregunta1: String;
  pregunta2: String;
  pregunta3: String;
  pregunta4: String;
  pregunta5: String;
  img:String;
  nameEmpleado:String;
  correo:String;
  constructor(private _login: LoginService, public preguntasService: PreguntasService, private elRef: ElementRef, private _router: Router) { 
    this.verificar();
    this.getEmpleado();
  }

  ngOnInit(): void {
  }

  
  verificar(): void{
    this.preguntasService.getPreguntas()
      .snapshotChanges()
      .subscribe(item => {
        this.PreguntaList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.PreguntaList.push(x as Preguntas);
        })
        this.contador = false;
        this.PreguntaList.forEach(element => {
          console.log(localStorage.getItem('uidEmpresa'));
          if (element.uid == localStorage.getItem('uidEmpresa')) {
            this.contador = true;
            this.pregunta1 = element.pregunta1;
            this.pregunta2 = element.pregunta2;
            this.pregunta3 = element.pregunta3;
            this.pregunta4 = element.pregunta4;
            this.pregunta5 = element.pregunta5;
          }
        });
        if (this.contador) {        
          //this._router.navigate(['/panel-empresa']);
        } else {
          
        }
      })
  }

  getEmpleado(): void{

    
    this._login.getEmpleados()
    .snapshotChanges()
    .subscribe(item => {
      this.EmpleadosList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.EmpleadosList.push(x as Empleados);
      })
      let contador = false;
      this.EmpleadosList.forEach(element => {
        if (element.uidEmpleado == localStorage.getItem('uidEmpleado')) {
          contador = true;
          this.elRef.nativeElement.querySelector('#imagen').src = element.img;
          this.nameEmpleado = element.nombre;
          this.correo = element.correo;
        }
      });    
    })
  }


}
