import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  constructor( public registerService: RegisterService) {}
  

  ngOnInit(): void {
    this.registerService.selectedEmpresa.tipo = 'Cedula';
  }

  onSubmit(empresa: NgForm):void{
    this.registerService.Agregar(empresa.value);
  }

 
}