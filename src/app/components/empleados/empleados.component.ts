import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empleados } from '../../models/empleados';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  EmpleadosList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }
  EmpleadoList: Empleados[];
  EmpleadoList2: Empleados[];
  ngOnInit(): void {
    this.obtenerEmpleados()
      .snapshotChanges()
      .subscribe(item => {
        this.EmpleadoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          console.log(x)
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

}
