import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Register } from '../../../models/register';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //variables
  iniciar:boolean;
  cerrar:boolean;
  img: String;
  name:boolean = false;
  nombreE: String;
  EmpresaList: Register[];
  empleado: boolean =false;
  constructor(private _login: LoginService, public afAuth: AngularFireAuth,  private elRef: ElementRef){}
  
  ngOnInit(): void {     
  }

  ngDoCheck(): void{
    if(localStorage.getItem('uidEmpresa') != null ){
      if(localStorage.getItem('uidEmpresa') != null && localStorage.getItem('uidEmpleado') == null ){
        this.cerrar = true;
        this.iniciar = false;
        this.empleado = true;   
      }else{
        if(localStorage.getItem('uidEmpresa') != null && localStorage.getItem('uidEmpleado') != null ){
          this.cerrar = true;
          this.iniciar = false;
          this.empleado = false;
        }
      }  
      if(name == false){
        this.getEmpresa(localStorage.getItem('uidEmpresa'));
        this.name = true;
      }       

    }else{
      this.cerrar = false;
      this.iniciar = true;
      this.name =false;
      this.empleado = true;
    }  
  }

 cerrarSesion():void{
  localStorage.clear();
 }

 getEmpresa(uidEmpresa): void {
  this._login.getEmpresas()
    .snapshotChanges()
    .subscribe(item => {
      this.EmpresaList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.EmpresaList.push(x as Register);
      });       
      this.EmpresaList.forEach(element => {
        if (element.uid == uidEmpresa) {
          this.elRef.nativeElement.querySelector('#imagen').src = element.img;
          this.nombreE = element.nombreEmpresa;
          //TODO
        }
      });
    })
}



}
