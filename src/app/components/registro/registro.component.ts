import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Register } from '../../models/register';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private dbPath = "/empresas";
  empresaRef: AngularFireList<Register> = null;
  register: Register = new Register();
  submitted = false;

  constructor(private db: AngularFireDatabase, private registerService: RegisterService) {
    this.empresaRef = db.list(this.dbPath);
   }

  ngOnInit(): void {
  }
  crearEmpresa(register: Register): void{
    this.empresaRef.push(register);

  }
  newEmpresa():void{
    this.submitted=false;
    this.register = new Register();
    s
    this.save();
   
  }

  save(){
    this.crearEmpresa(this.register);
    this.register= new Register();
  }
  onSubmit(){
    this.submitted=true;
    this.save();
  }


}
